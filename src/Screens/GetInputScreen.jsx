import React, { useState } from 'react'
import "./GetInputScreen.css"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Lottie from 'lottie-react';
import AI_Animation from '../assets/Animations/AI.json';
import { Alert, Fab } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Link, useNavigate } from 'react-router-dom';

function GetInputScreen() {

    const [topic, setTopic] = useState('')
    const navigate = useNavigate();

    const handleMagic = () => {
        console.log("Topic:", topic)
        if (topic.trim() === '') {
            alert("Tpoic cannot be empty");
        }
        else {
            navigate('/Output', {
                state: { topic }  // Passing topic as state
            });
        }


    }
    return (
        <div className='container'>
            <div className='header'>
                <div className='menu'>
                    <MenuRoundedIcon style={{ fontSize: '30px' }} />
                </div>
            </div>

            <div className='textContainer'>
                <h4>AI Assistant</h4>
                <h1>Hello there <span>human!</span></h1>
                <h1>How can I <span>assist you?</span></h1>
            </div>
            <div>
                <Lottie animationData={AI_Animation} loop={true} style={{ width: 500, height: 500, justifySelf: 'center', marginTop: 10 }} />
            </div>
            <div>
                <div className='txtInputContainer'>
                    <input placeholder='Enter Topic' onChange={(e) => { setTopic(e.target.value) }} />
                    <div className="FabWrapper">
                        <Fab className='fabContainer' size='small' onClick={handleMagic}>
                            <AutoFixHighIcon style={{ color: 'white' }} />
                        </Fab>

                    </div>
                </div>
            </div>

        </div>

    )
}

export default GetInputScreen
