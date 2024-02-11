import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import axios for API requests

import '../UploadImagePage.css';
import { MenuBar } from '../components/MenuBar';

function Upload() {
    const inputFile = useRef(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [state, setState] = useState('');
    const [posterLink, setPosterLink] = useState('');
    const [fullName, setFullName] = useState('');

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFullName(firstName+" "+lastName);
        const person = {
            "Name":fullName,
            "State":state,
            "Description":description,
            "ImgUrl":imageUrl,
            "PosterLink":posterLink
        }
        try {
            console.log(person);
            const response = await axios.post("/localhost:8080/people", person);
            // Handle response if needed
        } catch (error) {
            console.log("You fucked up");
            console.log(error);
        }
    };

    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            if (!fileName.endsWith('.jpg')) {
                alert('Please select a JPG file.');
                // Clear the file input
                inputFile.current.value = '';
                return;
            }
            // Handle the file upload
            // Your code to handle the upload goes here
        }
    };

    return (
        <div id="all">
            <MenuBar />
            <form id="signupform">
                <div id="backDiv" className="form-group">
                    <div id="headtxt" className="font-weight-bold">
                        Upload an Image
                    </div>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="w-25 p-3 input-group mb-3" id="half-Split">
                            {/* firstname */}
                            <span className="rounded-left" class="input-text" id="basic-addon1"></span>
                            <input
                                id="signupinput"
                                type="text"
                                class="form-control"
                                placeholder="First Name *"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            ></input>
                        </div>

                        <div className="w-25 p-3 input-group mb-3" id="half-Split">
                            {/* lastname */}
                            <span class="input-text" id="basic-addon1"></span>
                            <input
                                id="signupinput"
                                type="text"
                                class="form-control"
                                placeholder="Last Name *"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center align-items-center h-100" id="emailphonefield">
                        <div className="w-25 p-3 input-group mb-3" id="half-Split">
                            {/*email */}
                            <span class="input-text" id="basic-addon1"></span>
                            <input
                                id="signupinput"
                                type="text"
                                class="form-control"
                                placeholder="Description *"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></input>
                        </div>

                        <div className="w-25 p-3 input-group mb-3" id="half-Split">
                            {/*Phone Number */}
                            <span class="input-text" id="basic-addon1"></span>
                            <input
                                id="signupinput"
                                type="text"
                                class="form-control"
                                placeholder="image url *"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                            ></input>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="w-25 p-3 input-group mb-3" id="half-Split">
                            {/*password */}
                            <span class="input-text" id="basic-addon1"></span>
                            <input
                                id="signupinput"
                                type="password"
                                class="form-control"
                                placeholder="State *"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            ></input>
                        </div>

                        <div className="w-25 p-3 input-group mb-3" id="half-Split">
                            {/*Confirm Password */}
                            <span class="input-text" id="basic-addon1"></span>
                            <input
                                id="signupinput"
                                type="password"
                                class="form-control"
                                placeholder="Poster Link *"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={posterLink}
                                onChange={(e) => setPosterLink(e.target.value)}
                                required
                            ></input>
                        </div>
                        <input type='file' id='ImgUpload' ref={inputFile} style={{ display: 'none' }} accept='.jpg' onChange={onFileChange} />
                        <Button onClick={onButtonClick}>Choose a photo to upload</Button>
                    </div>

                    <div id="Button-holderSUP" >
                        <Button onClick={onSubmit} type='submit' className="mx-auto p-3 input-group mb-3" id="ButtonSubmitSignUp">Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Upload;
