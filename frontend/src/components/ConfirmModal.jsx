const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            
    
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-sm shadow-2xl transform transition-all scale-100">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 mb-6">{message}</p>
                
                <div className="flex gap-4 justify-end">
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition-all"
                    >
                        Archive
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;