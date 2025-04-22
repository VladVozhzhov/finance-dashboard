import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext'; 
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const BalanceWidget = () => {
  const { auth } = useContext(AuthContext);
  const { data, isLoading, fetchError } = useContext(DataContext);
  const [balance, setBalance] = useState([]);
  const currentDate = format(new Date(), 'MMMM d yyyy');

  useEffect(() => {
    if (data && typeof data === 'object') {
      const spendingData = data.spending || {};
      const gainData = data.gain || {};
  
      // Calculate balance dynamically
      const calculatedBalance = Object.keys({ ...spendingData, ...gainData }).map((date) => {
        const spendingForDate = spendingData[date] || 0;
        const gainsForDate = gainData[date] || 0;
        return [date, gainsForDate - spendingForDate];
      });
  
      setBalance(calculatedBalance);
    }
  }, [data]);

  return (
    <section className='overflow-hidden bg-white sm:rounded-lg h-full flex flex-col justify-start items-center'>
      <h2 className='self-center text-md font-bold mb-2'>Balance</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : fetchError ? (
        <p>Error: {fetchError}</p>
      ) : balance.length === 0 ? (
        <p>No items to show</p>
      ) : (
        <ul className="w-full flex flex-col gap-2 items-start overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
          {balance.map(([date, value]) => (
            <li key={date} className="flex items-center justify-between w-full max-w-sm">
              <p className="text-sm font-medium">${value}</p>
              <p className="text-sm font-medium">{date}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default BalanceWidget;