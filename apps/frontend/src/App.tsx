import { useState } from 'react';

const renderCode = (code: string) => {
  return code.padEnd(4, '_').split('').join(' ');
};

const handleSubmit= (code: string, setResponse: (response: string | undefined) => void) => {
  const endpoint = `http://${window.location.hostname}:3000/open?password=${code}`
  fetch(endpoint).then((response) => {
    response.json().then((data) => {
      if (data.success) {
        setResponse('🚪🚶‍')
      } else {
        setResponse('❌')
      }
      setTimeout(() => {
        setResponse(undefined)
      }, 2000)
    })
  }).catch(() => {
    setResponse('❌')
    setTimeout(() => {
      setResponse(undefined)
    }, 2000)
  })
}

const DEFAULT_TITLE = 'kto tam? 😈🚪'

const Keypad = () => {
  const [code, setCode] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<string | undefined>(undefined);

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
      <h1 className="text-white text-4xl font-bold mb-8">{response ? response : DEFAULT_TITLE}</h1>
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
                handleSubmit(code, setResponse);
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
