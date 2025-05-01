// components/modals/ProfileEditModal.tsx
import React, { useState } from "react";
import Modal from "@/component/modal/Modal";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  onSave: (newUsername: string) => void;
}

const ProfileEditModal = ({
  isOpen,
  onClose,
  username,
  onSave,
}: ProfileEditModalProps) => {
  const [newUsername, setNewUsername] = useState(username);

  const handleSave = () => {
    onSave(newUsername);
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
      title="Edit Profile"
      footer={footer}
      size="md"
      overlayOpacity={30}
    >
      <div>
        <label className="block mb-2 font-medium">Username</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <p className="text-sm text-gray-500 mt-2">
          Username harus terdiri dari 5-30 karakter: mencakup angka, huruf,
          garis bawah, titik & tanpa spasi.
        </p>
      </div>
    </Modal>
  );
};

export default ProfileEditModal;
