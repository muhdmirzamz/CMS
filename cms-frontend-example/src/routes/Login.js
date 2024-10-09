import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import '../App.css';

import axios from 'axios';

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const usernameTxtfieldValueChange = (event) => {
    setUsername(event.target.value)
  }

  const passwordTxtfieldValueChange = (event) => {
    setPassword(event.target.value)
  }

  const onLogin = () => {
    axios.post('http://localhost:9000/login', {username: username, password: password}).then(res => {

      console.log(res)

      if (res.status === 200) {
        navigate('/dashboard')
      }

    })
  }

  return (
    <div className="login-panel">

      <div className='title'>
        Test
      </div>
      <div className='textfields'>
        <input type='text' value={username} className='tf' onChange={usernameTxtfieldValueChange} />
        <input type='password' value={password} className='tf' onChange={passwordTxtfieldValueChange} />
      </div>

      <input type="button" className="login-btn" onClick={onLogin} value="Login" />
      <p>Don't have an account? <a href={`/signup`}>Register</a>  </p>
    </div>
  );
}

export default Login;
