import React, { useState, useMemo } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './chatbot.css';
import logo from '../assets/img/chat-bot.png';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, Helvetica, sans-serif',
  headerBgColor: '#00bfff',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#00bfff',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = useMemo(() => [
    { id: '1', message: 'Hi there! How can I help you today?', trigger: 'user-input' },
    { id: 'user-input', user: true, trigger: 'response-handler' },
    { id: 'response-handler', message: 'Thank you for sharing. Here are some options for you:', trigger: 'options' },
    { id: 'options', options: [
        { value: 'stress', label: 'I am feeling stressed', trigger: 'stress' },
        { value: 'anxiety', label: 'I am feeling anxious', trigger: 'anxiety' },
        { value: 'depressed', label: 'I am feeling depressed', trigger: 'depressed' },
      ],
    },
    { id: 'stress', message: 'It sounds like you are going through a tough time. Consider taking some deep breaths, going for a walk, or talking to a friend. Would you like more resources?', trigger: 'more-resources' },
    { id: 'anxiety', message: 'Anxiety can be really challenging. Try practicing mindfulness or doing something you enjoy. Would you like more resources?', trigger: 'more-resources' },
    { id: 'depressed', message: 'I’m sorry to hear that you’re feeling depressed. It might help to talk to a professional or find a supportive community. Would you like more resources?', trigger: 'more-resources' },
    { id: 'more-resources', options: [
        { value: 'yes', label: 'Yes', trigger: 'resources' },
        { value: 'no', label: 'No', trigger: 'end-message' },
      ],
    },
    { id: 'resources', message: 'Here are some resources you might find helpful: [List of resources].', end: true },
    { id: 'end-message', message: 'I hope this chat was helpful. Take care!', end: true },
  ], []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="chatbot-container">
        <button className="chatbot-toggle-button" onClick={toggleChatbot}>
          <img src={logo} alt="Chat Icon" className="chat-icon" />
        </button>
        {isOpen && (
          <div className="chatbot">
            <ChatBot steps={steps} />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Chatbot;
