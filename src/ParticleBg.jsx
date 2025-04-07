import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React from "react";

const ParticleBgHome = () => {
  const [init, setInit] = useState(false);

  // Initialize the particles engine only once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      try {
        await loadSlim(engine);
        setInit(true);
      } catch (err) {
        console.error("Error loading particles engine:", err);
      }
    });
  }, []);

  // Particle options, memoized to run only once
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push",
          },
          onHover: {
            enable: false,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
    }),
    [] // Empty dependency array ensures this is only created once
  );

  // Render particles only after initialization
  if (init) {
    return <Particles id="tsparticles" options={options} />;
  }

  return null; // Render nothing until particles are initialized
};

export default React.memo(ParticleBgHome);