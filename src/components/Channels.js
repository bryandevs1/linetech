import { HashtagIcon } from '@heroicons/react/24/solid'
import React from 'react'
import channelName from './Home'

function Channels( {id, channelName} ) {
  return (
    <div className='flex gap-2'>
      <HashtagIcon className='w-4 ' /> {channelName}
    </div>
  )
}

export default Channels
