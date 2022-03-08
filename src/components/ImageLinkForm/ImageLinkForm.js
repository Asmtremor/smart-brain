import React from 'react'
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain Will Detect Faces In Your Pictures. Git It A Try.'}
            </p>
            <div className = "center">
                <div className = "pa4 form br3 center shadow-5">
                    <input className = "f4 pa2 w-70 center" onChange = {onInputChange} type = "text" />
                    <button 
                        onClick = {onButtonSubmit} 
                        className = "w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
                </div>
            </div>
            <div>
                
            </div>
        </div>
        
    )
}

export default ImageLinkForm