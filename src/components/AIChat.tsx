import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const knowledgeBase = {
  name: portfolioData.name,
  title: portfolioData.title,
  skills: portfolioData.skills.map((s) => s.name).join(', '),
  projects: portfolioData.projects.map((p) => `${p.title}: ${p.description}`).join('\n'),
  experience: portfolioData.experiences.map((e) => `${e.title} at ${e.company}`).join(', '),
  education: portfolioData.education.map((e) => `${e.degree} from ${e.institution}`).join(', '),
  email: portfolioData.email,
  location: portfolioData.location,
  availability: portfolioData.availability,
};

function generateResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes('skill') || lower.includes('tech') || lower.includes('language')) {
    return `Anshu is proficient in: ${knowledgeBase.skills}. She has strong expertise in Python, Java, React, and AI/ML technologies.`;
  }
  if (lower.includes('project')) {
    return `Here are some of Anshu's notable projects:\n${knowledgeBase.projects}\n\nWould you like to know more about any specific project?`;
  }
  if (lower.includes('experience') || lower.includes('work') || lower.includes('intern')) {
    return `Anshu has worked at: ${knowledgeBase.experience}. She also contributes to open source at her university.`;
  }
  if (lower.includes('education') || lower.includes('study') || lower.includes('college')) {
    return `Anshu is pursuing ${knowledgeBase.education}. She maintains an excellent academic record and is active in research.`;
  }
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
    return `You can reach Anshu at ${knowledgeBase.email}. She is currently ${knowledgeBase.availability.toLowerCase()}.`;
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hello! I'm Anshu's AI assistant. I can answer questions about her skills, projects, experience, education, and how to contact her. What would you like to know?`;
  }
  if (lower.includes('hire') || lower.includes('job') || lower.includes('opportunity')) {
    return `Anshu is currently ${knowledgeBase.availability.toLowerCase()}. She would be excited to discuss new opportunities! You can contact her at ${knowledgeBase.email}.`;
  }

  return `I can help you learn more about Anshu's skills, projects, work experience, education, or how to contact her. What specifically would you like to know?`;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I'm Anshu's AI assistant. Ask me anything about her skills, projects, experience, or how to get in touch!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-dark-50 shadow-lg shadow-neon-blue/30 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-dark-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Sheader */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                <Bot size={20} className="text-dark-50" />
              </div>
              <div>
                <h3 className="text-dark-50 font-semibold text-sm">AI Assistant</h3>
                <p className="text-dark-400 text-xs">Ask me about Anshu</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'assistant'
                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple'
                        : 'bg-dark-700'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <Bot size={14} className="text-dark-50" />
                    ) : (
                      <User size={14} className="text-dark-50" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      message.role === 'assistant'
                        ? 'bg-dark-800 text-dark-200'
                        : 'bg-neon-blue/20 text-dark-50'
                    }`}
                  >
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-1' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                    <Bot size={14} className="text-dark-50" />
                  </div>
                  <div className="bg-dark-800 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-dark-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects, experience..."
                  className="flex-1 bg-dark-800 border border-white/10 rounded-xl px-4 py-2 text-sm text-dark-50 placeholder-dark-500 focus:outline-none focus:border-neon-blue/50"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-dark-50 flex items-center justify-center disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
