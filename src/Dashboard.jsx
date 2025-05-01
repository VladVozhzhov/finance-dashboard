import WidgetList from "./Dashboard/Widgets/WidgetList";
import NavBar from "./components/NavBar";
import Goal from "./Dashboard/ProgressBars/Goal";
import Chart from './Dashboard/Charts/Chart'

const Dashboard = () => {
  return (
      <div className="p-4 bg-gradient-to-tr from-green-400 to-yellow-300 dark:from-[#1B1F47] dark:to-[#293844]">
        <NavBar />
        <WidgetList />
        <Goal />
        <Chart
          total={2000}
          data={[
            { name: "Food", value: 300, bgColor: "#00C49F", textColor: "#ffffff" },
            { name: "Rent", value: 1200, bgColor: "#FFBB28", textColor: "#000000" },
            { name: "Entertainment", value: 250, bgColor: "#FF8042", textColor: "#ffffff" },
          ]}
        />
      </div>
  );
};

export default Dashboard;