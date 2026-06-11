import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="mt-10 py-10 bg-gray-900 border-t border-black text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col ">
              <div className="mb-4 flex items-center text-4xl font-bold">
               Ps
              </div>

              <p className="text-sm ">
                &copy;{new Date().getFullYear()}<span className='font-medium ml-2'>
                  postiqo
                </span> - Built by Ravikant Dhakad
              </p>

            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">

            <h3 className="mb-6 text-base font-bold uppercase ">
              Social
            </h3>
            <ul className='space-y-3'>
              <li >
                <a
                  href="https://github.com/RavikantDhakad01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium "
                >
                  GitHub
                </a>
              </li>
              <li >
                <a
                  href="https://www.linkedin.com/in/ravikant-dhakad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium "
                >
                  LinkedIn
                </a>
              </li>
              <li className="mb-4">
                <Link className="text-base font-medium " to="/">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link className="text-base font-medium " to="/">
                  Press Kit
                </Link>
              </li>
            </ul>

          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">

            <h3 className="mb-6 text-base font-bold uppercase ">
              Support
            </h3>
            <ul>
              <li >
                <Link className="footer-link" to="/">
                  Account
                </Link>
              </li>
              <li >
                <Link className="footer-link" to="/">
                  Help
                </Link>
              </li>
              <li >
                <Link className="footer-link" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>

          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-base font-bold uppercase 0">
              Project
            </h3>
            <ul className="space-y-3">
              <li className="text-base ">React</li>
              <li className="text-base ">Appwrite</li>
              <li className="text-base ">Tailwind CSS</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Footer
