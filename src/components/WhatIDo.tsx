import { MdArrowOutward } from "react-icons/md";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  return (
    <div className="whatido-section section-container" id="services" style={{ padding: "6rem 0", clear: "both" }}>
      <div className="whatido-container" style={{ display: "flex", flexWrap: "wrap", gap: "4rem" }}>

        {/* Left Side Big Title */}
        <div className="whatido-left" style={{ flex: "1", minWidth: "250px" }}>
          <h2 style={{ fontSize: "3.5rem", color: "#fff", lineHeight: "1.1", fontWeight: "bold" }}>
            WHAT <br /> I DO
          </h2>
        </div>

        {/* Right Side Skills List */}
        <div className="whatido-right" style={{ flex: "2", display: "flex", flexDirection: "column", gap: "3rem" }}>

          {/* Skill 1 - C# */}
          <div className="service-box" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "0.5rem" }}>
              Application Development (C#) <MdArrowOutward style={{ fontSize: "1.2rem", color: "#a29bfe", marginLeft: "0.5rem" }} />
            </h4>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>
              Building structured desktop software using Object-Oriented Programming (OOP) principles.
              Focusing on clean logic and UI layouts.
            </p>
          </div>

          {/* Skill 2 - DBMS */}
          <div className="service-box" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "0.5rem" }}>
              Database Design & SQL (DBMS) <MdArrowOutward style={{ fontSize: "1.2rem", color: "#a29bfe", marginLeft: "0.5rem" }} />
            </h4>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>
              Designing relational schemas, writing optimized SQL queries, and handling data
              normalization (1NF, 2NF, 3NF) to eliminate redundancy.
            </p>
          </div>

          {/* Skill 3 - Python */}
          <div className="service-box" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "0.5rem" }}>
              Python Scripting & Logic <MdArrowOutward style={{ fontSize: "1.2rem", color: "#a29bfe", marginLeft: "0.5rem" }} />
            </h4>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>
              Writing scripts in Python for data management and custom dataset processing, while exploring
              Digital Logic Design (DLD) configurations.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WhatIDo;