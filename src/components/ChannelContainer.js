import React from 'react'
import { Channel, useChatContext, MessageTeam } from 'stream-chat-react';
import ChannelInner from './ChannelInner';
import CreateChannel from './CreateChannel';
import EditChannel from './EditChannel';
import TeamMessage from './TeamMessage';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType}) => {

  const { channel } = useChatContext();

  if(isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    ) 
  }
  if(isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    ) 
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">Your chat starts here!</p>
      <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
    </div>
  )


  return (
    <div className='channel__container'>

      <Channel
    EmptyStateIndicator={EmptyState}
    //MessageText is a stream func used to display the message
      //Message = {(messageProps, index) => <ChannelInner key={index} {...messageProps} /> }
      >
  
        <ChannelInner
          setIsEditing = {setIsEditing}
        />
      </Channel>
      
    </div>
  )
}

export default ChannelContainer
