import WidgetList from "./Dashboard/WidgetList";
import NavBar from "./Dashboard/NavBar";
import Goal from "./Dashboard/Goal";

const Dashboard = () => {
  return (
      <div className="m-4">
        <NavBar />
        <WidgetList />
        <Goal />
      </div>
  );
};

export default Dashboard;