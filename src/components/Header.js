import React from 'react';
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid';
import log from '../assets/logo.png';
import phlog from '../assets/logown.png'
import { Link, useNavigate } from 'react-router-dom'
import Auth from './Auth';



function Header() {

  const navigate = useNavigate();

  function handleClick() {
    navigate('/auth');
  }

  return (
    <header className='flex items-center justify-between py-4 px-6 bg-black font'>
      <a href="/">
      <img 
      src={log}
      alt='logo'
      className=' md:ml-10 max-sm:hidden lg:ml-10 h-12 object-contain w-100 cursor-pointer l-10 -mr-10'
      />
      <img 
      src={phlog}
      alt='logo'
      className=' md:hidden -mr-20 lg:hidden lg:m-5 lg:ml-5 h-6 object-contain w-100 cursor-pointer left-10 -mr-10'
      />
      </a>
      <div className='cursor-pointer hidden lg:flex space-x-6 text-white ml-11 font'>
        <a className='link' href> Download </a>
        <a className='link' href> Why LineTech </a>
        <a className='link' href> Buy Nitro </a>
        <a className='link'href> Safety </a>
        <a className='link' href> Support </a>
      </div>
      
      <div className='flex space-x-4'>
        <Link to='/signIn'>
        <button className='bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-purple-400 transition duration-200 ease-in-out wbitespace-nowrap font-medium'
        // onClick={handleClick}
        >

        Logini
        </button>
        </Link>
        
        

      
      <Bars3BottomRightIcon className='h-9 text-white cursor-pointer lg:hidden' />
      </div>
    </header>
  )
} 

export default Header

 
