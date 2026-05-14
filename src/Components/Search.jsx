import React,{useState} from 'react'

function Search({searchinput,setSearchInput}) {

  return (
    <>
    <div className='flex items-center w-11/12 bg-blue-100 mx-auto rounded-2xl m-8'>
    <input type="text" placeholder='Search a note..' className='p-3 outline-none flex-1'
    value={searchinput}
    onChange={(e)=> setSearchInput(e.target.value)}
    />
    </div>
    </>
  )
}

export default Search
