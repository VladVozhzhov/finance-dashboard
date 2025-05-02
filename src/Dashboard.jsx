import WidgetList from "./Dashboard/Widgets/WidgetList";
import NavBar from "./components/NavBar";
import Goal from "./Dashboard/ProgressBars/Goal";
import Chart from './Dashboard/Charts/Chart'

const Dashboard = () => {
  return (
      <div className="p-4 bg-gradient-to-tr from-green-400 to-yellow-300 dark:from-[#1B1F47] dark:to-[#293844]">
        <NavBar />
        <div className="lg:flex lg:flex-row lg:grow lg:mb-3">
          <WidgetList />
          <Goal />
        </div>
        <Chart />
      </div>
  );
};

export default Dashboard;