import { useState, useEffect, useContext } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { FaTrashAlt } from 'react-icons/fa';

const GoalItem = ({ bar }) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useContext(AuthContext);
    const { refetchBars } = useContext(DataContext);
    const { _id, name, saved, goal } = bar;

    const [addAmount, setAddAmount] = useState('');
    const [removeAmount, setRemoveAmount] = useState('');
    const [warning, setWarning] = useState('');
    const [reachedGoal, setReachedGoal] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const progressValue = Math.min(parseFloat(((saved / goal) * 100).toFixed(2)), 100);
    useEffect(() => { progressValue >= 100 && setReachedGoal(true) }, [progressValue]);

    const handleAddMoneySubmit = async (e) => {
        e.preventDefault();
        const addValue = parseFloat(addAmount);
        if (!auth?.userId || isNaN(addValue)) return;

        try {
            await axiosPrivate.patch(`/users/progressBars/${_id}`, {
                saved: saved + addValue
            });
        } catch (err) {
            console.error('Error adding money:', err);
        } finally {
            setAddAmount('');
        }
    };

    const handleRemoveMoneySubmit = async (e) => {
        e.preventDefault();
        const removeValue = parseFloat(removeAmount);
        if (!auth?.userId || isNaN(removeValue)) return;

        try {
            await axiosPrivate.patch(`/users/progressBars/${_id}`, {
                saved: Math.max(saved - removeValue, 0)
            });
        } catch (err) {
            console.error('Error removing money:', err);
        } finally {
            setRemoveAmount('');
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            await axiosPrivate.delete(`/users/progressBars/${_id}`);
        } catch (err) {
            console.error('Error deleting goal:', err);
        } finally {
            refetchBars();
        }
    };

    const handleWarning = (e) => {
        e.preventDefault();
        setClickCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount === 1) {
                setWarning('Click again to confirm deletion!');
            } else if (newCount >= 2) {
                handleDelete(e);
            }
            return newCount;
        });
        setTimeout(() => {
            setClickCount(0);
            setWarning('');
        }, 10000);
    };

    return (
        <li className="w-full mb-4 relative group transition duration-300 bg-[#e1e1e1] dark:bg-[#212427] rounded-lg shadow-md overflow-hidden">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            <div className="p-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-row w-full justify-between">
                  <h3 className="text-lg md:text-[1.75rem] font-semibold dark:text-[#d0d0d0]">{name}</h3>
                  <FaTrashAlt className="text-red-600 cursor-pointer text-2xl md:text-4xl hover:text-red-800 transition duration-100" role="button" onClick={handleWarning} />
                </div>
                {warning && <p className='bg-red-500 text-white p-1 rounded-lg text-lg font-bold'>{warning}</p>}
                <label className="text-md text-xl font-medium mb-2 flex flex-row dark:text-[#d0d0d0]">{`Progress: ${progressValue}%`}{reachedGoal === true && <p className='text-md text-xl ml-12 text-center mx-2'>Goal reached 🎉🎉🎉</p>}</label>

                <div className="relative w-full h-6 md:h-8 rounded-lg overflow-hidden mt-1 mb-1 bg-gray-700">
                    <div
                        className="h-full bg-green-600 dark:bg-green-700 rounded-lg transition-all duration-300 "
                        style={{ width: `${progressValue}%` }}
                    ></div>
                </div>

                <p className="text-sm md:text-lg mt-1 dark:text-[#d0d0d0]">{`Saved: $${saved} / Goal: $${goal}`}</p>

                <form onSubmit={handleAddMoneySubmit} className="my-2">
                    <label className='text-sm md:text-lg dark:text-[#d0d0d0]'>Add money:</label>
                    <div className="flex gap-2">
                        <input 
                            type="number"
                            className="border border-gray-300 text-sm md:text-xl rounded-md p-1 w-2/3 md:py-3 dark:text-[#d0d0d0] focus:border-blue-500  focus:outline-none focus:ring-0"
                            value={addAmount}
                            onChange={(e) => setAddAmount(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-green-600 dark:bg-green-800 hover:bg-green-700 hover:dark:bg-green-900 text-sm md:text-xl text-white px-3 md:w-1/6 py-1 rounded-md  transition">Add</button>
                    </div>
                </form>

                <form onSubmit={handleRemoveMoneySubmit}>
                    <label className="text-sm md:text-lg dark:text-[#d0d0d0]">Remove money:</label>
                    <div className="flex gap-2">
                        <input 
                            type="number"
                            className="border border-gray-300 text-sm md:text-xl rounded-md p-1 w-2/3 md:py-3 dark:text-[#d0d0d0] focus:border-blue-500  focus:outline-none focus:ring-0"
                            value={removeAmount}
                            onChange={(e) => setRemoveAmount(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-red-500 dark:bg-red-800 text-sm md:text-xl text-white px-3 md:w-1/6 py-1 rounded-md hover:bg-red-600 hover:dark:bg-red-900 ">Remove</button>
                    </div>
                </form>
            </div>
        </li>
    );
};

export default GoalItem;