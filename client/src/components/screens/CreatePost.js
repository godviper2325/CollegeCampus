import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function CreatePost() {

    const [fileInput, setFileInput] = useState({ title: "", body: "", image: "" });
    const [url, setUrl] = useState([])

    const getFileInput = (e) => {
        // console.log(e.target.files[0].name);
        if (e.target.name === 'image') {
            let data = { ...fileInput, [e.target.name]: e.target.files[0] }
            setFileInput(data)
        } else {
            let data = { ...fileInput, [e.target.name]: e.target.value }
            setFileInput(data)
        }

    }

    const onClickcreatePost = async () => {
        console.log(fileInput);
        const data = new FormData()
        data.append('file', fileInput.image)
        data.append('upload_preset', 'socialmedia')
        data.append('cloud_name', 'deswhfdie')

        let resultdata = await axios.post('https://api.cloudinary.com/v1_1/deswhfdie/image/upload', data)
            .then(result => {
                console.log(result.data.url);
                setUrl(url.push(result.data.url))

                axios.post('http://localhost:7000/createpost', { title: fileInput.title, body: fileInput.body, photo: url[0] },

                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('jwt')}`

                        }
                    })

                    .then(moduleresult => {
                        console.log(moduleresult);
                        link("/");
                    }).catch(moduleerr => {
                        console.log(moduleerr);
                    }).catch(err => {
                        console.log(err);
                    })

            })
    }
    const link=useNavigate();
    return (
        <div className="card input-field">
            <input name="title" type="text" placeholder="Enter title" onChange={getFileInput}></input>
            <input name="body" type="text" placeholder="Enter body" onChange={getFileInput}></input>

            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload File</span>
                    <input name="image" type="file" onChange={getFileInput} multiple />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload file" />
                </div>
            </div>

            <button className="btn waves-effect waves-light" onClick={() => onClickcreatePost()}><i class="material-icons right">send</i>Create Post</button>

        </div>
    )
}