import React from "react";
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
      {/* Login Modal */}
      <Modal
        isOpen={isLoginOpen}
        onClose={onCloseLogin}
        size="md"
        showCloseButton
        closeOnClickOutside
        overlayOpacity={50}
      >
        <LoginForm onSwitchToRegister={onSwitchToRegister} />
      </Modal>

      {/* Register Modal */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={onCloseRegister}
        size="md"
        showCloseButton
        closeOnClickOutside
        overlayOpacity={50}
      >
        <RegisterForm
          onSwitchToLogin={onSwitchToLogin}
          onClose={onCloseRegister}
        />
      </Modal>
    </>
  );
};

export default AuthModals;
