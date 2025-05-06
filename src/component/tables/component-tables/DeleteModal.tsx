import { AlertTriangle } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  // Removed unused prop
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({
  isOpen,
  itemName,
  onConfirm,
  onCancel
}: DeleteModalProps) {
  if (!isOpen) return null;
 
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Confirm Deletion
            </h3>
          </div>
         
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete{' '}
            <span className="font-medium text-gray-700">
              {itemName}
            </span>
            ? This action cannot be undone.
          </p>
         
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
     
      {/* Include the required CSS for the modal */}
      <style jsx global>{`
        .modal-overlay {
          background-color: rgba(0, 0, 0, 0.5);
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
        }
       
        .modal-content {
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          width: 100%;
          max-width: 28rem;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}