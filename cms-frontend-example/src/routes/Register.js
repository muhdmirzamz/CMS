import { useState } from 'react';

import '../App.css';

const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameTxtfieldValueChange = (event) => {
        setUsername(event.target.value)
    }

    const passwordTxtfieldValueChange = (event) => {
        setPassword(event.target.value)
      }

    return (
        <div>
            <h1>Register</h1>
            <input type='text' value={username} className='tf' onChange={usernameTxtfieldValueChange} />
            <input type='password' value={password} className='tf' onChange={passwordTxtfieldValueChange} />
        </div>
    )
}

export default Register