import React from 'react'
import { useSelector } from 'react-redux'

function Input({label,id,type,className='',...props}) {
  const theme= useSelector((state)=> state.ui.theme)

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className={`mb-2 block text-sm ${
            theme==='light'
              ? "text-slate-600"
              : "text-slate-300"
          }`}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        type={type}
        id={id}
        className={`
          w-full
          px-3
          py-2
          rounded-2xl
          outline-none
          transition-all
          duration-200
          bg-transparent
          focus:ring-2
          focus:ring-blue-300
          ${theme==='light'
            ? " text-slate-700 placeholder:text-slate-500"
            : " text-slate-100 placeholder:text-slate-400"}
          ${className}
        `}
      />
    </div>
  )
}

export default Input