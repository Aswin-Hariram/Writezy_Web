import React from 'react'
import "./DisplayOutputScreen.css";
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Fab } from '@mui/material';

function DisplayOutputScreen() {

const navigate = useNavigate();
  const location = useLocation()
  const { topic } = location.state;
   const handleBackClick = () => {
    navigate('/getinputscreen'); // Navigate to GetInputScreen
  };

  return (
    <div className='container'>
        <div className='header'>
            <div className='menu' onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                <ArrowBackIcon style={{fontSize:'30px'}} />
          </div>
            <h3>Writezy</h3>
          <div className='menu'>
            <FileUploadIcon style={{fontSize:'30px'}}/>
          </div>
        </div>
        <div className='output'>
          <h5 style={{fontSize:'20px', color:'#333'}}>{topic}</h5>
          <p>Here is the output Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque distinctio unde aspernatur dolores 
            voluptate consequuntur tenetur ullam quia quae minima. Ullam et unde maxime sunt iure asperiores, voluptates atque voluptatibus?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea placeat, modi id nulla est quod earum obcaecati, itaque culpa repellendus
             numquam dolorem vitae facilis natus quaerat non possimus repellat distinctio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, omnis? Aliquam
              deserunt hic aperiam reiciendis necessitatibus rerum in quas tempore quos odio alias, cupiditate sit repellendus magni nostrum voluptate vero?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit deleniti ratione voluptas dolores sed itaque distinctio facere quod aliquid numquam. Nulla tenetur
               officia blanditiis a ad odit necessitatibus accusamus hic! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum aspernatur quidem dignissimos. Explicabo dolorem
                quas optio. Voluptas veniam iste tempore fugit culpa eos, praesentium laboriosam consequatur maxime quia quis omnis quisquam repudiandae! Reprehenderit non eum, veritatis
                 sequi dolor harum alias laudantium incidunt officia repellendus. Et officiis similique at rem voluptatem! Fuga eligendi totam eum culpa assumenda enim nostrum ducimus similique
                  error expedita eaque vitae, saepe doloribus voluptatem, nam tempore. Laudantium ullam quos cumque temporibus repudiandae maiores eaque dignissimos sint distinctio eveniet
                   reiciendis, hic quae. Hic laboriosam necessitatibus commodi quia porro suscipit. Quia recusandae harum id, laudantium rerum magni esse laborum.
          </p>
        </div>
        <div>
                <div className='txtInputContainer'>
                    <input placeholder='Edit with AI'  />
                    <div className="FabWrapper">
                        <Fab className='fabContainer' size='small' >
                            <AutoFixHighIcon style={{ color: 'white' }} />
                        </Fab>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default DisplayOutputScreen;
