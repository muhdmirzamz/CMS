import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import LogoutButton from '../component/LogoutButton';

import CookieManager from '../CookieManager';

import '../styles/common.css';

const BlogPostDetailView = () => {

    const { id } = useParams() // variable id follows the declared variable in the route code in index.js
    const navigate = useNavigate()

    const [blogPostTitleText, setBlogPostTitleText] = useState('')
    const [blogPostBodyText, setBlogPostBodyText] = useState('')

    const cookieManager = new CookieManager()

    useEffect(() => {

        console.log(`detail view blogPostKey: ${id}`)

        axios.get(`http://localhost:9000/getPostWithId`, {
            params: {
              id: id
            }
        }).then(res => {
            console.log(res)

            setBlogPostTitleText(res.data.title)
            setBlogPostBodyText(res.data.body)
        })
    }, [])

    const backToHome = () => {
        navigate("/dashboard")
    }

    const blogPostTitleTextValueChanged = (event) => {
        setBlogPostTitleText(event.target.value)
    }

    const blogPostBodyTextValueChanged = (event) => {
        setBlogPostBodyText(event.target.value)
    }

    const updateBlogPost = (event) => {
        if (cookieManager.getCookie("username") !== null && cookieManager.getCookie("username") !== "") {
            axios.post('http://localhost:9000/updatePost', {
                id: id,
                title: blogPostTitleText, 
                body: blogPostBodyText
            }).then(res => {
                console.log(res)
            
                if (res.status === 200) {
                    navigate('/dashboard')
                }
        
            })
        }
    }

    return (
        <div className='main-body'>
            <div className='vertical-layer vertical-layer-one'>
                {/* vertical layer one */}

                <input className='nav-button' value='Home' type='button' onClick={backToHome} />
                <LogoutButton />
            </div>
            <div className='vertical-layer vertical-layer-two'>
                {/* vertical layer two */}

                {/* this div houses the divs for text area and button */}
                <div className='blogpost-input-component-div'>

                    <div className='blogpost-title-div'>
                        <textarea className='blogpost-title-text-area' placeholder={blogPostTitleText} onChange={blogPostTitleTextValueChanged}>
                        </textarea>
                    </div>

                    {/* this div is the parent component for the text area */}
                    <div className='blogpost-text-area-div'>
                        <textarea className='blogpost-text-text-area' placeholder={blogPostBodyText} onChange={blogPostBodyTextValueChanged}>
                        </textarea>
                    </div>

                    {/* this div is the parent component for the post button */}
                    <div className='blogpost-post-button-div'>
                        <input className='post-button' value='Update' type='button' onClick={updateBlogPost} />
                    </div>
                </div>

            </div>
            <div className='vertical-layer vertical-layer-three'>
                {/* vertical layer three */}
                
            </div>
        </div>
    )
} 

export default BlogPostDetailView