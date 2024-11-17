import { useNavigate } from 'react-router-dom'; 

import '../styles/logoutbutton.css'

const LogoutButton = () => {
    const navigate = useNavigate()

    const logOut = () => {
        navigate('/')
    }

    return <input className='logout-button' value='Log out' type='button' onClick={logOut} />
}

export default LogoutButton