import React from 'react'

function Textarea({label,id,className='',...props}) {
  return (
    <div>
        <label htmlFor={id}>{label}</label>
      <textarea {...props} className={`my-8 resize-none text-slate-700 focus:ring-2 focus:ring-blue-300 rounded-xl border-white p-1 bg-transparent outline-none ${className}`} id={id}/>
    </div>
  )
}

export default Textarea
