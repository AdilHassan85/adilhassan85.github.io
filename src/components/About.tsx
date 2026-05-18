import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a Computer Engineering student currently in my 2nd semester, focusing on software
          development, database architectures, and hardware-software integration. On the programming
          side, I actively use C# to master Object-Oriented Programming (OOP) concepts, building
          structured application logic and working on smart desktop systems. Alongside C#, I use
          **Python** for data processing, scripting, and handling custom image and performance datasets.
          <br /><br />
          My core technical interest lies heavily in **Database Management Systems (DBMS)**.
          I specialize in writing structured SQL queries, designing clean relational schemas, implementing
          automated database triggers, and applying strict normalization techniques (1NF, 2NF, 3NF)
          to eliminate data redundancy and optimize system backend efficiency.
          <br /><br />
          Outside of my engineering labs, code editors, and relational tables, I balance my technical
          journey with my two ultimate passions: precision car drifting and horse riding—hobbies that
          keep my discipline sharp, my reflexes fast, and my focus continuous.
        </p>
      </div>
    </div>
  );
};

export default About;