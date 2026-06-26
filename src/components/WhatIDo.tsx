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

          {/* 1 - Computer Engineering Foundation */}
          <div className="service-box" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "0.5rem" }}>
              Computer Engineering Foundation <MdArrowOutward style={{ fontSize: "1.2rem", color: "#a29bfe", marginLeft: "0.5rem" }} />
            </h4>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>
              I am currently pursuing a Bachelor of Science in Computer Engineering at the University
              of Engineering and Technology (UET) Lahore, bridging the gap between advanced hardware
              architectures and high-performance software systems. My coursework covers relational
              database design, data pipelines, and systems programming, giving me a methodical
              approach to troubleshooting system bottlenecks and optimizing complex logic from the
              silicon level up to the application layer.
            </p>
          </div>

          {/* 2 - AI-to-AI Economy Frameworks */}
          <div className="service-box" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "0.5rem" }}>
              AI-to-AI Economy Frameworks <MdArrowOutward style={{ fontSize: "1.2rem", color: "#a29bfe", marginLeft: "0.5rem" }} />
            </h4>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>
              Beyond traditional software, I focus on the infrastructure supporting the emerging
              autonomous AI-to-AI economy — exploring how independent, multi-agent AI systems can
              interact, communicate, and transact securely without human intervention. I research
              decentralized protocols, efficient data streaming, and robust backend pipelines, aiming
              to build self-validating data environments capable of handling high-throughput agent
              interactions for next-generation intelligent network pipelines.
            </p>
          </div>

          {/* 3 - Quantum Computing Architectures */}
          <div className="service-box" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "0.5rem" }}>
              Quantum Computing Architectures <MdArrowOutward style={{ fontSize: "1.2rem", color: "#a29bfe", marginLeft: "0.5rem" }} />
            </h4>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>
              I am deeply invested in researching theoretical and practical implementations within
              Quantum Computing — investigating quantum algorithms, scalable error correction
              protocols, and hardware-software interfaces. This demands a deep conceptual shift from
              classical binary logic gates to multi-dimensional probability vectors. By combining my
              computer engineering background with advanced computational theory, I work toward
              modeling robust sub-systems for future quantum-accelerated platforms.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default WhatIDo;