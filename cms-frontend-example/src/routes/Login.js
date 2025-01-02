import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CookieManager from '../CookieManager';

import '../App.css';
import '../styles/login.css';

import axios from 'axios';

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const cookieManager = new CookieManager()

  const usernameTxtfieldValueChange = (event) => {
    setUsername(event.target.value)
  }

  const passwordTxtfieldValueChange = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {

    // cookie has not expired
    if (cookieManager.getCookie("username") !== null) {

      console.log(`logged in, going to dashboard`)

      // renew the cookie and login
      cookieManager.setSessionCookie("username", username)

      navigate('/dashboard') 
    }
  }, [])

  const onLogin = () => {
    axios.post('http://localhost:9000/login', {username: username, password: password}).then(res => {

      console.log(res)

      if (res.status === 200) {
        cookieManager.setSessionCookie("username", username)

        navigate('/dashboard')
      }

    })
  }

  return (
    <div className='login-main-body'>

      <div className="login-panel">
        <div className='login-panel-title'>
          CMS
        </div>
        <div className='login-textfields-area'>
          <input type='text' value={username} className='login-textfields' id="usernameTextfield" onChange={usernameTxtfieldValueChange} />
          <input type='password' value={password} className='login-textfields' id="passwordTextfield" onChange={passwordTxtfieldValueChange} />
        
          <input type="button" className="login-btn" onClick={onLogin} value="Login" />
        </div>

        <div className='login-textfields-signup-area'>
          <p>Don't have an account? <a href={`/signup`}>Sign up</a></p>
        </div>
      </div>

    </div>
  );
}

export default Login;
