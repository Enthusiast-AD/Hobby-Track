const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", confirmColor = "bg-red-600 hover:bg-red-500" }) => {
    if (!isOpen) return null;

    return (
        
        <div className="fixed inset-0 bg-[#002a20]/20 dark:bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-colors">
            
    
            <div className="bg-[#fff8e1] dark:bg-[#111] border border-[#002a20]/10 dark:border-white/10 rounded-xl p-6 w-full max-w-sm shadow-2xl transform transition-all scale-100">
                <h3 className="text-xl font-bold text-[#002a20] dark:text-white mb-2">{title}</h3>
                <p className="text-[#002a20]/60 dark:text-gray-400 mb-6">{message}</p>
                
                <div className="flex gap-4 justify-end">
                    <button 
                        onClick={onClose}
                        className="text-[#002a20]/60 dark:text-gray-400 hover:text-[#002a20] dark:hover:text-white font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`${confirmColor} text-white font-bold py-2 px-6 rounded-lg transition-all shadow-md shadow-[#002a20]/10 dark:shadow-none`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;