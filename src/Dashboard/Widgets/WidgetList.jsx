import SpendWidget from './SpendWidget';
import GainWidget from './GainWidget';
import BalanceWidget from './BalanceWidget';
import BudgetWidget from './BudgetWidget';

const WidgetList = () => {
    const widgets = [SpendWidget, GainWidget, BalanceWidget, BudgetWidget] 

    return (
        <ul className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 lg:grid-rows-1 gap-4" id="widgets">
            {widgets.map((Widget, index) => (
                <li key={index} className="p-2 pb-0 rounded-lg bg-[#f6f6f6] dark:bg-[#232023] shadow-md h-48 overflow-y-auto xl:h-72">
                    <Widget />
                </li>
            ))}
        </ul>
    );
};

export default WidgetList;