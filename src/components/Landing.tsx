import "./styles/Landing.css";

// ✅ Fixed manually without any external type import
const Landing = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro swing-item">
            <h2>Hello! I'm</h2>
            <h1>
              RAI
              <br />
              <span>ADIL</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Designer</div>
              <div className="landing-h2-2">Developer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;