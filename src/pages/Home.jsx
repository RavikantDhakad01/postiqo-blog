import { Container, PostCard } from '../Components/index'
import { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
const authStatus=useSelector((state)=>state.auth.status)
    useEffect(() => {
        if(!authStatus){
            return
        }
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [authStatus])
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
   
       return (

       <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap justify-center'>
                    {
                        posts.map((post) => (
                            <div key={post.$id} className='p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
        
        )
    
}
export default Home