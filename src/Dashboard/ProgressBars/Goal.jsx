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
        const goalValue = parseFloat(formData.valueAmount);
        if (!auth?.userId || isNaN(goalValue)) return;

        try {
            const response = await axiosPrivate.post(
                `/users/progressBars`,
                {
                    name: formData.goalName,
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
        <section id="goals" className="flex flex-col bg-[#f6f6f6] dark:bg-[#1b1b1b] items-center w-full rounded-lg my-3 lg:my-0 p-2">
            <h2 className='text-lg md:text-3xl mb-2 font-bold dark:text-[#d0d0d0]'>Add a new goal</h2>
            <form onSubmit={handleSubmit} className='goal-form w-full mb-2'>
                <div>
                <FloatingLabelInput
                    type="text"
                    placeholder="Goal name"
                    name="goalName"
                    value={formData.goalName}
                    onChange={handleChange}
                    style="goal-input-style"
                    focusStyle="goal-focus-style"
                    noFocusStyle="goal-nofocus-style"
                    inputStyle="goal-input"
                />
                </div>
                <div>
                <FloatingLabelInput
                    type="text"
                    placeholder="Goal value"
                    name="valueAmount"
                    value={formData.valueAmount}
                    onChange={handleChange}
                    style="goal-input-style"
                    focusStyle="goal-focus-style"
                    noFocusStyle="goal-nofocus-style"
                    inputStyle="goal-input"
                />
                </div>
                <button 
                    type="submit" 
                    className="bg-green-600 dark:bg-green-800 hover:bg-green-700 hover:dark:bg-green-900 text-white px-2 py-1 rounded-lg md:text-xl"
                >
                    Submit
                </button>
            </form>
            <div className="bg-[#ececec] dark:bg-[#2a2a2a] rounded-lg p-1 px-2 shadow-md w-full">
                <h2 className='text-lg md:text-3xl pl-2 font-bold dark:text-[#d0d0d0] my-4'>Your goals</h2>
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
