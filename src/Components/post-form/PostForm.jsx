import { useEffect, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useForm, Watch } from "react-hook-form";
import { Input, Select, Button, RTE } from '../index'
import authService from '../../appwrite/config'

function PostForm({ post }) {

    const userData = useSelector((state) => state.auth.user)
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
            const file = data.image[0] ? await authService.uploadFile(data.image[0]) : null
            if (file) {
                await authService.deleteFile(post.featuredImage)
            }
            const uPost = await authService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined })
            if (uPost) {
                navigate(`post/${uPost.$id}`)
            }


        } else {
            const file = await authService.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const cPost = await authService.createPost({ ...data, userId: userData.$id })
                if (cPost) {
                    navigate(`post/${cPost.$id}`)
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
        const subscribe = Watch((value, { name }) => {
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
                } className="mb-4"/>
                {
                    post && (
                        <div  className="w-full mb-4">
                            <img src={authService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg"/>
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