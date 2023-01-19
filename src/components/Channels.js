import { HashtagIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Swal from 'sweetalert2';
import { auth, db } from "../firebase";
import channelName from './Home'
import { handleDelChannel } from './Home';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setChannelInfo } from '../features/channelSlice';
import { useSelector } from 'react-redux';
import { selectChannelId } from '../features/channelSlice';
import {getFirestore, doc, updateDoc, deleteField} from "firebase/firestore";



function Channels( {id, channelName} ) {
  const channelId = useSelector(selectChannelId)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelChannel = () => {
    Swal.fire({
      title: "Are you sure you want to delete this channel?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Channel Deleted!", "", "success");
        db
        .collection('channels')
        .doc(channelId)

        .delete()
      } else if (result.isDenied) {
        Swal.fire("Channel Not Deleted", "", "info");
      }
    });
  }

  const setChannel = () => {
    dispatch(
      setChannelInfo({
      channelId: id,
      channelName: channelName,
    })
    );
    navigate(`/channels/${id}`);
  };

  return (
    <div className='flex font-medium items-center cursor-pointer 
    p-1 rounded-md hover:text-white gap-2 group' onClick={setChannel}>
      {channelName && <HashtagIcon className='w-4'  />} {channelName} <TrashIcon className='ml-auto w-8 right-3 hover:bg-red-600 
      hover:w-7 p-1 rounded-full opacity-0 group-hover:opacity-100 ease-in-out duration-200' onClick={handleDelChannel}/>
    </div>
  )
}

export default Channels
