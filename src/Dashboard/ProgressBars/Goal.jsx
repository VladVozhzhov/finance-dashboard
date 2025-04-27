import { useState, useContext, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import GoalItem from './GoalItem';
import FloatingLabelInput from '../../components/FloatingLabelInput';

const Goal = () => {
    const axiosPrivate = useAxiosPrivate();
    const [formData, setFormData] = useState({ goalName: '', valueAmount: '' });
    const { auth } = useContext(AuthContext);
    const { fetchError, bars, setBars } = useContext(DataContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const goalValue = parseFloat(valueData);
        if (!auth?.userId || isNaN(goalValue)) return;

        try {
            const response = await axiosPrivate.post(
                `/users/progressBars`,
                {
                    name: nameData,
                    saved: 0,
                    goal: goalValue
                }
            );
            const newBar = response.data.progressBar;
            setBars((prev) => [...prev, newBar]);
        } catch (err) {
            console.error('Error submitting goal:', err);
        } finally {
            setFormData('');
        }
    };

    return (
        <section id="goals" className="flex flex-col bg-[#f6f6f6] dark:bg-[#1b1b1b] items-center w-full rounded-lg my-3 p-2">
            <h2 className='text-lg font-bold dark:text-[#d0d0d0]'>Add a new goal</h2>
            <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-4 w-full mb-2'>
                <div>
                <FloatingLabelInput
                    type="text"
                    placeholder="Goal name"
                    name="goalName"
                    value={formData.goalName}
                    onChange={handleChange}
                    style="pointer-events-none absolute left-3 text-gray-500 dark:text-gray-400 text-sm transition-all"
                    focusStyle="top-1 text-xs text-blue-500 dark:text-blue-400"
                    noFocusStyle="top-4"
                    inputStyle="peer w-full rounded-md border-2 border-gray-300 dark:border-gray-600 bg-transparent px-3 pt-5 pb-2 text-sm text-gray-900 dark:text-white placeholder-transparent focus:border-blue-500 focus:outline-none focus:ring-0"
                />
                </div>
                <div>
                <FloatingLabelInput
                    type="text"
                    placeholder="Goal value"
                    name="valueAmount"
                    value={formData.valueAmount}
                    onChange={handleChange}
                    style="pointer-events-none absolute left-3 text-gray-500 dark:text-gray-400 text-sm transition-all"
                    focusStyle="top-1 text-xs text-blue-500 dark:text-blue-400"
                    noFocusStyle="top-4"
                    inputStyle="peer w-full rounded-md border-2 border-gray-300 dark:border-gray-600 bg-transparent px-3 pt-5 pb-2 text-sm text-gray-900 dark:text-white placeholder-transparent focus:border-blue-500 focus:outline-none focus:ring-0"
                />

                </div>
                <button 
                    type="submit" 
                    className="bg-green-600 dark:bg-green-800 hover:bg-green-700 hover:dark:bg-green-900 text-white px-2 py-1 rounded-lg"
                >
                    Submit
                </button>
            </form>
            <div className="bg-[#ececec] dark:bg-[#2a2a2a] rounded-lg p-1 px-2 shadow-md w-full">
                <h2 className='text-lg font-bold dark:text-[#d0d0d0] my-4'>Your goals</h2>
                <ul className="w-full">
                    {fetchError && <p className="text-sm self-center justify-self-center text-red-500">{fetchError}</p>}
                    {!fetchError && bars.length === 0 && <p className="text-sm self-center justify-self-center">No goals found</p>}
                    {!fetchError && Array.isArray(bars) && bars.map(bar => (
                        <GoalItem key={bar._id} bar={bar} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Goal;
