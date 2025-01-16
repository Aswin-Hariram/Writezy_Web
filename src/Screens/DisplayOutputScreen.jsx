import React, { useEffect, useState } from "react";
import "./DisplayOutputScreen.css";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import { Fab } from "@mui/material";
import { GEMINI_KEY } from "../Config/SecureKeys";
import axios from "axios";
import Lottie from "lottie-react";
import Animation_Data from "../assets/Animations/AiLoading.json";

function DisplayOutputScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic } = location.state;

  const [Topic, setTopic] = useState(topic);
  const [generatedData, setGeneratedData] = useState("");
  const [loading, setLoading] = useState(true);
  const [editPrompt, setEditPrompt] = useState("");
  const [isNewDataVisible, setIsNewDataVisible] = useState(false);
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
    setIsNewDataVisible(!isNewDataVisible); // Toggle visibility
    if (isNewDataVisible) {
      setTopic(topic.replace(" (New version)", " (Old version)"));
      setGeneratedData(prevData); // Restore old data
    } else {
      setTopic(topic.replace(" (Old version)", " (New version)"));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div
          className="menu"
          onClick={handleBackClick}
          style={{ cursor: "pointer" }}
        >
          <ArrowBackIcon style={{ fontSize: "30px" }} />
        </div>
        <h3>Writezy</h3>
        <div className="menu" onClick={isEditMode ? handleSwap : null}>
          {isEditMode ? (
            <SwapHorizRoundedIcon style={{ fontSize: "30px" }} />
          ) : (
            <IosShareRoundedIcon style={{ fontSize: "30px" }} />
          )}
        </div>
      </div>
      <div className="output">
        <h5 style={{ fontSize: "20px", color: "gray" }}>{Topic}</h5>
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
        <div className="txtInputContainer">
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
        </div>
      </div>
    </div>
  );
}

export default DisplayOutputScreen;
