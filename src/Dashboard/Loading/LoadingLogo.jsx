const LoadingLogo = () => {
    return (
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="90" fill="#E0F7FA" stroke="#00796B" strokeWidth="5" />
        
        <circle
          cx="100"
          cy="100"
          r="75"
          fill="none"
          stroke="#B2DFDB"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
  
        <defs>
          <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00796B" />
            <stop offset="100%" stopColor="#004D40" />
          </linearGradient>
          <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#004D40" />
            <stop offset="100%" stopColor="#00332D" />
          </linearGradient>
          <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#009688" />
            <stop offset="100%" stopColor="#00796B" />
          </linearGradient>
        </defs>
  
        <rect x="60" y="80" width="20" height="60" fill="url(#barGradient1)" />
        <rect x="90" y="60" width="20" height="80" fill="url(#barGradient2)" />
        <rect x="120" y="40" width="20" height="100" fill="url(#barGradient3)" />
  
        <polygon
          points="130,35 132,39 136,40 132,41 130,45 128,41 124,40 128,39"
          fill="#FFC107"
        />
      </svg>
    );
  };
  
  export default LoadingLogo;
  