// components/AuthModals.tsx
import React, { useState } from "react";
import Modal from "./Modal";
import LoginForm from "./modal-form/LoginForm";
import RegisterForm from "./modal-form/RegisterForm";

interface AuthModalsProps {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  onCloseLogin: () => void;
  onCloseRegister: () => void;
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
}

const AuthModals: React.FC<AuthModalsProps> = ({
  isLoginOpen,
  isRegisterOpen,
  onCloseLogin,
  onCloseRegister,
  onSwitchToLogin,
  onSwitchToRegister,
}) => {
  return (
    <>
      <Modal
        isOpen={isLoginOpen}
        onClose={onCloseLogin}
        size="md"
        showCloseButton={true}
        closeOnClickOutside={true}
        overlayOpacity={50}
      >
        <LoginForm onSwitchToRegister={onSwitchToRegister} />
      </Modal>

      <Modal
        isOpen={isRegisterOpen}
        onClose={onCloseRegister}
        size="md"
        showCloseButton={true}
        closeOnClickOutside={true}
        overlayOpacity={50}
      >
        <RegisterForm 
          onSwitchToLogin={onSwitchToLogin} 
          onClose={onCloseRegister} // Pass onCloseRegister as onClose prop
        />
      </Modal>
    </>
  );
};

export default AuthModals;