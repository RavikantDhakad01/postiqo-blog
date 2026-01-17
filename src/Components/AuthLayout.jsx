import { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication }) {

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoader(false)
    }, [authStatus, authentication, navigate])

    return loader ? <h1>Loading....</h1> : <>{children}</>
}
export default Protected