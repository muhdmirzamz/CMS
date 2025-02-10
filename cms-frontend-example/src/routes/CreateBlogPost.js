import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import LogoutButton from '../component/LogoutButton';

import CookieManager from '../CookieManager';

import '../styles/common.css';
import '../styles/createblogpost.css'

const CreateBlogPost = () => {

    const [blogPostTitleText, setBlogPostTitleText] = useState('')
    const [blogPostBodyText, setBlogPostBodyText] = useState('')

    const [blogPostTagText, setBlogPostTagText] = useState('')
    const [blogPostTags, setBlogPostTags] = useState([])

    const navigate = useNavigate()

    const cookieManager = new CookieManager()

    useEffect(() => {

        console.log("[ CreateBlogPost ] use effect")

        // kicks the user out if cookie is invalid or non-existent
        if (cookieManager.getCookie("username") === null) {
            navigate('/') 
        } else if (cookieManager.getCookie("username") === "") { // this happens when the tab is closed
            console.log(`cookie is empty string`)

            cookieManager.deleteCookie("username")
            navigate('/')
        } else {
            console.log("[ CreateBlogPost ] we are good")
        }

    }, [])

    const backToHome = () => {
        navigate("/dashboard")
    }

    // blog post title and text area =========

    const blogPostTitleTextValueChanged = (event) => {
        setBlogPostTitleText(event.target.value)
    }

    const blogPostBodyTextValueChanged = (event) => {
        setBlogPostBodyText(event.target.value)
    }

    // tags =========
    const blogPostTagTextValueChanged = (event) => {
        setBlogPostTagText(event.target.value)
    }

    const addTagOnEnterKeyPress = (event) => {
        if (event.keyCode === 13) {
            addTag()

            // default text area behaviour is to go to a new line after you press enter
            // we do not want that behaviour
            event.preventDefault()
        }
    }

    const addTag = () => {
        console.log("[ CreateBlogPost ] adding tag ")

        setBlogPostTags((prevState) => {
            return [...prevState, blogPostTagText]
        })

        setBlogPostTagText('')
    }

    // post blog post =========
    const postBlogPost = (event) => {
        if (cookieManager.getCookie("username") !== null && cookieManager.getCookie("username") !== "") {
            axios.post('http://localhost:9000/post', {title: blogPostTitleText, body: blogPostBodyText}).then(res => {

                console.log(res)
            
                if (res.status === 200) {
                    navigate('/dashboard')
                }
        
            })
        }
    }

    return(
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
                        <textarea className='blogpost-title-text-area' value={blogPostTitleText} onChange={blogPostTitleTextValueChanged}>
                        </textarea>
                    </div>

                    {/* this div is the parent component for the text area */}
                    <div className='blogpost-text-area-div'>
                        <textarea className='blogpost-text-text-area' value={blogPostBodyText} onChange={blogPostBodyTextValueChanged}>
                        </textarea>
                    </div>

                    <div className='blogpost-tags-div'>
                        <div className='blogpost-tags-inner-div'>
                            <p>Tags</p>

                            <div className='blogpost-tags-post-div'>
                                <textarea 
                                    rows={1}
                                    className='blogpost-tags-text-area' 
                                    value={blogPostTagText} 
                                    onChange={blogPostTagTextValueChanged}
                                    onKeyDown={addTagOnEnterKeyPress}
                                >
                                </textarea>
                                <input className='tags-post-button' value='Add tag' type='button' onClick={addTag} />
                            </div>

                            <ul>
                                {
                                    blogPostTags.map((tag, index) => {
                                        return (
                                            <li className='tag' key={index}>{tag}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    {/* this div is the parent component for the post button */}
                    <div className='blogpost-post-button-div'>
                        <input className='post-button' value='Post' type='button' onClick={postBlogPost} />
                    </div>
                </div>

            </div>
            <div className='vertical-layer vertical-layer-three'>
                {/* vertical layer three */}
                
            </div>
        </div>
    )
}

export default CreateBlogPost