'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const ChatAiAgent = () => {
    const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I’m Mobarrez AI, ready to assist you. How can I help today?', sender: 'ai' },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (input.trim()) {
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: input, sender: 'user' },
            { id: Date.now() + 1, text: 'This is a placeholder AI response. Ask me anything!', sender: 'ai' },
        ]);
        setInput('');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-background text-foreground">
        <div className="w-full max-w-2xl flex flex-col h-[90vh] mt-24 md:mt-6">
            <h1 className="text-4xl font-bold text-foreground mb-6 shine text-center">
            Chat with Mobarrez AI
            </h1>
            <div className="flex-1 overflow-y-auto bg-foreground/10 p-4 rounded-lg shadow-inner">
            {messages.map((message) => (
                <div
                key={message.id}
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                <div
                    className={`inline-block p-2 rounded-lg ${
                    message.sender === 'user'
                        ? 'bg-accent text-background'
                        : 'bg-gray-700 text-foreground'
                    }`}
                >
                    {message.text}
                </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 flex space-x-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-foreground focus:border-accent focus:outline-none"
                placeholder="Type your message..."
            />
            <button
                onClick={handleSend}
                className="rounded-lg bg-accent px-4 py-2 text-background hover:bg-opacity-80 transition"
            >
                Send
            </button>
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
            Need to log in?{' '}
            <Link href="/login" className="text-accent hover:underline">
                Go to Login
            </Link>
            </p>
        </div>
        </div>
    )
};

export default ChatAiAgent;