import React, { useState } from 'react';
import './FAQ.css';

const FAQItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
   
    <div className='faq-item'>
      <div className={`question ${isExpanded ? 'expanded' : ''}`} onClick={toggleAccordion}>
        <div style={{display:'flex',flexDirection:'row'}}>
        <span>{question}</span>
        <div className='arrow' style={{marginLeft:'auto'}}></div>
        </div>
      </div>
      {isExpanded && <div className='answer'>{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: 'What is your return policy?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
    },
    {
      question: 'How can I track my order?',
      answer: 'Sed euismod libero sit amet mauris egestas, ac vehicula nunc tincidunt.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Sed euismod libero sit amet mauris egestas, ac vehicula nunc tincidunt.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Sed euismod libero sit amet mauris egestas, ac vehicula nunc tincidunt.',
    },
    // Add more FAQs as needed
  ];

  return (
    
    <div className='new'>
    <div className='faq-container'>
      <h2>Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
    </div>
 
  );
};

export default FAQ;
