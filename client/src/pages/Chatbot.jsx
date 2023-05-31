import React, { useState, useRef, useEffect } from 'react';
import "../styles/chatbot.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ChatbotPage = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const chatboxRef = useRef(null);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInput.trim() !== '') {
      const userMessage = { user: userInput };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput('');

      const apiUrl = 'http://localhost:5000/api/chat/chatbot';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = { bot: data };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        console.error('Failed to fetch bot response');
      }
    }
  };

  useEffect(() => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
    <Navbar/>
    <div className="chatbot-container">
      <h1 className="chatbot-title">Chatbot</h1>
      <p className="chatbot-subtitle">Welcome to the Mental Health Consultation Chatbot</p>
      <div className="chatbox" ref={chatboxRef}>
        {messages.map((message, index) => (
          <div className="message-area" key={index}>
            {message.user && <p className="user-message"> {message.user}</p>}
            {message.bot && <p className="bot-message">{message.bot}</p>}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleUserInput}
          />
          <button type="submit" className="send-button">Send</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default ChatbotPage;
