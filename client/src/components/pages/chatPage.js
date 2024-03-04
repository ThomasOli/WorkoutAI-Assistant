
import React from "react";
import "./chatPage.css";
import Button from "@mui/material/Button";
import logo from "../images/raisethebarLogo.png";
import exit from "../images/exitButtonSymbol.png";
import send from "../images/sendMessage.png";
import clear from "../images/deleteTextContents.png";
import { useState } from "react";


/*import { TextField } from '@mui/material';*/


export const ChatPage = () => {

  /* functions can go here and they can be called in html element based classname/id, refer to chatGPT*/

  // initially set user input content to an empty string
  const [userTextInput, setUserTextInput] = useState("");
  // create another useState for the send request to GPT-4 API
  const [textFromGPT, setTextFromGPT] = useState("");

  // update text box contents as user enters or removes text
  function updateInputField(e) {
    setUserTextInput(e.target.value);
  }

  // only hold the contents of the text box if the textbox is not empty after pressing the enter button
  function ifEnterButtonPressed() {
    if (userTextInput.trim() !== "") {
      sendText();
    }
  }

  function ifClearButtonPressed() {
    // set underlying text input to the empty string
    setUserTextInput("");
  }

  // only hold the contents of the text box if the textbox is not empty after pressing enter
  function ifEnterKeyPressed(e) {
    if (e.key === "Enter" && userTextInput.trim() !== "") {
      sendText();
    }
  }

  // user input is stored in userTextInput variable

  // function to receive response by API
  function sendText() {
    textFromGPT = await fetch(/*link, {method: , headers: , body: ,}*/);
    

    // reset the underlying contents of the text box
    setUserTextInput("");
  }

  

  return (
    <>
      <div className="chat-page-layout-design">
        <div className="sidebar">
          <div className="user-profile-image">Profile Picture</div>
          <div className="user-name">
            FirstName LastName
          </div>
          <Button className="home-button">Home</Button>
          <Button className="plan-workout-button">Plan a Workout</Button>
          <Button className="view-progress-button">View Progress</Button>
          <Button className="exit-button"><img className="exit-button-icon" src={exit}></img></Button>
        </div>
        <svg
          class="chat-section"
          width="1199"
          height="924"
          viewBox="0 0 1199 924"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1H1198V923H1V1Z"
            fill="#C6C6C6"
            stroke="black"
            stroke-width="2"
          />
        </svg>
        <div className="identification-of-ai-section"></div>
        <img className="raise-the-bar-chat-icon" src={logo}></img>
        <div className="chat-page-title">CHAT</div>
        <div className="chat-message-board"></div>
        <Button className="enter-button" onClick={ifEnterButtonPressed}>
          <img className="enter-button-icon" src={send}></img>
        </Button>
        <Button className="clear-button" onClick={ifClearButtonPressed}>
          <img className="clear-button-icon" src={clear}></img>
        </Button>
        <div className="raise-the-bar-chat-icon-text">Raise the Bar</div>
        <input className="text-box" 
          type="text" 
          placeholder="Begin your fitness journey..." 
          value={userTextInput} 
          onKeyDown={ifEnterKeyPressed} 
          onChange={updateInputField}></input>
      </div>
    </>
  );

  
    /*<div>chatPage</div>*/


export default ChatPage