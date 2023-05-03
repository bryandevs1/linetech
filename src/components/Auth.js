import React, {useState} from 'react'
import '../App.css'
import Cookies from 'universal-cookie'
import axios from 'axios'
// import BackgroundImage from '../../assets/Home_assets/Background!.webp'
import BackgroundImage from '../assets/signup.jpg'
// import BackgroundImage1 from '../../assets/Home_assets/Header.webp'

import signInImage from '../assets/signup.jpg';
import { useNavigate } from 'react-router'


const initialState = { fullName: '', userName: '', phoneNumber: '', profilePicture: '', password: '', confirmPassword: ''}

const cookies = new Cookies();

const Auth = () => {
    const navigate = useNavigate();


    const [form, setForm] = useState(initialState);

    const [isSignup, setIsSignup] = useState(false)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const switchForm = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    const handlesubmit = async(e) => {
        e.preventDefault();

        const { fullName, userName, phoneNumber, profilePicture, password } = form;

        const URL = 'https://serverr-tau.vercel.app/auth';

        const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'signin'}`, {

            fullName, userName, phoneNumber, profilePicture, password
        });
        //how do i alert users if incorrect details are provided in the sign in form react?
        


        cookies.set('token', token);
        cookies.set('userName', userName);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if (isSignup) {
            cookies.set('profilePicture', profilePicture);
            cookies.set('hashedPassword', hashedPassword);
            cookies.set('phoneNumber', phoneNumber);
        }

        navigate('/:channelType/:channelId', { replace: true });

        window.location.reload();
    }

  return (
    <div className='auth__form-container'>   
        <div className='auth__form-container_fields flex'>
        <div>
        <img
        src={BackgroundImage}
        width={200}
        className="hidden odd-shape md:inline-block absolute w-full h-full"
        alt=""
        />
        </div>
            <div className=
            {isSignup ? "auth__form-container_fields-content" : "auth__form-container_fields-content2"}>
                <p>{isSignup ? "Sign Up" : "Sign In"}</p>
                <form onSubmit={handlesubmit}>
                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="fullName">Full Name</label>
                            <input name="fullName"
                            type='text' placeholder='Full Name' onChange={handleChange} required
                            />
                        </div>
                    )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="userName">Username</label>
                            <input name="userName"
                            type='text' placeholder='User Name' onChange={handleChange} required
                            />
                        </div>
                        {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="profilePicture">Pofile Picture</label>
                            <input name="profilePicture"
                            type='text' placeholder='Profile Picture' onChange={handleChange} required
                            />
                        </div>
                    )}
                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input name="phoneNumber"
                            type='text' placeholder='Phone Number' onChange={handleChange} required
                            />
                        </div>
                    )}
                    
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="password">Password</label>
                            <input name="password"
                            type='password' placeholder='Password' onChange={handleChange} required
                            />
                        </div>
                    
                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor="confirmPassword">Confirm Passowrd</label>
                            <input name="confirmPassword"
                            type='password' placeholder='Confirm Password' onChange={handleChange} required
                            />
                        </div>
                    )}

                    <div className='auth__form-container_fields-content_button'> 
                        <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                    </div>
                </form>
                <div classname='auth__form-container_fields-account'>
                    <p>
                        {isSignup
                        ? "Already have an account? "
                        : "Don't have an account? "}    
                        <span onClick={switchForm}>
                            {isSignup ? 'Sign In' : 'Sign Up'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Auth
