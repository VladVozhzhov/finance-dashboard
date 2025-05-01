import useWidgetLogic from '../../hooks/useWidgetLogic';
import { FaTrashAlt } from 'react-icons/fa';
import FloatingLabelInput from '../../components/FloatingLabelInput';

const GainWidget = () => {
  const {
    items: gains,
    formData,
    handleChange,
    handleSubmit,
    handleDelete,
    isLoading,
    fetchError,
  } = useWidgetLogic('gain');

  return (
    <section className='overflow-hidden sm:rounded-lg h-full flex flex-col justify-start items-center'>
      <h2 className='self-center text-md font-bold mb-2 dark:text-[#d0d0d0]'>Gains</h2>

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center mb-2">
        <div className='flex flex-col justify-center items-center w-2/3'>
          <FloatingLabelInput
            type="number"
            placeholder="Today's gain"
            name="gains"
            value={formData}
            onChange={handleChange}
            style="pointer-events-none absolute top-0 text-gray-400 text-xs transition-all duration-300"
            focusStyle="text-blue-600 text-xs -top-5 left-0 px-1"
            noFocusStyle="top-2 left-2"
            inputStyle="flex justify-end focus:border-blue-500 focus:outline-none focus:ring-0 border border-gray-300 rounded-md p-2 py-3 text-sm w-full dark:bg-[#1b1b1b] dark:text-[#d0d0d0]" 
          />
        </div>
        <button type="submit" className="bg-green-600 dark:bg-green-800 hover:bg-green-700 hover:dark:bg-green-900 text-white text-sm py-1 px-3 rounded-md mt-2">
          Submit
        </button>
      </form>

      {fetchError ? <p className='text-red-700'>Error: {fetchError}</p> : gains.length === 0 ? (<p className='dark:text-white'>No items to show</p>) : 
      (
        <ul className="w-full bg-[#ececec] dark:bg-[#242526] dark:text-[#d0d0d0] rounded-lg py-1 px-2 flex flex-col gap-2 items-start overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100">
          {gains.map(([date, value]) => (
            <li key={date} className="flex items-center justify-between w-full max-w-sm bg-[#e1e1e1] dark:bg-[#1b1b1b] rounded-lg p-0.5">
              <p className="text-sm dark:text-[#d0d0d0]">${value}</p>
              <p className="text-sm dark:text-[#d0d0d0]">{date}</p>
              <FaTrashAlt className="text-red-600 cursor-pointer hover:text-red-800" role="button" onClick={() => handleDelete(date)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default GainWidget;
