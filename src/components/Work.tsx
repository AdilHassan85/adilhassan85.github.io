import { MdArrowOutward } from "react-icons/md";
import "./styles/Work.css";

const Work = () => {
  // 💻 Pure, solid 2nd-semester database & programming projects data
  const projects = [
    {
      id: 1,
      title: "Smart University Admission System",
      tech: "C# / OOP / Desktop App",
      description: "Developed a desktop software managing student registrations, complex preference-based merit calculations, and automated seat allocation using core Object-Oriented Programming concepts."
    },
    {
      id: 2,
      title: "Blood Bank Management System",
      tech: "DBMS / SQL Server / Normalization",
      description: "Designed a relational database schema optimized up to 3NF. Integrated advanced SQL queries and automated relational triggers to manage donor records and eligibility rules."
    },
    {
      id: 3,
      title: "Data Processing & Captcha Scripting",
      tech: "Python / Data Management / ML Dataset",
      description: "Built custom data scripting workflows in Python to handle GCD captcha image distributions and analyze multi-attribute global economic performance datasets."
    }
  ];

  return (
    <div className="work-section section-container" id="work">
      <div className="work-container">
        <h3 className="title" style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '2rem' }}>My Projects</h3>
        <div className="work-grid" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {projects.map((project) => (
            <div
              className="work-box"
              key={project.id}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.8rem', color: '#fff', margin: '0' }}>
                  {project.title} <MdArrowOutward style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: '#a29bfe' }} />
                </h4>
                <span style={{ fontSize: '0.9rem', color: '#a29bfe', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {project.tech}
                </span>
              </div>
              <p className="para" style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', lineHeight: '1.6', fontSize: '1.05rem' }}>
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;