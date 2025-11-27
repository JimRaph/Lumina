import PropTypes from 'prop-types';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100">
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                    <span className="text-red-500">🛑</span> Confirm Deletion
                </h3>

                <p className="text-gray-700 mb-6">
                    Are you sure you want to permanently delete the product 
                    <span className="font-semibold text-red-600"> &quot;{itemName}&quot;</span>?
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    
                    <button 
                        onClick={onConfirm} 
                        className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-md shadow-red-500/30"
                    >
                        Delete Permanently
                    </button>
                </div>
            </div>
        </div>
    );
};

DeleteConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    itemName: PropTypes.string.isRequired,
};

export default DeleteConfirmationModal;