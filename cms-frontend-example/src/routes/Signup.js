import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import '../App.css';

const Signup = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const usernameTxtfieldValueChange = (event) => {
        setUsername(event.target.value)
    }

    const passwordTxtfieldValueChange = (event) => {
        setPassword(event.target.value)
    }

    const onSignup = () => {
        axios.post('http://localhost:9000/signup', {username: username, password: password}).then(res => {

            console.log(res)
        
            if (res.status === 200) {
                navigate('/')
            }
    
        })
    }

    return (
        <div>
            <h1>Register</h1>
            <input type='text' value={username} className='tf' onChange={usernameTxtfieldValueChange} />
            <input type='password' value={password} className='tf' onChange={passwordTxtfieldValueChange} />
            <input type="button" className="signup-btn" onClick={onSignup} value="Sign up" />
        </div>
    )
}

export default Signup