import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext'; 
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
    <section className='overflow-hidden dark:text-[#d0d0d0] sm:rounded-lg h-full flex flex-col justify-start items-center'>
      <h2 className='self-center text-md dark:text-[#d0d0d0] font-bold mb-2'>Balance</h2>

      {fetchError ? (<p className='text-red-700'>Error: {fetchError}</p>) : balance.length === 0 ? (<p className='dark:text-white'>No items to show</p>) : 
      (
        <ul className="w-full bg-[#ececec] dark:bg-[#242526] rounded-lg py-1 px-2 flex flex-col gap-2 items-start overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
          {balance.map(([date, value]) => (
            <li key={date} className="flex items-center justify-between w-full max-w-sm bg-[#e1e1e1] dark:bg-[#1b1b1b] rounded-lg p-0.5">
              <p className="text-sm dark:text-[#d0d0d0]">${value}</p>
              <p className="text-sm dark:text-[#d0d0d0]">{date}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default BalanceWidget;