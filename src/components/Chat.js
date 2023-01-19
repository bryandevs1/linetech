import { BellIcon, ChatBubbleLeftRightIcon, DocumentMagnifyingGlassIcon, FaceSmileIcon, GiftIcon, HashtagIcon, InboxIcon, MagnifyingGlassIcon, PlusCircleIcon, PlusIcon, QuestionMarkCircleIcon, UsersIcon } from '@heroicons/react/24/solid'
import React, { useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { selectChannelId, selectChannelName } from '../features/channelSlice'
import { db, auth } from '../firebase'
import ServerIcon from './ServerIcon'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import Message from './Message'

function Chat() {
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [user] = useAuthState(auth);
    const inputRef = useRef("")
    const chatRef = useRef(null)
    const [messages] = useCollection(
        channelId && db
        .collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
    );

    const scrollToBottom = () => {
        chatRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    const sendMessage = (e) => {
        e.preventDefault();

        if(inputRef.current.value !==""){
            db.collection('channels').doc(channelId).collection('messages').add({
                message: inputRef.current.value,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                name: user?.displayName,
                userImage: user?.photoURL,
                email: user?.email,
            })
        }

        inputRef.current.value = "";
        inputRef.current.focus();
        scrollToBottom();
    };



  return (
    <div className='flex flex-col h-screen'>
        <header className='flex items-center justify-between space-x-5
        border-b border-gray-800 p-4 -mt-1'>
            <div className='flex items-center space-x-1'>
                <HashtagIcon className='h-6'/>
                <h4> {channelName}</h4>
            </div>
            <div className='flex space-x-3 items-center'>
                <BellIcon className='icon'/>
                <ChatBubbleLeftRightIcon className='icon'/>
                <UsersIcon className='icon'/>
                <div className='flex bg-gray-700 text-xs  p-1 rounded-md'>
                    <input 
                    type='text' 
                    placeholder='Search' 
                    className='bg-transparent focus:outline-none text-white pt-1 first-letter:placeholder-zinc-300'
                    />
                    <MagnifyingGlassIcon className="h-5 text-zinc-200 -1" />
                    </div>
                    <InboxIcon className='h-6 text-white cursor-pointer
                     hover:text-gray-300' />
                    <QuestionMarkCircleIcon className='icon' />
                
            </div>
        </header>
        <main className='flex-grow overflow-y-scroll scrollbar-hide'>
            {messages?.docs.map((doc) => {
                const { message, timestamp, user, userImage, email } = doc.data();
                return <Message 
                key={doc.id} 
                id={doc.id}
                message={message}
                timestamp={timestamp}
                name={user}
                userImage={userImage}
                email={email} 
                />;
            })};

            <div ref={chatRef} className="pb-12" />
        </main>
        <div className='flex items-center p-2.5 rounded-lg mb-7 mx-5 bg-gray-600'>
            <PlusCircleIcon className='icon mr-4'/>
            <form className='flex-grow'>
                <input 
                type='text' 
                disabled={!channelId}
                placeholder={channelId ? `Message #${channelId}` : "Select a channel"}
                className='bg-transparent focus:outline-none text-zinc-50 w-full'
                ref={inputRef}
                />
                <button hidden type='submit' onClick={sendMessage}>
                    Send Message
                </button>
            </form>
            <GiftIcon className='icon mr-2' />
            <FaceSmileIcon className='icon' />
        </div>
    </div>
  )
}

export default Chat
