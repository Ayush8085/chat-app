import React from 'react'

const SearchInput = () => {
    return (
        <form className='flex'>
            <input type="text" name="search" placeholder='Search...' className='p-2 bg-slate-100 rounded-2xl outline-none  text-slate-600' />
            <button type='submit'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </form>
    )
}

export default SearchInput