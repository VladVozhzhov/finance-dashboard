import SpendWidget from './SpendWidget';
import GainWidget from './GainWidget';
import BalanceWidget from './BalanceWidget';
import BudgetWidget from './BudgetWidget';

const WidgetList = () => {
    const widgets = [SpendWidget, GainWidget, BalanceWidget, BudgetWidget] 

    return (
        <ul className="grid grid-cols-2 lg:flex lg:flex-col lg:mr-2 grid-rows-2 gap-4" id="widgets">
            {widgets.map((Widget, index) => (
                <li key={index} className="p-2 pb-0 rounded-lg bg-[#f6f6f6] dark:bg-[#1b1b1b] shadow-md lg:w-64 h-48 md:h-72 overflow-y-auto">
                    <Widget />
                </li>
            ))}
        </ul>
    );
};

export default WidgetList;