import { Link } from 'react-router-dom'
import appWriteService from '../appwrite/config'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4 hover:scale-105 transition duration-300'>
                <div className='w-full justify-center mb-4 '>
                   <img src={appWriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl h-80 w-80 object-cover' />
                </div>
                <h2 className='text-xl font-bold text-center '>
                    {title}
                </h2>
            </div>
        </Link>
    )
}
export default PostCard