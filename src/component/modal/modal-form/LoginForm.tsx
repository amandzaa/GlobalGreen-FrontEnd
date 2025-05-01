// components/LoginForm.tsx
import React, { useState } from 'react';
import Image from 'next/image';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');

  return (
    <div>
      {/* Header */}
      <div className="flex items-baseline mb-6">
        <h2 className="text-2xl font-medium text-gray-700">Masuk</h2>
        <button 
          onClick={onSwitchToRegister}
          className="ml-auto text-green-500 font-medium"
        >
          Daftar
        </button>
      </div>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="email">
            Nomor Ponsel atau Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
          />
          <p className="text-gray-400 text-sm mt-1">
            Contoh: email@gmail.com
          </p>
        </div>

        <div className="text-right mb-6">
          <button className="text-green-500 text-sm font-medium">
            Lupa Kata Sandi?
          </button>
        </div>

        <button 
          type="submit"
          className={`w-full py-3 rounded-md font-medium mb-6 ${
            email ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-500'
          }`}
          disabled={!email}
        >
          Selanjutnya
        </button>

        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <p className="px-4 text-gray-500 text-sm">atau masuk dengan</p>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <button className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md mb-6">
          <div className="mr-2 relative w-5 h-5">
            <Image src="/google-logo.png" alt="Google" fill sizes="20px" />
          </div>
          <span className="font-medium">Google</span>
        </button>

        <div className="text-center">
          <p className="text-gray-600">
            Belum punya akun GlobalGreen? 
            <button 
              onClick={onSwitchToRegister}
              className="text-green-500 font-medium ml-1"
            >
              Daftar
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;