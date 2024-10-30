import { useState } from 'react';

import '../styles/Dashboard.css';

const Dashboard = () => {

    const [blogPostText, setBlogText] = useState('')
    const [blogPostList, setBlogPostList] = useState([
        {
            blogTitle: "one",
            blogBody: "this is a paragraph.this is a paragraph.this is a paragraph.this is a paragraph. this is a paragraph.this is a paragraph."
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

    const blogPostTextValueChanged = (event) => {
        setBlogText(event.target.value)
    }

    const postBlogPost = () => {

    }

    return (
        <div className='dashboard-body'>

            <div className='layered-div'>
                <div className='vertical-layer vertical-layer-one'>
                    {/* vertical layer one */}
                </div>
                <div className='vertical-layer vertical-layer-two'>
                    {/* this div houses the divs for text area and button */}
                    <div className='blogpost-text-area-component-div'>
                        {/* this div is the parent component for the text area */}
                        <div className='blogpost-text-area-div'>
                            <textarea className='blogpost-text-area' value={blogPostText} onChange={blogPostTextValueChanged}>
                            </textarea>
                        </div>

                        {/* this div is the parent component for the post button */}
                        <div className='blogpost-post-button-div'>
                            <input className='post-button' value='Post' type='button' onClick={postBlogPost} />
                        </div>
                    </div>
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

        </div>
    )
}

export default Dashboard
