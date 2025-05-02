import useWidgetLogic from '../../hooks/useWidgetLogic';
import { FaTrashAlt } from 'react-icons/fa';
import FloatingLabelInput from '../../components/FloatingLabelInput';

const GainWidget = () => {
  const {
    items: budget,
    formData,
    handleChange,
    handleSubmit,
    handleDelete,
    isLoading,
    fetchError,
  } = useWidgetLogic('budget');

  return (
    <section className='widget-section'>
      <h2 className='widget-h2'>Budget</h2>

      <form onSubmit={handleSubmit} className="widget-form">
        <div className='widget-input-container'>
          <FloatingLabelInput
            type="number"
            placeholder="Today's budget"
            name="budget"
            value={formData}
            onChange={handleChange}
            style="widget-style-input"
            focusStyle="widget-focus-input"
            noFocusStyle="widget-nofocus-input"
            inputStyle="widget-input" 
          />
        </div>
        <button type="submit" className="widget-submit-button">
          Submit
        </button>
      </form>

      {fetchError ? <p className='text-red-700'>Error: {fetchError}</p> : budget.length === 0 ? (<p className='dark:text-white'>No items to show</p>) : 
      (
        <ul className="widget-ul">
          {budget.map(([date, value]) => (
            <li key={date} className="widget-ul-li">
              <p className="widget-ul-li-p">${value}</p>
              <p className="widget-ul-li-p">{date}</p>
              <FaTrashAlt className="widget-ul-li-trash" role="button" onClick={() => handleDelete(date)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default GainWidget;
