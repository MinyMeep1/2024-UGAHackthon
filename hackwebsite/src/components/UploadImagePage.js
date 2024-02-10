import React, {useState, useEffect,useRef} from 'react';
import '../css/UploadImagePage.css'
function UploadImagePage(){
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

    return(
        <body>
            <div id="useText">
                On this page you can upload photos of missing people directly. This will allow
                The facial recognition system to be able to start making matches and 
                find who you are lookin for
            </div>
            
            <input type='file' id='ImgUpload' ref={inputFile} style={{ display: 'none' }} accept='.jpg' onChange={onFileChange}/>
            <button onClick={onButtonClick}>Choose a photo to upload</button>
        </body>
    );
}
export default UploadImagePage;
