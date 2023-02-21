import  Modal  from 'react-modal';
import React, {useState} from 'react';
import logo from '../assets/logo_vector.png';

export default function EditProfile() {
    const [uploadModal, setUpload] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const toggleModal = () => {
        setUpload(!uploadModal);
    }
    return (
        <div className='page-container'>
            <div className='profile-photo-container'>
                <div className='profile-photo-circle' onClick={toggleModal}>
                    <img src={logo} alt='img'/>
                    <div className='upload-icon' >
                        <i className='fa fa-upload' style={{fontSize: '4vmin'}}></i>
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={uploadModal}
                onRequestClose={toggleModal}
                contentLabel="Upload photo"
                portalClassName='upload-modal'>
                    <div className='profile-photo'>
                        {selectedImage && (
                            <div className='photo-preview'>
                                <img alt="not found"
                                    src={URL.createObjectURL(selectedImage)} />
                                <button className='default-btn' onClick={() => setSelectedImage(null)}>Remove</button>
                            </div>
                        )}
                    <input
                        type="file"
                        className='profile-upload'
                        name="profileImage"
                        onChange={(event) => {
                            setSelectedImage(event.target.files[0]);
                    }}
                />
                </div>
            </Modal>
        </div>
    )
}