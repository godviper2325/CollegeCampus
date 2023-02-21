import React from 'react'

export default function Profile() {
    return (
       
        <div style={{maxWidth:"500px" , margin:"0px auto"}}>
           <div style={{display:"flex", justifyContent:"space-between", margin:"20px 0px", borderBottom:"1px solid gray"}}>  
               <div>
               
                <br></br>
                <br></br>
                

                  <img style={{width:"180px", height:"180px", borderRadius:"100px"}} src={require('../../images/logo2.jpg')}></img>

               </div>
               <div>
               
                <h4>Sample user 1</h4>
                <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                    <h6>50 posts</h6>
                    <h6>100 followers</h6>
                    <h6>100 following</h6>
                </div>
               
            </div>   
           
           
            </div>
        
         <div className="gallery">
            
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo1.jpeg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo2.jpg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo1.jpeg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo2.jpg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo1.jpeg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo2.jpg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo1.jpeg')}></img>
            
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo1.jpeg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo2.jpg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo1.jpeg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo2.jpg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo1.jpeg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo2.jpg')}></img>
            <img className="photos" style={{width:"180px", height:"180px"}} src={require('../../images/logo1.jpeg')}></img>
         </div>
         
       
      </div>          
        
    )
}