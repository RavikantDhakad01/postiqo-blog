import { useEffect, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useForm} from "react-hook-form";
import { Input, Select, Button} from '../index'
import RTE from '../RTE'
import Service from '../../appwrite/config'

function PostForm({ post }) {

    const userData = useSelector((state) => state.auth.user)
    console.log(userData)
    const navigate = useNavigate()
    const { register, control, handleSubmit, getValues, setValue, watch } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || ""
        }
    })

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await Service.uploadFile(data.image[0]) : null
            if (file) {
                await Service.deleteFile(post.featuredImage)
            }
            const uPost = await Service.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined })
            if (uPost) {
                navigate(`/post/${uPost.$id}`)
            }


        } else {
            const existing = await Service.getPost(data.slug)
            if(existing){
                alert("Post with same title already exists")
                return
            }
            const file = await Service.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const cPost = await Service.createPost({ ...data, userId: userData.$id })
                if (cPost) {
                    navigate(`/post/${cPost.$id}`)
                }
            }
        }
    }
    const slugTransform = useCallback((value) => {
        if (value && typeof value == 'string') {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
        }
        return ''
    }, [])

    useEffect(() => {
        const subscribe = watch((value, { name }) => {
            if (name == 'title') {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => subscribe.unsubscribe();
    }, [setValue, slugTransform, watch])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input label="Title:" placeholder="Title"
                    className="mb-4"
                    {...register('title', {
                        required: true
                    })}
                />

                <Input label="Slug:" placeholder="Slug"
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                    className="mb-4" {...register('slug', { required: true })} />

                <RTE label='Content:' control={control} defaultValue={getValues('content')} name="content" />
            </div >
            <div className="w-1/3 px-2">
                <Input placeholder="featuredImage:" type="file" accept="image/png, image/jpg, image/jpeg, image/gif" {
                    ...register('image', { required: !post })
                } className="mb-4 cursor-pointer"/>
                {
                    post && (
                        <div  className="w-full mb-4">
                            <img src={Service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg"/>
                        </div>
                    )
                }
                <Select label="Status" options={["Active", "inActive"]}
                    {...register('status', { required: true })} className="mb-4" />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button >

            </div>
        </form>
    )
}
export default PostForm