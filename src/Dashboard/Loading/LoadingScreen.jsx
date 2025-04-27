import LoadingLogo from "./LoadingLogo";

const LoadingScreen = () => {
  return (
    <div className="loading-screen flex flex-col items-center justify-center h-screen bg-white dark:bg-[#1b1b1b]">
      <LoadingLogo />
      <p className="mt-4 text-gray-600 text-lg">Crunching your numbers…</p>
    </div>
  );
};

export default LoadingScreen;
