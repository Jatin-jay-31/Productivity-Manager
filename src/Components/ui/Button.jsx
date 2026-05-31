import React from 'react'
import { useSelector } from 'react-redux'

function Button({
  children,
  className='',
  type='button',
  disabled=false,
  variant='primary',
  ...props
}) {

  const theme = useSelector((state)=> state.ui.theme)
  const styles = {
    primary:
      theme==='light'
          ? "bg-slate-700 hover:bg-slate-900 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white",

    danger:
      "bg-red-500 hover:bg-red-600 text-white"
  }


  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        px-4
        py-2
        rounded-xl
        font-medium
        cursor-pointer
        transition-all
        duration-200
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        shadow-sm
        hover:shadow-md
        ${className}
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  )
}

export default Button