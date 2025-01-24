import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useOpenDoor } from './hooks/useOpenDoor';

const Dashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const code = localStorage.getItem('code')

  useEffect(() => {
    if (!localStorage.getItem('code')) {
      navigate('/login');
    }
  }, [navigate]);

  const { openDoor, data, status, reset } = useOpenDoor(() => setTimeout(() => reset(), 2000))

  const message = useMemo(() => {
    if (status === 'idle') return undefined;
    if (status === 'pending') return 'Otwieranie... 🚪' 
    if (status === 'error') return 'Błąd! 🤬'
    if (status === 'success') {
      if(data?.success) return 'Drzwi otwarte! 🚪🚶‍'
      else if(data?.message) return 'Nie udało się otworzyć drzwi: ' + data.message
    }
  }, [status, data])

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-800">
      <h1 className="text-white text-4xl font-bold mb-8">Hej {name}!</h1>
      {message && (
        <p className="text-white text-2xl mb-8">{message}</p>
      )}
      <button
        className="bg-green-500 hover:bg-green-600 text-white text-4xl font-bold py-4 px-8 rounded-lg"
        onClick={() => openDoor(code!)}
      >
        Otwórz drzwi
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white text-xl font-bold py-4 px-8 rounded-lg absolute top-4 left-4"
        onClick={() => {
          localStorage.removeItem('code');
          localStorage.removeItem('name');
          navigate('/login');
        }}
      >
        wyloguj
      </button>
    </div>
  );
};

export default Dashboard;