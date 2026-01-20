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
         active: true
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
         name: "All posts",
         path: '/all-posts',
         active: authStatus
      },
      {
         name: "Create post",
         path: '/add-post',
         active: authStatus
      }
   ]
   return (
      <>
         <header className='py-3 shadow bg-gray-500'>
            <Container>
               <nav className='flex'>
                  <div className='mr-4'>
                     <Link to='/'>
                        <Logo width='70px' />
                     </Link>

                  </div>

                  <ul className='flex ml-auto'>
                     {
                        navItems.map((item) => {
                           return item.active ? (
                              <li key={item.name}>
                                 <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
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