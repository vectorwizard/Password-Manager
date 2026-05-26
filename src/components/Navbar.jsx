import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="flex justify-between items-center py-5 h-14 px-40">
                <div className="logo font-bold text-2xl">
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-700">OP/&gt;</span>
                </div>
                <button className='bg-green-600 text-white rounded-full flex gap-2 items-center p-1 ring-1 ring -white'>
                    <img className='w-9 rounded-full invert p-0.5' src="/icons/github.png" alt="github" />
                    <span className='font-bold'>Github</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
