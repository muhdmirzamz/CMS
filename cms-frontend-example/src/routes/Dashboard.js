import { useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom'; 

import axios from 'axios';

import LogoutButton from '../component/LogoutButton';

import '../styles/common.css';
import '../styles/dashboard.css';

const Dashboard = () => {

    const [blogPostList, setBlogPostList] = useState([])

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        fetchBlogPosts()
    }, [location.key])

    const fetchBlogPosts = () => {
        let tmpArr = []

        axios.get('http://localhost:9000/getPosts').then(response => {

            let data = response.data

            for (const key in data) {
                tmpArr.push(data[key])
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
                        blogPostList.map((blogPost, index) => {
                            return (
                                <div className='blogpost' key={index}>
                                    <h2>{blogPost.title}</h2>
                                    <p>{blogPost.body}</p>
                                </div>
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
