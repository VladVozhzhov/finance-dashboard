import ParticleBg from "./ParticleBg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="particlebg-container">
      <ParticleBg />
      <div className="z-10 text-white">
        <h1 className="md:text-4xl text-2xl font-bold mb-4">Welcome to Finance Dashboard</h1>
        <p className="md:text-lg text-sm max-w-xl">
          Your one-stop solution for tracking, analyzing, and managing your finances. 
          Stay on top of your financial goals with real-time insights and powerful tools.
        </p>
        <button className="link-button">
          <Link to="register">Sign Up</Link>
        </button>
        <p className="md:text-lg text-sm inline mx-3">Or</p>
        <button className="link-button">
          <Link to="auth">Log In</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;