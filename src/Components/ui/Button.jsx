import React from 'react'
import { useSelector } from 'react-redux'

function Button({children,className='',type='button',...props}) {
  const theme= useSelector((state)=> state.ui.theme)
  return <button {...props} type={type} className={`flex items-center justify-center rounded-2xl bg-blue-300 px-4 py-2 min-h-8 cursor-pointer transition-all duration-200 ${theme==='light'? "bg-slate-700 hover:bg-slate-900 ": " bg-blue-500 hover:bg-blue-700"} text-white ${className}`}
        >{children}</button>
}

export default Button
