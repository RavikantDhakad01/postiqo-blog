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
         <header className='shadow bg-gray-600'>
            <Container>
               <nav className='flex items-center justify-between py-3'>
                 
                     <Link to='/' className='flex items-center'>
                        <Logo size='w-10' />
                     </Link>


                  <ul className='flex items-center gap-2'>
                     {
                        navItems.map((item) => {
                           return item.active ? (
                              <li key={item.name}>
                                 <button className='cursor-pointer inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
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