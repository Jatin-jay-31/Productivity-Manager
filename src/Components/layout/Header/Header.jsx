import React, { Children } from 'react'
import {useNavigate , Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'
import Logo from "../Header/Logo"
import ThemeToggle from './ThemeToggle'

function Header() {
    const navigate=useNavigate()
    const authStatus= useSelector((state)=> state.auth.status)
    const theme= useSelector((state)=> state.ui.theme)

    const navItems=[
        {
            name: 'Home',
            path: '/',
            active: true
        },
        {
            name: 'Login',
            path: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            path: '/signup',
            active: !authStatus
        },
        {
            name: 'Trash',
            path: '/note/trash',
            active: authStatus
        },
        {
            name: 'Archive',
            path: '/note/archive',
            active: authStatus
        },
        {
            name: 'Pinned',
            path: '/note/pinned',
            active: authStatus
        },
    ]
  return (
    <header className={`py-3 shadow  min-w-full ${theme==='light'? " bg-blue-200 text-slate-700":" bg-slate-800 text-slate-100 border-b border-slate-700"} `}>
        <nav className='flex justify-center items-center'>
          <div className='m-2'>
            <Link to='/'>
              <Logo width='70px' />

              </Link>
          </div>
          <div className='flex-1'>
          <ul className={`flex justify-center items-center ${theme==='light'? " text-slate-700": "text-slate-100"} `}>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.path)}
                className={`inline-block px-6 py-2 duration-200  ${theme==='light'? " hover:bg-blue-100": "hover:bg-slate-700"}  rounded-full  `}
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          </div>
          <div className='mr-4'>
            <ThemeToggle/>
          </div>
        </nav>
    </header>
  )
}

export default Header
