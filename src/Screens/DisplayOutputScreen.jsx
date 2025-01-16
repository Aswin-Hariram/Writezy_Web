import React, { useEffect, useState } from "react";
import "./DisplayOutputScreen.css";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import { Button, Fab } from "@mui/material";
import { GEMINI_KEY } from "../Config/SecureKeys";
import axios from "axios";
import Lottie from "lottie-react";
import Animation_Data from "../assets/Animations/AiLoading.json";
import DownloadSharpIcon from '@mui/icons-material/DownloadSharp';
import { jsPDF } from 'jspdf';

function DisplayOutputScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic } = location.state;
  const [temp, setTemp] = useState('')
  const [Topic, setTopic] = useState(topic);
  const [generatedData, setGeneratedData] = useState("");
  const [loading, setLoading] = useState(true);
  const [editPrompt, setEditPrompt] = useState("");
  const [isNewDataVisible, setIsNewDataVisible] = useState(true);
  const [prevData, setPrevData] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const handleBackClick = () => {
    navigate("/"); // Navigate to GetInputScreen
  };

  const fetchData = async (promptMsg) => {
    try {
      setLoading(true);
      const apiKey = GEMINI_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const data = {
        contents: [
          {
            parts: [{ text: promptMsg }],
          },
        ],
      };

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      const generatedEssay =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No content generated.";
      setPrevData(generatedData); // Save the current data before updating
      setGeneratedData(generatedEssay);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setGeneratedData("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (topic) {
      fetchData(`Create an essay about the topic: ${topic}`);
    }
  }, [topic]);

  const handleEdit = () => {
    if (!editPrompt.trim()) return; // Prevent empty edits
    setIsEditMode(true);
    setIsNewDataVisible(true);
    setTopic(topic + " (New version)");
    fetchData(`${generatedData}\n\n${editPrompt}`);
    setEditPrompt("");
  };

  const handleSwap = () => {

    // Toggle visibility
    if (isNewDataVisible) {

      setTemp(generatedData); // Store the current generated text in temp
      setGeneratedData(prevData);

      setTopic(topic + "(Old version)");

    } else {
      setTopic(topic + "(New version)");

      setGeneratedData(temp)

    }
    setIsNewDataVisible(!isNewDataVisible);
  };

  const handleDiscard = () => {
    setIsEditMode(false)
    setGeneratedData(prevData)
    setTopic(topic)
  }

  const handleSave = () => {
    setIsEditMode(false)
    setTopic(topic)
  }


  const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFont('helvetica');

    const paragraphText = generatedData

    const maxWidth = 180;
    const marginLeft = 10;
    const lineHeight = 10;
    const x = marginLeft;
    const y = 10;

    const lines = doc.splitTextToSize(paragraphText, maxWidth);

    let currentY = y;
    for (let i = 0; i < lines.length; i++) {
      if (i === lines.length - 1) {
        doc.text(lines[i], x, currentY);
      } else {
        doc.text(lines[i], x, currentY, { align: 'justify' });
      }
      currentY += lineHeight;
    }

    doc.save(`${topic}.pdf`);
  };


  return (
    <div className="container">
      <div className="header">
        <div
          className="menu"
          onClick={handleBackClick}
          style={{ cursor: "pointer" }}
        >
          <ArrowBackIcon style={{ fontSize: "30px", color: 'gray' }} />
        </div>
        <h3>Writezy</h3>
        <div className="menu" onClick={isEditMode ? handleSwap : null}>
          {isEditMode ? (
            <SwapHorizRoundedIcon style={{ fontSize: "30px", color: 'gray' }} />
          ) : (
            <DownloadSharpIcon onClick={generatePDF} style={{ fontSize: "30px", color: 'gray' }} />
          )}
        </div>
      </div>
      <div className="output">
        <h3 style={{ fontSize: "20px", color: "gray" }}>{Topic}</h3>
        {!loading ? (
          <p>{generatedData}</p>
        ) : (
          <div>
            <Lottie
              animationData={Animation_Data}
              loop={true}
              style={{
                width: "100%",
                maxWidth: 500,
                height: 300,
                marginTop: 10,
              }}
            />
          </div>
        )}
      </div>
      <div>
        {
          !isEditMode ? <div className="txtInputContainer">
            <input
              placeholder="Edit with AI"
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
            />
            <div className="FabWrapper">
              <Fab
                className="fabContainer"
                size="small"
                onClick={handleEdit}
                disabled={!editPrompt.trim()}
              >
                <AutoFixHighIcon style={{ color: "white" }} />
              </Fab>
            </div>
          </div> :
            <div className="buttonContainer">
              <div
                className="gradientButton gradientButtonDiscard"
                onClick={handleDiscard}
              >
                Discard
              </div>
              <div
                className="gradientButton gradientButtonSave"
                onClick={handleSave}
              >
                Save
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default DisplayOutputScreen;
