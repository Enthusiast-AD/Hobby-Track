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
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002a20]/20 dark:bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#fff8e1] dark:bg-neutral-900 border border-[#002a20]/10 dark:border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-[#002a20]/40 dark:text-neutral-500 hover:text-[#002a20] dark:hover:text-neutral-300 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-6 space-y-6">
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-[#002a20] dark:text-gray-100 mb-2">Reflect on "{habitTitle}"</h2>
                            <p className="text-[#002a20]/60 dark:text-gray-400 text-sm">How did it go today?</p>
                        </div>
                        
                        {/* Mood Selector */}
                        <div className="flex justify-between px-2">
                            {MOODS.map((m) => (
                                <button
                                    key={m.label}
                                    onClick={() => setSelectedMood(m.label)}
                                    className={`text-2xl p-3 rounded-full transition-all transform hover:scale-110 ${selectedMood === m.label ? 'bg-[#002a20]/10 dark:bg-white/10 scale-110 ring-2 ring-[#002a20] dark:ring-white/20' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}`}
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
                                className="w-full bg-white dark:bg-neutral-800 border border-[#002a20]/10 dark:border-white/10 rounded-xl p-3 text-[#002a20] dark:text-gray-200 text-sm focus:outline-none focus:border-[#002a20]/50 dark:focus:border-green-500/50 min-h-[80px] resize-none placeholder-[#002a20]/40 dark:placeholder-gray-500"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button 
                                onClick={onClose}
                                className="flex-1 py-3 text-[#002a20]/60 dark:text-gray-400 hover:text-[#002a20] dark:hover:text-gray-200 font-medium transition active:scale-95"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                className="flex-1 py-3 bg-[#002a20] dark:bg-green-600 text-white rounded-xl font-bold hover:bg-[#002a20]/90 dark:hover:bg-green-700 transition active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#002a20]/20 dark:shadow-green-900/20"
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