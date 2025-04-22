import useWidgetLogic from '../hooks/useWidgetLogic';
import { FaTrashAlt } from 'react-icons/fa';

const GainWidget = () => {
  const {
    items: spending,
    formData,
    handleChange,
    handleSubmit,
    handleDelete,
    isLoading,
    fetchError,
  } = useWidgetLogic('spending');

  return (
    <section className='overflow-hidden bg-white sm:rounded-lg h-full flex flex-col justify-start items-center'>
      <h2 className='self-center text-md font-bold mb-2'>Spending</h2>

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center mb-2">
        <div className='flex flex-row justify-center items-center'>
          <label className='text-[0.8rem]'>Enter today`s gain</label>
          <input
            type="number"
            className="border border-gray-300 text-sm rounded-md p-2 py-1 w-1/3 mb-2"
            onChange={handleChange}
            value={formData}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white text-sm py-1 px-3 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>

      {isLoading ? <p>Loading...</p> : fetchError ? <p>Error: {fetchError}</p> : spending.length === 0 ? (
        <p>No items to show</p>
      ) : (
        <ul className="w-full flex flex-col gap-2 items-start overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
          {spending.map(([date, value]) => (
            <li key={date} className="flex items-center justify-between w-full max-w-sm">
              <p className="text-sm font-medium">${value}</p>
              <p className="text-sm font-medium">{date}</p>
              <FaTrashAlt className="text-red-600 cursor-pointer hover:text-red-800" role="button" onClick={() => handleDelete(date)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default GainWidget;
