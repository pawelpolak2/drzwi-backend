import React, { useState } from 'react';

interface KeypadProps {
  onSubmit: (code: string) => void;
}

const renderCode = (code: string) => {
  return code.padEnd(4, '_').split('').join(' ');
};

const Keypad: React.FC<KeypadProps> = ({ onSubmit }) => {
  const [code, setCode] = useState<string | undefined>(undefined);

  const handleButtonClick = (value: string) => {
    setCode((prevCode) => {
      if (prevCode === undefined) return value;
      if (prevCode.length >= 4) return prevCode;
      return prevCode + value;
    });
  };

  const handleClear = () => {
    setCode('');
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-800">
      <h1 className="text-white text-4xl font-bold mb-8">kto tam? 😈🚪</h1>
      <div className="bg-gray-900 rounded-lg p-8 shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="text-white text-6xl font-bold mb-8 text-center">
          {code ? renderCode(code) : '_ _ _ _'}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((number) => (
            <button
              key={number}
              className="bg-gray-700 hover:bg-gray-600 text-white text-4xl font-bold py-4 rounded-lg"
              onClick={() => handleButtonClick(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="bg-red-500 hover:bg-red-600 text-white text-4xl font-bold py-4 rounded-lg col-span-1"
            onClick={handleClear}
          >
            ✖️
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white text-4xl font-bold py-4 rounded-lg col-span-1"
            onClick={() => {
              if (code) {
                onSubmit(code);
                setCode('');
              }
            }}
            disabled={!code || code.length < 4}
          >
            🚪
          </button>
        </div>
      </div>
    </div>
  );
};

export default Keypad;
