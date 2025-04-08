import { useEffect, useState } from 'react';

const BalanceWidget = () => {
  const [balance, setBalance] = useState(null);
  
  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg h-full flex flex-col justify-center items-center'>
      <h2 className='text-center text-lg font-bold'>Balance</h2>
      {balance !== null ? (
        <p className='text-center text-2xl text-green-500'>${balance}</p>
      ) : (
        <p className='text-center text-gray-500'>Loading...</p>
      )}
    </div>
  );
};

export default BalanceWidget;