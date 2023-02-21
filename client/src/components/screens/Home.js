import React from 'react'

export default function Home() {
    return (
        <div>
            <div className="card home-card">
                <h6>User Name1</h6>
                <div className="card-image">
                    <img src={require('../../images/pic6.jpg')}></img>

                </div>
                <div>
                    
                       <i className="material-icons" style={{color:'red'}}>favorite</i>
                    <h6>Title</h6>
                    <p>info about image</p>
                    <input type="text" placeholder="Enter your comments"></input>
                </div>
            </div>
            <div className="card home-card">
                <h6>User Name1</h6>
                <div className="card-image">
                    <img src={require('../../images/pic5.jpg')}></img>

                </div>
                <div>
                    
                       <i className="material-icons" style={{color:'red'}}>favorite</i>
                    <h6>Title</h6>
                    <p>info about image</p>
                    <input type="text" placeholder="Enter your comments"></input>
                </div>
            </div>
        </div>
            
        
    )
}