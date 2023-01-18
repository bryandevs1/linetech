import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import pic2 from '../assets/logowp.png';
import yanfei from '../assets/yanfei.jpg'
import ayaka from '../assets/ayaka.jpg'
import nahida from '../assets/nahida.jpg'
import ganyu from '../assets/ganyu.jpg'
import server from '../assets/server.png'
import ServerIcon from '../components/ServerIcon.js'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/solid';
import Channels from './Channels';
import Swal from 'sweetalert2';
import {useCollection} from "react-firebase-hooks/firestore" 

function Home() {

  const [user] = useAuthState(auth);
  const [channels] = useCollection(db.collection("channels"))

  const handleAddChannel = () => {
    const channelName = Swal.fire({
      title: "An input!",
      text: "Write something interesting:",
      input: 'text',
      showCancelButton: true        
  }).then((result) => {
      if (result) {
        db.collection("channels").add({
          channelName: result.value
        })
      }
  });
  
}



  return <>
     {!user && <Navigate to={'/'} />}
  <div className='flex h-screen min-w-3xl'>
    <div className='flex flex-col space-y-4 servebg p-3 w-20'>
      <div className='server-default hover:bg-blue-700 h-11 w-11 ml-1'>
        <img src={pic2} alt="pic2" className='h-14 w-18 scale-50'/>
      </div>

      <hr className='border-gray-200 w-12 border mx-auto' />
      <ServerIcon image={server} />
      <ServerIcon image={yanfei} />
      <ServerIcon image={ayaka} />
      <ServerIcon image={nahida} />
      <ServerIcon image={ganyu} />
      
      <div className='server-default hover:bg-green-500 group h-11 w-11 ml-1'>
        <PlusIcon className='text-green-500 h-7 group-hover:text-white' />
      </div>
    </div>

    <div className='channels flex flex-col min-w-max'>
      <h2 className='flex text-white font-bold text-sm items-center justify-between
      border-b border-grar-800 p-4 chaneelsh2 cursor-pointer'> Official LineTech Server...
      <ChevronDownIcon className='h-5 ml-2'/> </h2>
    <div className='channeltext flex-grow scrollbar-hide'>
    <div className='flex items-center p-2 mb-2'>
      <ChevronDownIcon className='h-6 mr-2 hover:text-white' />

      <h4 className='font-semibold'>Channels</h4>
      <PlusIcon  className='h-6 ml-auto cursor-pointer hover:text-white' onClick={handleAddChannel} />
    </div>

    <div className='flex flex-col space-y-2 px-2 mb-4'>
      {channels?.docs.map((doc) => (
        <Channels
         key={doc.id} 
         id={doc.id} 
         channelName={doc.data().channelName} />
      )
      )}
    </div>
    </div>

    </div>
  </div>
  </>
  
}

export default Home
