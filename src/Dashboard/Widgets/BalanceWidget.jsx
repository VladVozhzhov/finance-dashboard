import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext'; 
import { format } from 'date-fns';

const BalanceWidget = () => {
  const { auth } = useContext(AuthContext);
  const { data, isLoading, fetchError } = useContext(DataContext);
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    if (data && typeof data === 'object') {
      const spendingData = data.spending || {};
      const gainData = data.gain || {};

      const calculatedBalance = Object.keys({ ...spendingData, ...gainData }).map((date) => {
        const spendingForDate = spendingData[date] || 0;
        const gainsForDate = gainData[date] || 0;
        return [date, gainsForDate - spendingForDate];
      });

      setBalance(calculatedBalance);
    }
  }, [data]);

  return (
    <section className='widget-section'>
      <h2 className='widget-h2'>Balance</h2>

      {fetchError ? (<p className='text-red-700'>Error: {fetchError}</p>) : balance.length === 0 ? (<p className='dark:text-white'>No items to show</p>) :
        <ul className="widget-ul">
          {balance.map(([date, value]) => (
            <li key={date} className="widget-ul-li">
              <p className="widget-ul-li-p">${value}</p>
              <p className="widget-ul-li-p">{date}</p>
            </li>
          ))}
        </ul>
      }
    </section>
  );
};

export default BalanceWidget;
