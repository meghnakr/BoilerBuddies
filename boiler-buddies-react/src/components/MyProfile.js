import React from 'react';
import PropTypes from 'prop-types';
import Multiselect from 'multiselect-react-dropdown';

export default class MyProfile extends React.Component {
    static propTypes = {
        displayName: PropTypes.string,
        interestTags: PropTypes.instanceOf(Array),
        bio: PropTypes.string
    }

    constructor(props) {
        super(props);
    
        this.state = {
          selectedImage: null,
          name: this.props.displayName,
          tags: this.props.interestTags,
          biography: this.props.bio,
        };

      }

      handleSubmit = () => {

      }

    render() {
        const {
            state: {
                selectedImage,
                name,
                tags,
                biography
            },
            handleSubmit
        } = this;
        return (
            <form className='edit-profile-form' type="submit" onSubmit={handleSubmit}>
                <div className='profile-photo'>
                    <div className='profile-photo-container'>
                        <div className='profile-photo-circle'>
                            <div className='upload-icon'>
                                <i
                                    className='fa fa-user'
                                    style={{
                                        fontSize: '9vmin'
                                    }}></i>
                            </div>
                            {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt='img'/>}

                        </div>

                    </div>
                    <div className='button-container'>

                        <label for="upload-file"><i
                            className="fa fa-upload"
                            style={{
                marginRight: "4px"
            }}/>
                            Upload photo</label>
                        <input
                            type="file"
                            id="upload-file"
                            accept='image/*'
                            style={{
                                display: 'none'
                            }}
                            onChange={(event) => {
                                this.setState({selectedImage: event.target.files[0]});
                            }}/>
                        <button
                            className='default-btn-white'
                            onClick={() => {
                                this.setState({selectedImage: null})
                            }}><i
                            className="fa fa-trash"
                            style={{
                marginRight: "4px"
            }}/>
                            Remove photo</button>
                    </div>
                </div>

                <div className="profile-info">
                    <div>
                        <label>Display Name</label>
                        <input type="text" value={name}/>
                    </div>
                    <div>
                        <label>Interests</label>
                        <Multiselect
                        placeholder='' selectedValues={tags}
                        style={{
                                searchBox: {
                                    borderRadius: '0%',
                                    border: '0.5px solid grey',
                                    padding: '0.5px 2px'
                                },
                                optionContainer: {
                                    borderRadius: '0%',
                                    border: '0.5px solid grey'
                                }
                            }}/>
                    </div>
                    <div>
                        <label>Bio</label>
                        <textarea type="text" cols="40" rows="5" value={biography}/>
                    </div>

                </div>
                <button
                    type="submit"
                    className='default-btn'
                    style={{
                        width: '80%'
                    }}>Save profile</button>
            </form>
        )
    }
}