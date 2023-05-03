import React from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import ChannelSearch from './ChannelSearch'
import TeamChannelPreview from './TeamChannelPreview'
import TeamChannelList from './TeamChannelList'
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'
import '../App.css'
import { Navigate, useNavigate } from 'react-router'

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


const ChannelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {

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
  return (
    <>
      <SideBar logout={logout}/>
      <div className="channel-list__list__wrapper">
        <div className="channel-list__header">
          <p className="channel-list__header__text">LineTech</p>
        </div>
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="team"
            />  
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="messaging"
            />  
          )}
        />
      </div>
    </>
  )
}

export default ChannelListContainer
