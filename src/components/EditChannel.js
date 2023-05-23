import React, { useState } from 'react'
import UserList from './UserList'
import { CloseCreateChannel } from '../assets';
import { useChatContext } from 'stream-chat-react';
const ChannelNameInput = ({channelName='', setChannelName}) => {

  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
  }
  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name" />
      <p>Add Members</p>
      
    </div>

  )
}

function EditChannel({setIsEditing}) {
    const {channel} = useChatContext()
    const [channelName, setChannelName] = useState(channel ?.data?.name)
    const [selectedUsers, setSelectedUsers] = useState([]) 

    const updateChanges = async (event) => {
      event.preventDefault()

      const nameChanged = channelName !== (channel.data.name || channel.data.id)
      if (nameChanged) {
        await channel.update({name:channelName}, {text: `Channel Name has been successfully changed to ${channelName}`})
      }

      if(selectedUsers.length) {
        await channel.addMembers(selectedUsers);
      }
      setChannelName(null)
      setIsEditing(false)
      setSelectedUsers([])
    }

  return (
    <div className='edit-channel__container'>
      <div className='edit-channel__header'>
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className='edit-channel__button-wrapper' onClick={updateChanges}><p>Save Changes</p></div>
    </div>
  )
}

export default EditChannel
