import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import '../styles/signup.css';

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

    const usernameSignupOnEnter = (event) => {
        if (event.keyCode === 13) {
            onSignup()
        }
    }

    const passwordSignupOnEnter = (event) => {
        if (event.keyCode === 13) {
            onSignup()
        }
    }

    const onSignup = () => {
        axios.post('http://localhost:9000/signup', {username: username, password: password}).then(res => {

            console.log(res)
        
            if (res.status === 200) {
                navigate('/')
            }
        }).catch(error => {
            console.log(`error code block`)
            alert(`${error.response.data}. Please check that your username has an @gmail extension`)
            setUsername('')
            setPassword('')
          })
    }

    return (
        <div className='signup-main-body'>
            <div className="signup-panel">
                <div className='signup-panel-title'>
                    Sign up
                </div>
                <div className='signup-textfields-area'>
                    <input 
                        type='text' 
                        value={username} 
                        className='signup-textfields' 
                        id="signup-usernameTextfield" 
                        onChange={usernameTxtfieldValueChange} 
                        onKeyDown={usernameSignupOnEnter}
                    />
                    <input 
                        type='password' 
                        value={password} 
                        className='signup-textfields' 
                        id="signup-passwordTextfield" 
                        onChange={passwordTxtfieldValueChange} 
                        onKeyDown={passwordSignupOnEnter}
                    />
                    
                    <input type="button" className="signup-btn" onClick={onSignup} value="Sign up" />
                </div>
            </div>
        </div>
    )
}

export default Signup