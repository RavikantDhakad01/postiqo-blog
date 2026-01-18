import { useEffect, useState } from "react";
import { Container, PostCard } from '../index'
import Service from '../../appwrite/config'
import service from "../../appwrite/config";
function AllPosts() {
    const [Posts, setPosts] = useState([])
    useEffect(() => {
        service.getPost([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }

            })
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        Posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}
export default AllPosts 