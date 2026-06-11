import authService from '../../appwrite/auth'
import { logout } from '../../store/authslice'
import { useDispatch } from 'react-redux'

function LogoutBtn() {

    const dispatch = useDispatch()

    function logoutHandler() {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <button onClick={logoutHandler} className="cursor-pointer text-blue-600 inline-block px-6 py-2  hover:text-white hover:bg-blue-600 transition duration-300 rounded-full">
            Logout
        </button>
    )
}
export default LogoutBtn