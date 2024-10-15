import { useState } from 'react';

import '../styles/Dashboard.css';

const Dashboard = () => {

    const [blogPostText, setBlogText] = useState('')

    const blogPostTextValueChanged = (event) => {
        setBlogText(event.target.value)
    }

    const postBlogPost = () => {

    }

    return (
        <div className='dashboard-body'>

            <div className='layered-div'>
                <div className='layer layer-one'>
                    vertical layer one
                </div>
                <div className='layer layer-two'>
                    vertical layer two
                </div>
                <div className='layer layer-three'>
                    vertical layer three
                </div>
            </div>

            {/* <h1>DASHBOARD</h1>

            <textarea className="blogpost-text-area" value={blogPostText} onChange={blogPostTextValueChanged}>
                nvksnvksnv
            </textarea>
            <input type='button' onClick={postBlogPost} /> */}
        </div>
    )
}

export default Dashboard
