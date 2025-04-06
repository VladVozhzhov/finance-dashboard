import ParticleBg from "./ParticleBg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="m-0 p-0 h-screen w-screen overflow-hidden flex flex-col items-center justify-center text-center bg-transparent">
      <ParticleBg />
      <div className="z-10 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Finance Dashboard</h1>
        <p className="text-lg max-w-xl">
          Your one-stop solution for tracking, analyzing, and managing your finances. 
          Stay on top of your financial goals with real-time insights and powerful tools.
        </p>
        <button className="link-button">
          <Link to="Register">Sign Up</Link>
        </button>
        <p className="text-lg inline mx-3">Or</p>
        <button className="link-button">
          <Link to="Auth">Log In</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;