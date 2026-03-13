import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOODS = [
    { label: 'fire', emoji: '🔥', tooltip: 'On Fire!' },
    { label: 'happy', emoji: '😊', tooltip: 'Great' },
    { label: 'neutral', emoji: '😐', tooltip: 'Okay' },
    { label: 'hard', emoji: '😓', tooltip: 'Difficult' },
    { label: 'sick', emoji: '🤢', tooltip: 'Sick/Tired' }
];

const ReflectionModal = ({ isOpen, onClose, onSave, habitTitle }) => {
    const [note, setNote] = useState('');
    const [selectedMood, setSelectedMood] = useState('fire');

    const handleSave = () => {
        onSave({ note, mood: selectedMood });
        setNote('');
        setSelectedMood('fire');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-6 space-y-6">
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-white mb-2">Reflect on "{habitTitle}"</h2>
                            <p className="text-gray-400 text-sm">How did it go today?</p>
                        </div>
                        
                        {/* Mood Selector */}
                        <div className="flex justify-between px-2">
                            {MOODS.map((m) => (
                                <button
                                    key={m.label}
                                    onClick={() => setSelectedMood(m.label)}
                                    className={`text-2xl p-3 rounded-full transition-all transform hover:scale-110 ${selectedMood === m.label ? 'bg-white/10 scale-110 ring-2 ring-green-500' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}`}
                                    title={m.tooltip}
                                >
                                    {m.emoji}
                                </button>
                            ))}
                        </div>

                        {/* Note Input */}
                        <div>
                            <textarea 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Add a quick note... (optional)"
                                className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-green-500/50 min-h-[80px] resize-none"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button 
                                onClick={onClose}
                                className="flex-1 py-3 text-gray-400 hover:text-white font-medium transition active:scale-95"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                className="flex-1 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Check size={18} /> Log
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ReflectionModal;