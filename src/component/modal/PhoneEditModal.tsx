// components/modals/PhoneEditModal.tsx
import React, { useState } from "react";
import Modal from "@/component/modal/Modal";

interface PhoneEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  onSave: (newPhone: string) => void;
}

const PhoneEditModal = ({
  isOpen,
  onClose,
  phone,
  onSave,
}: PhoneEditModalProps) => {
  const [newPhone, setNewPhone] = useState(phone);

  const handleSave = () => {
    onSave(newPhone);
    onClose();
  };

  const footer = (
    <div className="flex justify-end space-x-4">
      <button
        onClick={onClose}
        className="bg-white border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
      >
        Batal
      </button>
      <button
        onClick={handleSave}
        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Simpan
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Phone Number"
      footer={footer}
      size="md"
    >
      <div className="mb-6">
        <label className="block mb-2 font-medium">Phone Number</label>
        <input
          type="tel"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <p className="text-sm text-gray-500 mt-2">
          Please enter your phone number with country code.
        </p>
      </div>
    </Modal>
  );
};

export default PhoneEditModal;
