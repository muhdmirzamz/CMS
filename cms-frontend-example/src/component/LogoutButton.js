import { useNavigate } from 'react-router-dom'; 

import CookieManager from '../CookieManager';

import '../styles/logoutbutton.css'

const LogoutButton = () => {
    const navigate = useNavigate()
    
    const cookieManager = new CookieManager()

    const logOut = () => {
        cookieManager.deleteCookie("username")

        navigate('/')
    }

    return <input className='logout-button' value='Log out' type='button' onClick={logOut} />
}

export default LogoutButton