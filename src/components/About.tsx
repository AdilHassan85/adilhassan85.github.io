import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>

        <p className="para intro">
          Hi, I'm Adil Hasan, a passionate Computer Engineering student dedicated to building
          intelligent systems and pushing the boundaries of technology. Driven by curiosity and a
          strong academic foundation, I look at every complex problem as an opportunity to engineer
          an elegant, impactful solution.
        </p>

        <h4 className="sub-heading">Tech Interests</h4>
        <p className="para">
          My primary technical interest lies in the frontier of intelligent systems, specifically
          focusing on the concept of the <strong>AI-to-AI Economy</strong>. I am deeply fascinated by
          how autonomous agents, machine learning models, and decentralized networks can interact,
          transact, and collaborate with one another without human intervention. Alongside this, I
          actively explore <strong>Quantum Computing</strong> and interactive 3D development using
          C# and Unity.
        </p>

        <h4 className="sub-heading">Problem-Solving Approach</h4>
        <p className="para">
          I approach engineering with a structured, analytical mindset. To me, problem-solving is
          about breaking down a complex challenge into its core components, applying strong
          algorithmic logic, and optimizing for efficiency. Whether it's normalizing a complex
          database schema, debugging a game script, or tuning a machine learning model, I focus on
          writing clean, scalable, and highly performant code.
        </p>

        <h4 className="sub-heading">Projects & Achievements</h4>
        <p className="para">
          I developed and trained a <strong>Lung Cancer Stage Prediction Model</strong>, a Machine
          Learning project utilizing Random Forest and Decision Tree algorithms to accurately
          predict low, medium, and high stages of cancer. In interactive 3D engineering, I designed
          and scripted gameplay systems, including survival and mechanics logic, using Unity and C#.
          I also successfully secured verification and access to the{" "}
          <strong>GitHub Student Developer Pack</strong>, gaining entry to premium industry-standard
          developer resources.
        </p>

        <h4 className="sub-heading">Hobbies</h4>
        <p className="para">
          When I am away from my IDE, I like to challenge myself with high-focus activities that
          require discipline and quick reflexes. I am an avid fan of precision car drifting and
          enjoy the focus of horse riding.
        </p>
      </div>
    </div>
  );
};

export default About;