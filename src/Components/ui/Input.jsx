import React from 'react'
import { useSelector } from 'react-redux'

function Input({label,id,type,className='',...props}) {
  const theme= useSelector((state)=> state.ui.theme)
  return (
    <div>
        <label htmlFor={id} className={`${theme==='light'? "text-slate-700":"text-slate-200" } `}>{label}</label>
      <input {...props} type={type} className={` px-3 py-2 flex-1 placeholder:text-slate-400 bg-transparent focus:ring-2 focus:ring-blue-300 rounded-2xl outline-none ${theme==='light'? "bg-white placeholder:text-slate-700 ": "bg-slate-800 placeholder:text-white"} ${className} `} id={id} />
    </div>
  )
}

export default Input
