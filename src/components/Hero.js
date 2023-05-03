import { CloudArrowDownIcon, GlobeAltIcon } from '@heroicons/react/24/solid'
import React from 'react'
import pic1 from '../assets/pic2.png'
import pic2 from '../assets/pic4.png'
import { Navigate, useNavigate } from 'react-router-dom';


function Hero() {

  const navigate = useNavigate();

  return (
    <div className='bg-black pb-8 md:pb-0 text-white font h-screen'>
      <div className='p-7 py-9 max-h-full md:h-83 md:flex relative'>
        <div className='flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center'>
            <h1 className='text-5xl text-white font-bold'>Imagine a place...</h1>
            <h2 className='text-lg font-light tracking-wide lg:max-w-3xl w-full'>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</h2>
        <div className='mb-10 flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-start sm:items-center gap-6'>
        <button className='bg-white text-black w-60 font-semibold flex items-center justify-center rounded-full p-4
        hover:shadow-2xl hover:text-blue-600 focus:outline-none transition duration-200 ease-in-out'>
        <CloudArrowDownIcon className='mr-2 w-5' />
        Download for Windows</button>

        <button className=' bg-white text-black w-72 font-semibold flex items-center justify-center rounded-full p-4
        hover:shadow-2xl hover:text-blue-600 focus:outline-none transition duration-200 ease-in-out'>
        <GlobeAltIcon className='mr-2 w-5'
        // onClick={!user ? signIn : () => navigate("/channels")}
        />
        Open Ivictus in your browser</button>
        </div>
        </div>

        <div className='flex-grow'>
        <img src={pic1}
        className='md:hidden lg:mt-20 sm:mt-10 md:p-10'
        ></img>
        <img src={pic2}
        className='hidden md:inline-block'
        ></img>
        </div>
      </div>

    </div>
  )
}

export default Hero
