import React, { useState } from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import ChannelSearch from './ChannelSearch'
import TeamChannelPreview from './TeamChannelPreview'
import TeamChannelList from './TeamChannelList'
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'
import '../App.css'
import { Navigate, useNavigate } from 'react-router'
import { initialState } from 'stream-chat-react/dist/components/Channel/channelState'

const cookies = new Cookies();

const SideBar = ({logout}) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Curly snowflake" width={30} />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon2__inner" onClick={logout}>
        <img src={HospitalIcon} alt="Curly snowflake" width={30} />
      </div>
    </div>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type ==='team')
}
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type ==='messaging')
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {

  const {client} = useChatContext();

  const navigate = useNavigate();

  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('userName');
    cookies.remove('fullName');
    cookies.remove('phoneNumber');
    cookies.remove('profilePicture');
    cookies.remove('hashedPassword');

    navigate('/', { replace: true });
    window.location.reload();
  }
  const filters = {members: {$in: [client.userID]}}
  return (
    <>
      <SideBar logout={logout}/>
      <div className="channel-list__list__wrapper">
        <div className="channel-list__header -mb-5">
          <p className="channel-list__header__text mt-3">LineTech</p>
        </div>
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          className='p-2'
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsEditing={setIsEditing}
              setIsCreating={setIsCreating} 
              setToggleContainer={setToggleContainer}
              type="team"
            />  
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsEditing={setIsEditing}
              setIsCreating={setIsCreating}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />  
          )}
        />
      </div>
    </>
  )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing}) => {
  const [toggleContainer,setToggleContainer] = useState(false);

  return (
    <>
      <div className='channel-list__container'>
        <ChannelListContent
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        />
      </div>

      <div className='channel-list__container-responsive'
      style={{left: toggleContainer ? '0%' : '-89%', backgroundColor: '#005fff'}}>
       
      <div className='channel-list__container-toggle' onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}></div>
      <ChannelListContent
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
        setToggleContainer={setToggleContainer}
      />
      </div>
    </>
  )

}

export default ChannelListContainer
