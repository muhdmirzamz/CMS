import { useEffect, useState } from 'react';

import { useNavigate, useLocation, Link } from 'react-router-dom'; 

import axios from 'axios';

import LogoutButton from '../component/LogoutButton';

import CookieManager from '../CookieManager';

import '../styles/common.css';
import '../styles/dashboard.css';

const Dashboard = () => {

    const [blogPostList, setBlogPostList] = useState([])

    const navigate = useNavigate()

    const cookieManager = new CookieManager()

    useEffect(() => {
        // kicks the user out if cookie is invalid or non-existent
        if (cookieManager.getCookie("username") === null) {
            navigate('/') 
        } else if (cookieManager.getCookie("username") === "") { // this happens when the tab is closed
            console.log(`cookie is empty string`)
            
            // the site will go on an endless loop if you dont delete the cookie
            // here is what happens
            // 1) it sees a valid, not null cookie but with an empty string
            // 2) and it will proceed to render the page
            // 3) but then it sees the navigation back to login
            cookieManager.deleteCookie("username")
            navigate('/')
        } else {
            fetchBlogPosts()

            console.log(`DASHBOARD USE EFFECT`)
        }
    }, []) 

    const fetchBlogPosts = () => {
        let tmpArr = []

        axios.get('http://localhost:9000/getPosts').then(response => {

            let data = response.data

            for (const i in data) {
                // square brackets to access the key, not just 'i'
                let blogPost = {[i]: data[i]}

                tmpArr.push(blogPost)
            }

            setBlogPostList(tmpArr)
        })
    }

    const goToCreateBlogPostScreen = () => {
        navigate('/create-blog-post')
    }

    return (
        <div className='main-body'>
            
            <div className='vertical-layer vertical-layer-one'>
                {/* vertical layer one */}

                <input className='nav-button' value='Create blog post' type='button' onClick={goToCreateBlogPostScreen} />
                {/* <input className='logout-button' value='Log out' type='button' onClick={logOut} /> */}
                <LogoutButton />
            </div>
            <div className='vertical-layer vertical-layer-two'>

                <div className='blogpost-list-div'>
                    {
                        blogPostList.map((blogPostObject, index) => {
                            console.log(`blogpost obj: ${JSON.stringify(blogPostObject)}`)

                            let blogPostKey = Object.keys(blogPostObject)[0]
                            let blogPost = blogPostObject[blogPostKey]

                            return (
                                <Link className="react-router-dom-link" to={`/blog-post-detail-view/${blogPostKey}`} key={index}>
                                    <div className='blogpost' key={index}>
                                        <h2>{blogPost.title}</h2>
                                        <p>{blogPost.body}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>

            </div>
            <div className='vertical-layer vertical-layer-three'>
                {/* vertical layer three */}
            </div>

        </div>
    )
}

export default Dashboard
