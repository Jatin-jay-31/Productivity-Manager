import React from 'react'
import { useSelector } from 'react-redux'

function Container({ children }) {
  const theme = useSelector((state) => state.ui.theme)
  return (
    <div
      className={` min-h-screen w-full mx-auto transition-colors duration-200 ${theme === 'light'
          ? "bg-blue-50 border-x border-slate-200"
          : "bg-slate-900 border-x border-slate-800"}
`}
    >
      {children}
    </div>
  )
}

export default Container
