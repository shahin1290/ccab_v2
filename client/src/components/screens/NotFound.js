import React from 'react'
import logo from './../../assets/images/logoBody.png'
import image from './../../assets/images/404.png'
import background from './../../assets/images/background/pattern-4.png'

export default function NotFound() {
    return (
        <div>
            {/* Error Section */}
            <section className="error-section pt-0 bg-dark" style={{backgroundImage: `url(${background})`}}>
            <div className="auto-container">
                <div className="content">
                <div className="content-inner">
                    <div className="logo">
                    <a href="/"><img src={logo} alt width="20%" className="mb-4"/></a>
                    </div>
                    <div className="image">
                    <img src={image} alt />
                    </div>
                    <div className="text display-4 mb-4">Something went wrong</div>
                    <a href="/" className="theme-btn btn-style-one"><span className="txt">Back To Homepage</span></a>
                    
                </div>
                </div>
            </div>
            </section>
            {/* End Error Section */}

        </div>
    )
}
