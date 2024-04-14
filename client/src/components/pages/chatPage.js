import React, { useState } from "react";
import Button from "@mui/material/Button";
import logo from "../images/raisethebarLogo.png";
import exit from "../images/exitButtonSymbol.png";
import send from "../images/sendMessage.png";
import clear from "../images/deleteTextContents.png";
import "./chatPage.css";

export const ChatPage = () => {
  // State for user input and API response
  const [userTextInput, setUserTextInput] = useState("");
  const [textFromGPT, setTextFromGPT] = useState("");

  // Update text box contents as user types
  const updateInputField = (e) => {
    setUserTextInput(e.target.value);
  };

  // Send text to API if Enter is pressed and input is not empty
  const ifEnterKeyPressed = (e) => {
    if (e.key === "Enter" && userTextInput.trim() !== "") {
      sendText();
    }
  };

  // Clear text input
  const ifClearButtonPressed = () => {
    setUserTextInput("");
  };

  // Send user input to the API and fetch response
  const sendText = async () => {
    try {
      const response = await fetch(/*link, {method: , headers: , body: ,}*/);
      const data = await response.json();
      setTextFromGPT(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <>
      <div className="chat-page-layout-design">
        <div className="sidebar">
          <div className="user-profile-image">Profile Picture</div>
          <div className="user-name">FirstName LastName</div>
          <Button className="home-button">Home</Button>
          <Button className="plan-workout-button">Plan a Workout</Button>
          <Button className="view-progress-button">View Progress</Button>
          <Button className="exit-button">
            <img src={exit} className="exit-button-icon" alt="Exit"></img>
          </Button>
        </div>
        <svg className="chat-section" width="1199" height="924" viewBox="0 0 1199 924" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H1198V923H1V1Z" fill="#C6C6C6" stroke="black" strokeWidth="2" />
        </svg>
        <div className="identification-of-ai-section"></div>
        <img src={logo} className="raise-the-bar-chat-icon" alt="Raise the Bar Logo"></img>
        <div className="chat-page-title">CHAT</div>
        <div className="chat-message-board"></div>
        <Button className="enter-button" onClick={ifEnterKeyPressed}>
          <img src={send} className="enter-button-icon" alt="Send Message"></img>
        </Button>
        <Button className="clear-button" onClick={ifClearButtonPressed}>
          <img src={clear} className="clear-button-icon" alt="Clear Text"></img>
        </Button>
        <div className="raise-the-bar-chat-icon-text">Raise the Bar</div>
        <input className="text-box" type="text" placeholder="Begin your fitness journey..." value={userTextInput} onKeyDown={ifEnterKeyPressed} onChange={updateInputField}></input>
      </div>
    </>
  );
};

export default ChatPage;