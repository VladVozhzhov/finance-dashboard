import SpendWidget from './SpendWidget';
import GainWidget from './GainWidget';
import BalanceWidget from './BalanceWidget';
import BudgetWidget from './BudgetWidget';

const WidgetList = () => {
    const widgets = [SpendWidget, GainWidget, BalanceWidget, BudgetWidget] 

    return (
        <ul className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 lg:grid-rows-1 gap-4" id="widgets">
            {widgets.map((Widget, index) => (
                <li key={index} className="p-2 pb-0 border rounded-lg shadow-md h-48 overflow-y-auto xl:h-72">
                    <Widget />
                </li>
            ))}
        </ul>
    );
};

export default WidgetList;