import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryPanel from './HistoryPanel';
import ChatPanel from './ChatPanel';
import PageTitle from '../../components/layout/PageTitle'
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import {  Plus } from "lucide-react";



const breadcrumbItems = [
  { name: 'AI Agnet', path: '/aiagent' },
  { name: 'New AI Agent', path: '/mainagent' },
]

// Initial history data
const initialHistory = [
    {
        id: 1,
        userQuestion: "What is a Design Subscription Agency?",
        agentResponse: "A Design Subscription Agency offers design services on a recurring subscription basis, typically monthly, rather than a project-by-project fee structure",
        topic: "Off_topic",
        instructions: "This is instructions column",
        action: "This is action column",
      },
      {
        id: 2,
        userQuestion: "What is state in React?",
        agentResponse: "In React, state is a JavaScript object that holds data specific to a component which can change over time. When the state changes, the component re-renders.",
        topic: "React JS",
        instructions: "This is instructions column",
        action: "This is action column",
      }
      
];

function MainAgent() {
  const [historyItems, setHistoryItems] = useState(initialHistory);
  const navigate = useNavigate();

  const addHistoryEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now(), // Unique ID
      topic: entry.topic || "Processing...",
      instructions: entry.instructions || "N/A",
      action: entry.action || "N/A",
    };
    setHistoryItems(prevItems => [newEntry, ...prevItems]);
  };

  const onAction = () => {
    navigate('/aiagent'); 
  };

  return (
    <div className='max-w-[1140px]'>
    
    <PageTitle 
        title="AI Agents" 
        actionText="All AI Agnets" 
        ActionIcon={Plus} 
        onAction={onAction} 
      />
      <div><Breadcrumbs items={breadcrumbItems} /></div>
    <div className="flex flex-col mt-2">
      
      {/* Main Container */}
      <div className="flex h-[83vh]  border-[#c6c6c6] border-1">
        {/* Left Panel: History Panel */}
        <div className="w-[644px] border-r border-gray-300 overflow-y-auto bg-white">
  {/* Sticky Topbar */}
  <div className="sticky top-0 z-10 flex justify-between items-center p-[26px] border-b border-gray-200 bg-[#F0F1FA]">
    {/* Topbar content here */}
  </div>

  {/* Scrollable History List */}
  <HistoryPanel historyItems={historyItems} />
</div>


        {/* Right Panel: ChatPanel */}
        <div className="w-[70%] flex flex-col">
          {/* Pass addHistoryEntry function to ChatPanel */}
          <ChatPanel addHistoryEntry={addHistoryEntry} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default MainAgent;
