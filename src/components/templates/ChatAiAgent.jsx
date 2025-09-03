'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const ChatAiAgent = ({ session }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm Mobarrez AI, ready to assist you. How can I help today?", sender: 'ai' },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [chatSessions, setChatSessions] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages are added
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Load user's chat sessions on component mount
    useEffect(() => {
        if (session?.user?.id) {
            loadChatSessions();
        }
    }, [session]);

    const loadChatSessions = async () => {
        try {
            const response = await fetch('/api/chat');
            const data = await response.json();
            
            if (data.success) {
                setChatSessions(data.sessions || []);
            }
        } catch (error) {
            console.error('Error loading chat sessions:', error);
        }
    };

    const loadChatHistory = async (sessionId) => {
        if (!sessionId) return;
        
        setLoadingHistory(true);
        setError('');
        
        try {
            const response = await fetch(`/api/chat?sessionId=${sessionId}`);
            const data = await response.json();
            
            if (data.success) {
                const formattedMessages = data.messages.map(msg => ({
                    id: msg._id,
                    text: msg.message,
                    sender: msg.sender,
                    timestamp: new Date(msg.timestamp),
                    intent: msg.intent,
                    metadata: msg.metadata
                }));
                
                setMessages(formattedMessages.length > 0 ? formattedMessages : [
                    { id: 1, text: "Hello! I'm Mobarrez AI, ready to assist you. How can I help today?", sender: 'ai' }
                ]);
                setCurrentSessionId(sessionId);
                setShowSidebar(false); // Hide sidebar on mobile after selection
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
            setError('Failed to load chat history');
        } finally {
            setLoadingHistory(false);
        }
    };

    const startNewChat = () => {
        setMessages([
            { id: 1, text: "Hello! I'm Mobarrez AI, ready to assist you. How can I help today?", sender: 'ai' }
        ]);
        setCurrentSessionId(null);
        setError('');
        setShowSidebar(false); // Hide sidebar on mobile after action
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        // Check if user is authenticated
        if (!session?.user?.id) {
            setError('Please log in to use the chat feature');
            return;
        }

        const userMessage = {
            id: Date.now(),
            text: input.trim(),
            sender: 'user',
            timestamp: new Date()
        };

        // Add user message to UI immediately
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.text,
                    sessionId: currentSessionId,
                    createNewSession: !currentSessionId
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Update sessionId if this was a new session
                if (!currentSessionId && data.sessionId) {
                    setCurrentSessionId(data.sessionId);
                    // Reload sessions to show the new one
                    loadChatSessions();
                }

                // Add AI response to messages
                const aiMessage = {
                    id: data.messageId || Date.now() + 1,
                    text: data.response,
                    sender: 'ai',
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, aiMessage]);
            } else {
                throw new Error(data.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please try again.');
            
            // Add error message to chat
            const errorMessage = {
                id: Date.now() + 2,
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'ai',
                timestamp: new Date(),
                isError: true
            };
            
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(timestamp);
    };

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar Toggle Button (Mobile) */}
            <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden fixed top-4 left-4 z-50 bg-accent text-background p-2 rounded-lg shadow-lg"
            >
                {showSidebar ? '✕' : '☰'}
            </button>

            {/* Sidebar - Chat Sessions */}
            <div className={`fixed md:relative w-64 bg-foreground/5 border-r border-gray-600 flex flex-col transition-transform duration-300 z-40 ${
                showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            } h-screen`}>
                <div className="p-4 border-b border-gray-600">
                    <button
                        onClick={startNewChat}
                        className="w-full bg-accent hover:bg-opacity-80 text-background px-4 py-2 rounded-lg transition"
                    >
                        + New Chat
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Recent Chats</h3>
                    {session?.user?.id ? (
                        chatSessions.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No chat history yet</p>
                        ) : (
                            <div className="space-y-2">
                                {chatSessions.map((chatSession) => (
                                    <button
                                        key={chatSession._id}
                                        onClick={() => loadChatHistory(chatSession._id)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors border ${
                                            currentSessionId === chatSession._id
                                                ? 'bg-accent text-background border-accent'
                                                : 'bg-foreground/10 hover:bg-foreground/20 border-gray-600'
                                        }`}
                                    >
                                        <div className="truncate text-sm font-medium">
                                            {chatSession.title}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {new Date(chatSession.updatedAt).toLocaleDateString()}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            <Link href="/auth/login" className="text-accent hover:underline">
                                Login to save chats
                            </Link>
                        </p>
                    )}
                </div>
            </div>

            {/* Overlay for mobile sidebar */}
            {showSidebar && (
                <div 
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col items-center justify-start">
                <div className="w-full max-w-2xl flex flex-col h-[90vh] mt-24 md:mt-6 px-4">
                    <h1 className="text-4xl font-bold text-foreground mb-6 shine text-center">
                        Chat with Mobarrez AI
                    </h1>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto bg-foreground/10 p-4 rounded-lg shadow-inner">
                        {loadingHistory && (
                            <div className="text-center text-muted-foreground mb-4">
                                Loading chat history...
                            </div>
                        )}
                        
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                            >
                                <div
                                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                                        message.sender === 'user'
                                            ? 'bg-accent text-background'
                                            : message.isError
                                            ? 'bg-red-500/20 text-red-400 border border-red-500'
                                            : 'bg-gray-700 text-foreground'
                                    }`}
                                >
                                    <div className="whitespace-pre-wrap">{message.text}</div>
                                    {message.timestamp && (
                                        <div className="text-xs opacity-70 mt-1">
                                            {formatTime(message.timestamp)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="mb-4 text-left">
                                <div className="inline-block p-3 rounded-lg bg-gray-700 text-foreground">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="mt-4 flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-1 rounded-lg border border-gray-600 bg-transparent px-4 py-2 text-foreground focus:border-accent focus:outline-none"
                            placeholder="Type your message..."
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="rounded-lg bg-accent px-4 py-2 text-background hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Send'
                            )}
                        </button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                        {session?.user?.id ? (
                            <>Welcome back, {session.user.name}! Your chats are being saved.</>
                        ) : (
                            <>Need to log in?{' '}
                            <Link href="/auth/login" className="text-accent hover:underline">
                                Go to Login
                            </Link></>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatAiAgent;