import React, { Children,useState } from 'react'
import {useNavigate , Link,useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'
import Logo from "../Header/Logo"
import ThemeToggle from './ThemeToggle'

function Header() {
    const navigate=useNavigate()
    const location= useLocation()
    const authStatus= useSelector((state)=> state.auth.status)
    const theme= useSelector((state)=> state.ui.theme)
    const [menuOpen, setMenuOpen] = useState(false)

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
    ]
  return (
    <header className={`py-3 shadow  min-w-full transition-colors duration-200 ${theme==='light'? " bg-blue-200 text-slate-700":" bg-slate-800 text-slate-100 border-b border-slate-700"} `}>
        <nav className='flex justify-center items-center'>
          <div className='m-2'>
            <Link to='/'>
              <Logo />

              </Link>
          </div>
          <div className='flex-1'>
          <ul className={`hidden md:flex justify-center items-center ${theme==='light'? " text-slate-700": "text-slate-100"} `}>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => {


  navigate(item.path)

}}
                className={`inline-block px-6 py-2 duration-200  ${theme==='light'? " hover:bg-blue-100": "hover:bg-slate-700"}  rounded-full  `}
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="px-6 py-2 rounded-full" />
              </li>
            )}
          </ul>
          </div>
          <div className="flex items-center gap-2">

  <div className="hidden md:block">
    <ThemeToggle />
  </div>

  <button
    className="md:hidden text-2xl px-2"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰
  </button>

</div>
        </nav>
        {
menuOpen && (
  <div
    className={`md:hidden flex flex-col px-4 pb-4 gap-2 ${
      theme === "light"
        ? "bg-blue-100"
        : "bg-slate-800"
    }`}
  >

    {navItems.map(
      (item) =>
        item.active && (
          <button
            key={item.name}
            onClick={() => {
              navigate(item.path)
              setMenuOpen(false)
            }}
            className={`
text-left
py-2
px-2
rounded-md
transition
duration-200
${theme === "light"
  ? "hover:bg-blue-200"
  : "hover:bg-slate-700"}
`}
          >
            {item.name}
          </button>
        )
    )}
    {authStatus && <LogoutBtn
  className={`
    w-full
    text-left
    py-2
    px-2
    rounded-md
    transition
    duration-200
    ${theme === "light"
      ? "hover:bg-blue-200"
      : "hover:bg-slate-700"}
  `}
/>}
    <ThemeToggle />
  </div>
)
}
    </header>
  )
}

export default Header
