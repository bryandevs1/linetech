import logo from './logo.svg';
import './App.css';
import 'stream-chat-react/dist/css/index.css'
import { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import ChannelListContainer from './components/ChannelListContainer';
import ChannelContainer from './components/ChannelContainer';
import Auth from './components/Auth.js'
import Header from './components/Header';
import { Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import AppRoutes from './Router';

const apikey = 'wnvvtsbumjmz'

const chatClient = StreamChat.getInstance(apikey);

const cookies = new Cookies();

const authToken = cookies.get('token');

if (authToken) {
  chatClient.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('userName'),
    fullName: cookies.get('fullName'),
    image: cookies.get('profilePicture'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken);
}

function App() {

  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // if (!authToken) return <><Header /> <Hero /> </>

  return (
      
       <div className="app__wrpper">
        <Routes>
            {AppRoutes.map((route) => (
              <Route
                path={route.path}
                element={route.element}
                key={route.path}
              />
            ))}
          </Routes>

    </div>
  );
}

export default App;
