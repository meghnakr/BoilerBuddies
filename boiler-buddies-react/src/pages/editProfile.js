import Modal from 'react-modal'; //run 'npm install react-modal' if error
import React, {useRef, useState} from 'react';

export default function EditProfile() {
    const [selectedImage, setSelectedImage] = useState(null);
    const inputFile = useRef(null);

    const uploadPhoto = () => {
        inputFile
            .current
            .click();
    }

    return (
        <div className='page-container'>
            <form className='edit-profile-form' type="submit">
                <h3
                    style={{
                        fontWeight: 'bolder'
                    }}>Edit Profile</h3>
                <div className='profile-photo'>
                    <div className='profile-photo-container'>
                        <div className='profile-photo-circle'>
                            <div className='upload-icon' >
                            <i className='fa fa-user' style={{fontSize: '9vmin'}}></i>
                            </div>
                            {selectedImage &&
                                <img src={URL.createObjectURL(selectedImage)} alt='img'/>
                            }
                            
                        </div>

                    </div>
                    <div className='button-container'>
                        
                        <label for="upload-file" ><i className="fa fa-upload" style={{marginRight:"4px"}}/>
                             Upload photo</label>
                            <input
                            type="file" id="upload-file" accept='image/*'
                            ref={inputFile} style={{display:'none'}}
                            onChange={(event) => {
                                setSelectedImage(event.target.files[0]);
                            }}/>
                        <button className='default-btn-white' onClick={() => {setSelectedImage(null)}}><i className="fa fa-trash" style={{marginRight:"4px"}}/>
                            Remove photo</button>
                    </div>
                </div>

                <div className="profile-info">
                    <div>
                        <label>Display Name</label>
                        <input type="text" value=''/>
                    </div>
                    <div>
                        <label>Interests</label>
                        <select name="interest">
                            <option></option>
                        </select>
                    </div>
                    <div>
                        <label>Bio</label>
                        <textarea type="text" placeholder="Bio" cols="40" rows="5"/>
                    </div>

                </div>
                <button
                    type="submit"
                    className='default-btn'
                    style={{
                        width: '80%'
                    }}>Save profile</button>
            </form>
        </div>
    )
}