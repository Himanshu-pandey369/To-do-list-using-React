import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-slate-600 flex justify-between text-white p-3'>
        <span className='font-bold mx-6'>i-Task</span>
        <ul className='flex gap-5 mx-6'>
            <li className='cursor-pointer hover:text-gray-400 hover:font-bold transition-all'>Your Tasks</li>
            <li className='cursor-pointer hover:text-gray-400 hover:font-bold transition-all'>Home</li>
        </ul>
    </div>
  )
}

export default Navbar
