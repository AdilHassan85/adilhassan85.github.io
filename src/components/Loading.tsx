import { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingProvider";
import "./styles/Loading.css";

const Loading = () => {
  const { setIsLoading } = useLoading();
  const [displayPercent, setDisplayPercent] = useState(0); // ✅ Alag unique name for clean rendering
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  // 🚀 AUTOMATIC FORCE BYPASS COUNTER WITH AUTO-EXIT
  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      if (currentPercent < 100) {
        currentPercent += Math.floor(Math.random() * 12) + 6; // Fluid running text counter
        if (currentPercent > 100) currentPercent = 100;
        setDisplayPercent(currentPercent);
      } else {
        clearInterval(interval);

        // Trigger out animations smoothly
        setTimeout(() => {
          setLoaded(true);
          setTimeout(() => {
            setIsLoaded(true);
          }, 400);
        }, 200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Handle absolute layer removal from screen
  useEffect(() => {
    if (isLoaded) {
      setClicked(true);
      setTimeout(() => {
        import("./utils/initialFX")
          .then((module) => {
            if (module && module.initialFX) {
              module.initialFX();
            }
          })
          .catch((err) => console.log("FX Bypassed", err))
          .finally(() => {
            if (typeof setIsLoading === "function") {
              setIsLoading(false); // ✅ Disappear the loader screen permanently!
            }
          });
      }, 500);
    }
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          Logo
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <div className="custom-marquee-fallback" style={{ display: 'flex', gap: '2rem', overflow: 'hidden' }}>
            <span>A Creative Developer</span>
            <span>A Creative Designer</span>
            <span>A Creative Developer</span>
            <span>A Creative Designer</span>
          </div>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  {/* ✅ FIXED RENDER LABEL */}
                  Loading <span>{displayPercent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

// Shared export bindings to prevent breaking other files imports
export const setProgress = (setLoading: (value: number) => void) => {
  if (typeof setLoading === "function") setLoading(100);
  return {
    loaded: () => Promise.resolve(100),
    percent: 100,
    clear: () => { }
  };
};