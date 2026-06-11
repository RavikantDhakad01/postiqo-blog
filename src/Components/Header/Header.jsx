import { Logo, LogoutBtn, Container } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Header() {
   const navigate = useNavigate()
   const authStatus = useSelector((state) =>state.auth.status)
   const navItems = [
      {
         name: "Home",
         path: '/',
         active: authStatus
      },
      {
         name: "Login",
         path: '/login',
         active: !authStatus
      },
      {
         name: "Signup",
         path: '/signup',
         active: !authStatus
      },
   
      {
         name: "Create post",
         path: '/add-post',
         active: authStatus
      }
   ]
   return (
      <>
         <header className='shadow-md bg-white sticky top-0 z-50'>
            <Container>
               <nav className='h-16 flex items-center justify-between '>
                 
                     <Link to='/' className='flex items-center h-full'>
                        <Logo size='w-22' />
                     </Link>


                  <ul className='flex items-center gap-2'>
                     {
                        navItems.map((item) => {
                           return item.active ? (
                              <li key={item.name}>
                                 <button className='cursor-pointer inline-block px-6 py-2 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300'
                                    onClick={() => { navigate(item.path) }}
                                 >{item.name}</button>
                              </li>
                           ) : null
                        })
                     }
                     {
                        authStatus && <li>
                           <LogoutBtn />
                        </li>
                     }
                  </ul>
               </nav>
            </Container>
         </header>
      </>
   )
}
export default Header 