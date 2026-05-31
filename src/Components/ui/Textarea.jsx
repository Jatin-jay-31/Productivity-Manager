import React from 'react'
import { useSelector } from 'react-redux'

function Textarea({label,id,className='',...props}) {
  const theme = useSelector((state)=> state.ui.theme)

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

      <textarea
        {...props}
        id={id}
        className={`
          w-full
          resize-none
          rounded-2xl
          outline-none
          transition-all
          duration-200
          focus:ring-2
          focus:ring-blue-300
          ${theme==='light'
            ? "text-slate-700 placeholder:text-slate-500"
            : "text-slate-100 placeholder:text-slate-400"}
          ${className}
        `}
      />
    </div>
  )
}

export default Textarea
