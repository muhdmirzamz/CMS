import { useState } from 'react';

import { useNavigate } from 'react-router-dom'; 

import '../styles/common.css';
import '../styles/dashboard.css';

const Dashboard = () => {

    const [blogPostTitleText, setBlogPostTitleText] = useState('')
    const [blogPostText, setBlogPostText] = useState('')
    const [blogPostList, setBlogPostList] = useState([
        {
            blogTitle: "one",
            blogBody: 
            `this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph.
            this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph.
            `
        },
        {
            blogTitle: "two",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
        },
        {
            blogTitle: "three",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
        },
        {
            blogTitle: "three",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
        },
        {
            blogTitle: "three",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
        },
        {
            blogTitle: "three",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
        },
        {
            blogTitle: "three",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
        },
        {
            blogTitle: "three",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
        },
        {
            blogTitle: "three",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
        },
        {
            blogTitle: "three",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
        },
        {
            blogTitle: "three",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
        }
    ])

    const navigate = useNavigate()

    const goToCreateBlogPostScreen = () => {
        navigate('/create-blog-post')
    }

    return (
        <div className='main-body'>
            
            <div className='vertical-layer vertical-layer-one'>
                {/* vertical layer one */}

                <input className='nav-button' value='Create blog post' type='button' onClick={goToCreateBlogPostScreen} />
            </div>
            <div className='vertical-layer vertical-layer-two'>

                <div className='blogpost-list-div'>
                    {
                        blogPostList.map((blogPost, index) => {
                            return (
                                <div className='blogpost' key={index}>
                                    <h2>{blogPost.blogTitle}</h2>
                                    <p>{blogPost.blogBody}</p>
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
