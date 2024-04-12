import React from "react";
import "./chatPage.css";
import Button from "@mui/material/Button";
import logo from "../images/raisethebarLogo.png";
import exit from "../images/exitButtonSymbol.png";
import send from "../images/sendMessage.png";
import clear from "../images/deleteTextContents.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { API_KEY } from "../config2.js";
// require('dotenv').config({ path: "./config.env" });
// const apiKey = process.env.API_KEY;
import axios from "axios";

// /*import { TextField } from '@mui/material';*/

export const ChatPage = () => {

  /* functions can go here and they can be called in html element based classname/id, refer to chatGPT*/
  let recommended = false;
  // initially set user input content to an empty string
  const [userTextInput, setUserTextInput] = useState("");
  // create another useState for the send request to GPT-4 API
  // const [textFromGPT, setTextFromGPT] = useState("");
  // useState for modifying user messages and bot responses
  const [msgs, setMsg] = useState([]);
  const [gpt, setGpt] = useState("")
  const [parse, setParse] = useState("")
  // update text box contents as user enters or removes text
  function updateInputField(e) {
    setUserTextInput(e.target.value);
  }

  const handleInputChange = (e) => {
    setUserTextInput(e.target.value);
  };


  const parseBotMessage = (text) => {
    const exercises = [];

    // Split the text by newline characters to separate each line
    const lines = text.split('\n');
  
    // Initialize variables to store workout name and exercise details
    let workoutName = "";
    let exerciseName = "";
    let sets = "";
    let reps = "";
    let rest = "";
    let additional = "";
    // Loop through each line
    lines.forEach((line) => {
      // Match workout name
      if (line.startsWith("Workout Name: ")) {
        workoutName = line.substring("Workout Name: ".length).trim();
      } 
      // Match exercise details
      else if (/^\d+\.\s/.test(line)) {
        // Push the previous exercise details to the exercises array
        if (exerciseName !== "") {
          exercises.push({ name: exerciseName, sets, reps, rest, additional });
        }
        // Extract exercise name
        const match = line.match(/^\d+\.\s(.+)/);
        if (match) {
          exerciseName = match[1].trim();
        }
      } 
      // Match sets
      else if (line.includes("- Sets:")) {
        sets = line.split(":")[1].trim();
      } 
      // Match reps
      else if (line.includes("- Reps:")) {
        reps = line.split(":")[1].trim();
      }
      else if (line.includes("- Rest:")) {
        rest = line.split(":")[1].trim();
      }
      else if (line.includes("Additional Info:")){
        additional = line.split(":")[1].trim();
      }
    });
  
    // Push the last exercise details to the exercises array
    if (exerciseName !== "") {
      exercises.push({ name: exerciseName, sets, reps,rest, additional });
    }
  
  return { workoutName, exercises };
};


const handleSubmit = async (userID, botResponse) => {
  try {
    const response = await axios.post("http://localhost:5000/record/add", { ...botResponse, userID });
    console.log(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert('Your AI assistant is having some trouble communicating right now.');
    } else {
      console.error("Error adding workout:", error);
      alert('Error connecting. Please try again later.');
    }
  }
}

  // only hold the contents of the text box if the textbox is not empty after pressing the enter button
  function ifEnterButtonPressed() {
    if (userTextInput.trim() !== "") {
      sendText();
      if(gpt.includes("1.")){

      }
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

  // automatically scroll down to the most recent messages in the chat message board
  function autoScrollDown() {
    let messagesBoard = document.querySelector(".chat-message-board");
    messagesBoard.current.scrollTop = messagesBoard.current.scrollHeight;
  }

  // attempt 2: automatically scroll down to most recent messages
  const chatMsgsRef = useRef(null);
  useEffect(() => {
    if (chatMsgsRef.current) {
      chatMsgsRef.current.scrollTop = chatMsgsRef.current.scrollHeight;
    }
  }, [msgs])

  // user input is stored in userTextInput variable
  // function to receive response by API
  const sendText = async () => {
    // fill in missing parameters
    // display user input for testing purposes
    console.log("You said: ", userTextInput);
    // obtain api key from environment
    // console.log(apiKey);
    // console.log(API_KEY);

    const generateAssistantResponse = (userInput) => {
      if (userInput.includes("recommend")) {
        recommended = true;
        return "Sure! I can recommend some workout routines for you with reps, intensity, and rest time.";
      } else if (userInput.includes("workout") ||userInput.includes("generate")||userInput.includes("routine")) {
        recommended = true;
        return "Of course! Let me create a custom workout routine for you with reps, intensity, and rest time.";
      } else {
        return "I'm sorry, I didn't understand your request. Can you please be more specific?";
      }
    };
    const textFromGPT = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization" : "Bearer " + API_KEY,
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: userTextInput
          },
          {
            role: "assistant",
            content: generateAssistantResponse(userTextInput)
          }
        ]
      }),
    });
    
    
    

    let GPTResponseData = await textFromGPT.json();
    // console.log(GPTResponseData);
    // let GPTResponse = GPTResponseData.choices[0].text;
    let GPTResponse = GPTResponseData.choices[0].message.content;
    if(recommended){
      setGpt(GPTResponse)
    }
    
    // display bot response to the console for testing purposes
    console.log("ChatGPT said: ", GPTResponse);
    setMsg([
      ...msgs, 
      {text: userTextInput, sender: "User"}, 
      {text: GPTResponse, sender: "ChatGPT"}
    ]);
    // test output of msgs array
    console.log(msgs[0]);  
    console.log(msgs[1]);
    // console.log(setMsg[0]);
    // console.log(setMsg[1]); 
    // reset the underlying contents of the text box
    setUserTextInput("");
    const parseResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization" : "Bearer " + API_KEY,
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: gpt
          },
          {
            role: "assistant",
            content: `Sure I can parse the following workout routine paragraph into a structured format for database storage. This structure is exact: and always begins with Workout name, followed by the exercise, labeled with a number and dot, then the exercise name, followed each with fields like name, sets, reps, rest, and additional info. It should be in exactly the following structure 
            Workout Name: "Workout Name"
            1. "Exercise Name"
            - Sets: "data"
            - Reps: "data"
            - Rest: "data"
            - Additional Info: "data"
            
            2. "Exercise Name"
            - Sets: "data"
            - Reps: "data"
            - Rest: "data" 
            - Additional Info: "data"`
          }
        ]
      }),
    });
    if(recommended){
      let parsedData = await parseResponse.json();
      setParse(parsedData.choices[0].message.content);
      handleSubmit("123", parseBotMessage(parse))
      console.log(parseBotMessage(parse))
      recommended = false;

    }
   
  }
  


  
  

  /* create functions for placing user and bot messages in chat bubbles
     in the chat box. (Partially Complete) */



  return (
    <>
      <div className="chat-page-layout-design">
        <div className="sidebar">
          <div className="user-profile-image">Profile Picture {/* get profile picture from database */}</div>
          <div className="user-name">
            FirstName LastName {/* get username from database */}
          </div>
          <button className="home-button" 
            component={Link} to='/home/:id'>
              HOME
          </button>
          
          <button className="plan-workout-button">PLAN A WORKOUT {/* redirect to workout planning page */}</button>
          <button className="view-progress-button" 
            component={Link} to="/progress/:id">
              VIEW PROGRESS
          </button>
          
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
            strokeWidth="2"
          />
        </svg>
        <div className="identification-of-ai-section"></div>
        <img className="raise-the-bar-chat-icon" alt="Chat Icon" src={logo}></img>
        <div className="chat-page-title">CHAT</div>
        <div className="chat-message-board">
          <div ref={chatMsgsRef} className="chat-messages-section">
            {/* {msgs.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))} */}
            <div className="messenger-icon"></div>
            {msgs.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
        <button className="enter-button" onClick={ifEnterButtonPressed}>
          <img className="enter-button-icon" alt="Enter" src={send}></img>
        </button>
        <button className="clear-button" onClick={ifClearButtonPressed}>
          <img className="clear-button-icon" alt="Clear" src={clear}></img>
        </button>
        <div className="raise-the-bar-chat-icon-text">Raise the Bar</div>
        <input className="text-box" 
          type="text" 
          placeholder="Begin your fitness journey..." 
          value={userTextInput} 
          onKeyDown={ifEnterKeyPressed} 
          onChange={updateInputField}/>
      </div>
    </>
  );
};

  
//     /*<div>chatPage</div>*/

export default ChatPage;