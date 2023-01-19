import { TrashIcon } from '@heroicons/react/24/solid'
import moment from 'moment/moment'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import { selectChannelId } from '../features/channelSlice';
import { db, auth } from '../firebase';

function Message({id, message, timestamp, name, userImage, email}) {

    const channelId = useSelector(selectChannelId)

    const [user] = useAuthState(auth);
  return (
    <div className='flex items-center p-1 pl-5 my-5 mr-2
    hover:bg-slate-700 group'>
      <img 
      src={userImage}
      alt='hha'
      className='h-8 text-white rounded-full cursor-pointer hover:shadow-2xl'
       />
       <div className='flex flex-col'>
        <h4 className='flex items-center space-x-2'>
        <span className='cursor-pointer hover:underline text-white text-md'>
        {name}
        </span>
        <span>
            {moment(timestamp?.toDate().getTime()).format('lll')}   
        </span>
        </h4>
        <p className='text-md text-zinc-300 transit' > {message} </p>
       </div>
       {user?.email === email && (
        <div className='hover:bg-red-700 p-1 ml-auto rounded-lg text-red-700
        hover:text-white' onClick={() => db
        .collection('channels')
        .doc(channelId)
        .collection('messages')
        .doc(id)
        .delete()
        }> 
            <TrashIcon className='h-5 cursor-pointer hidden
            group-hover:inline'  />
        </div>
        )};
    </div>
  );
}

export default Message
