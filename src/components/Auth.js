import React, {useState, Component, useEffect, useRef} from 'react'
import '../App.css'
// import './aff'
import '../ka.css'
import pic2 from '../assets/pic1.png'
import pic1 from '../assets//pic2.png'
import Cookies from 'universal-cookie'
import axios from 'axios'
// import BackgroundImage from '../../assets/Home_assets/Background!.webp'
import BackgroundImage from '../assets/signup.jpg'
// import BackgroundImage1 from '../../assets/Home_assets/Header.webp'
import * as Components from './Component'
import signInImage from '../assets/signup.jpg';
import { useNavigate } from 'react-router'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { UserIcon } from '@heroicons/react/24/solid'
import { faCircleUser, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

const initialState = { fullName: '', userName: '', phoneNumber: '', profilePicture: '', password: '', confirmPassword: ''}

const cookies = new Cookies();

const Auth = () => {
  const containerRef = useRef(null);
  const signUpBtnRef = useRef(null);
  const signInBtnRef = useRef(null);

  useEffect(() => {
    const handleSignUpClick = () => {
      const container = containerRef.current;
      if (container) {
        container.classList.add("sign-up-mode");
      }
    };

    const handleSignInClick = () => {
      const container = containerRef.current;
      if (container) {
        container.classList.remove("sign-up-mode");
      }
    };

    const signUpBtn = signUpBtnRef.current;
    const signInBtn = signInBtnRef.current;

    if (signUpBtn) {
      signUpBtn.addEventListener("click", handleSignUpClick);
    }
    if (signInBtn) {
      signInBtn.addEventListener("click", handleSignInClick);
    }

    return () => {
      if (signUpBtn) {
        signUpBtn.removeEventListener("click", handleSignUpClick);
      }
      if (signInBtn) {
        signInBtn.removeEventListener("click", handleSignInClick);
      }
    };
  }, []);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');



    const [form, setForm] = useState(initialState);

    const [isSignup, setIsSignup] = useState(false)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const switchForm = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    const handleSignIn = async (e) => {
      e.preventDefault();
    
      const { userName, password } = form;
      const URL = 'https://serverr-tau.vercel.app/auth';
    
      try {
        const { data: { token, userId, fullName } } = await axios.post(`${URL}/signin`, {
          userName,
          password
        });
    
        cookies.set('token', token);
        cookies.set('userName', userName);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);
    
        navigate('/:channelType/:channelId', { replace: true });
        window.location.reload();
      } catch (error) {
        // Handle the error and display an error message
        setErrorMessage('Incorrect sign-in details provided. Please try again.');
      }
    };
    
    const handleSignUp = async (e) => {
      e.preventDefault();
    
      const { userName, phoneNumber, profilePicture, password } = form;
      const URL = 'https://serverr-tau.vercel.app/auth';
    
      try {
        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/signup`, {
          userName,
          fullName: form.fullName,
          phoneNumber,
          profilePicture,
          password
        });
    
        cookies.set('token', token);
        cookies.set('userName', userName);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);
        cookies.set('profilePicture', profilePicture);
        cookies.set('hashedPassword', hashedPassword);
        cookies.set('phoneNumber', phoneNumber);
    
        navigate('/:channelType/:channelId', { replace: true });
        window.location.reload();
      } catch (error) {
        // Handle the error and display an error message
        setErrorMessage('Error occurred during sign-up. Please try again.');
      }
    };

    
    
    return (
        <div ref={containerRef} class="container">
        <div class="forms-container">
          <div class="signin-signup">
          <form onSubmit={handleSignUp} class="sign-up-form mb-18">
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <FontAwesomeIcon icon={faCircleUser} className='m-5 top-3 left-3' />
                <input name="fullName"
                type='text' placeholder='Full Name' onChange={handleChange} required
                />
              </div>
              <div class="input-field">
                < FontAwesomeIcon icon={faUser} className='m-5 top-3 left-3'/>
                <input name="userName"
                type='text' placeholder='User Name' onChange={handleChange} required
                />
               </div>
              <div class="input-field">
                <FontAwesomeIcon icon={faImage} className='m-5 top-3 left-3'/>
                <input name="profilePicture"
                type='text' placeholder='Profile Picture' onChange={handleChange} required
                />
               </div>
               <small>Hint: Profile Picture should be given as a live url</small>
              <div class="input-field">
                <FontAwesomeIcon icon={faPhone} className='m-5 top-3 left-3' />
                <input name="phoneNumber"
                type='text' placeholder='Phone Number' onChange={handleChange} required
                />
               </div>
              <div class="input-field">
                <FontAwesomeIcon icon={faLock} className='m-5 top-3 left-3'/>
                <input name="password"
                type='password' placeholder='Password' onChange={handleChange} required
                />
               </div>
              <div class="input-field">
              <FontAwesomeIcon icon={faLock} className='m-5 top-3 left-3'/>
                <input name="confirmPassword"
                type='password' placeholder='Confirm Password' onChange={handleChange} required
                />
               </div>
              <input type="submit" class="btn" value="Sign up" />
              
            </form>
            <form onSubmit={handleSignIn} class="sign-in-form">
              <h2 class="title">Sign in</h2>
              <div class="input-field">
                <FontAwesomeIcon icon={faUser} className='m-4'/>
                <input name="userName" type='text' placeholder='User Name' onChange={handleChange} required
                />
              </div>
              <div class="input-field">
                <FontAwesomeIcon className='m-4' icon={faLock} />
                <input name="password"
                type='password' placeholder='Password' onChange={handleChange} required
                />
              </div>
              <input type="submit" value="Login" class="btn solid" />
              
            </form>

          </div>
        </div>
  
        <div class="panels-container">
          <div class="panel left-panel max-md:-mt-10">
            <div class="content">
              <img src={pic2} className='max-md:w-80'></img>
              <h3></h3>
              <p className='-mt-2'>
              Ah, a dazzling newcomer has graced our digital doorstep! Simply Click below to join us
              </p>
              <button ref={signUpBtnRef} class="btn transparent sign-up-btn">
                Sign up
              </button>
            </div>
            <img src="img/log.svg" class="image" alt="" />
          </div>
          <div class="panel right-panel">
            <div class="content max-md:absolute bottom-0 mt-10 ">
            <img src={pic1} className='max-md:justify-center items-center max-md:ml-[30vw] max-md:mb-3 max-md:w-32'></img>
              <h3>One of us ?</h3>
              <p className='text-xs bottom-0'>
              Sign in, and let the magic of our shared experiences envelop you anew!
              </p>
              <button ref={signInBtnRef} class="btn transparent sign-in-btn">
                Sign in
              </button>
            </div>
            <img src="img/register.svg" class="image" alt="" />
          </div>
        </div>
      </div>
    
    )

}
  // return (
  //   <div className='auth__form-container'>   
  //       <div className='auth__form-container_fields flex'>
  //       <div>
  //       <img
  //       src={BackgroundImage}
  //       width={200}
  //       className="hidden odd-shape md:inline-block absolute w-full h-full"
  //       alt=""
  //       />
  //       </div>
  //           <div className=
  //           {isSignup ? "auth__form-container_fields-content" : "auth__form-container_fields-content2"}>
  //               <p>{isSignup ? "Sign Up" : "Sign In"}</p>
  //               <form onSubmit={handlesubmit}>
  //                   {isSignup && (
  //                       <div className='auth__form-container_fields-content_input'>
  //                           <label htmlFor="fullName">Full Name</label>
  //                           <input name="fullName"
  //                           type='text' placeholder='Full Name' onChange={handleChange} required
  //                           />
  //                       </div>
  //                   )}
  //                       <div className='auth__form-container_fields-content_input'>
  //                           <label htmlFor="userName">Username</label>
  //                           <input name="userName"
  //                           type='text' placeholder='User Name' onChange={handleChange} required
  //                           />
  //                       </div>
  //                       {isSignup && (
  //                       <div className='auth__form-container_fields-content_input'>
  //                           <label htmlFor="profilePicture">Pofile Picture</label>
  //                           <input name="profilePicture"
  //                           type='text' placeholder='Profile Picture' onChange={handleChange} required
  //                           />
  //                       </div>
  //                   )}
  //                   {isSignup && (
  //                       <div className='auth__form-container_fields-content_input'>
  //                           <label htmlFor="phoneNumber">Phone Number</label>
  //                           <input name="phoneNumber"
  //                           type='text' placeholder='Phone Number' onChange={handleChange} required
  //                           />
  //                       </div>
  //                   )}
                    
  //                       <div className='auth__form-container_fields-content_input'>
  //                           <label htmlFor="password">Password</label>
  //                           <input name="password"
  //                           type='password' placeholder='Password' onChange={handleChange} required
  //                           />
  //                       </div>
                    
  //                   {isSignup && (
  //                       <div className='auth__form-container_fields-content_input'>
  //                           <label htmlFor="confirmPassword">Confirm Passowrd</label>
  //                           <input name="confirmPassword"
  //                           type='password' placeholder='Confirm Password' onChange={handleChange} required
  //                           />
  //                       </div>
  //                   )}

  //                   <div className='auth__form-container_fields-content_button'> 
  //                       <button>{isSignup ? "Sign Up" : "Sign In"}</button>
  //                   </div>
  //               </form>
  //               <div classname='auth__form-container_fields-account'>
  //                   <p>
  //                       {isSignup
  //                       ? "Already have an account? "
  //                       : "Don't have an account? "}    
  //                       <span onClick={switchForm}>
  //                           {isSignup ? 'Sign In' : 'Sign Up'}
  //                       </span>
  //                   </p>
  //               </div>
  //           </div>
  //       </div>
  //   </div>
    
  // )
  //                       }
// return (
//    <div>
//     <div>
//         <form>
//             <h1> Create Account</h1>
//                    <input name="fullName"
//                    type='text' placeholder='Full Name' onChange={handleChange} 
//                    required        
//                    />
//                    <input name="userName"
//                    type='password' placeholder='User Name' onChange={handleChange} 
//                    required        
//                    />
//                    <input name="phoneNumber"
//                    type='number' placeholder='Phone Number' onChange={handleChange} 
//                    required        
//                    />
//                    <input name="profilePicture"
//                    type='text' placeholder='Profile Picture' onChange={handleChange} 
//                    required        
//                    />
//                    <input name="password"
//                    type='password' placeholder='Password' onChange={handleChange} 
//                    required        
//                    />
//                    <input name="confirmPassword"
//                    type='password' placeholder='Confirm Password' onChange={handleChange} 
//                    required        
//                    />
//                    <button type='submit'>REGISTER</button>
//         </form>
//     </div>
//     <div>
//         <form>
//             <h1> Login</h1>
//             <input name="userName"
//                    type='password' placeholder='User Name' onChange={handleChange} 
//                    required   
//                    />
//             <input name="password"
//                    type='password' placeholder='Confirm Password' onChange={handleChange} 
//                    required        
//                    />
//         </form>
//     </div>
//     <div>
//         <div>
//             <div>
//                 <button className='ghost' id='signIn'>
//                     Go to Login
//                 </button>
//             </div>
//             <div>
//                 <button className='ghost' id='signIn'>
//                     Go to Register
//                 </button>
//             </div>
//         </div>
//     </div>
//    </div>
// )



export default Auth
