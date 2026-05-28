import React from 'react'
import { useSelector } from 'react-redux'

function Container({children}) {
  const theme= useSelector((state)=> state.ui.theme)
  return (
    <div className={`min-h-screen w-10/12 mx-auto  ${theme==='light'? "bg-blue-50": "bg-slate-900"}`}>
      {children}
    </div>
  )
}

export default Container
