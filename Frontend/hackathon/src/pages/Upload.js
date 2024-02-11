import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../UploadImagePage.css';
import { MenuBar } from '../components/MenuBar';

function Upload() {
    const inputFile = useRef(null);

    const onButtonClick = () => {
        inputFile.current.click();
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
                    required
                    ></input>
                </div>
                    <input type='file' id='ImgUpload' ref={inputFile} style={{ display: 'none' }} accept='.jpg' onChange={onFileChange} />
                    <Button onClick={onButtonClick}>Choose a photo to upload</Button>
                </div>

            
                    
                <div id="Button-holderSUP" >
                    <Button type='submit' className="mx-auto p-3 input-group mb-3" id="ButtonSubmitSignUp" >Submit</Button>
                </div>
            </div>
            </form>
        </div>
    );
}

export default Upload;
