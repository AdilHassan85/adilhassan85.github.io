import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    // Added clear inline styles to prevent section overlapping
    <div className="contact-section section-container" id="contact" style={{ paddingTop: '8rem', paddingBottom: '4rem', clear: 'both' }}>
      <div className="contact-container">
        <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:juttzada517@gmail.com" data-cursor="disable">
                juttzada517@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+923024595460" data-cursor="disable">
                +92 302 4595460
              </a>
            </p>
          </div>

          <div className="contact-box">
            <h4>Social</h4>
            <a href="https://github.com" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              Github <MdArrowOutward />
            </a>
            <a href="https://www.linkedin.com/in/adil-hassan-429616418/" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              Linkedin <MdArrowOutward />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              Twitter <MdArrowOutward />
            </a>
            <a href="https://www.instagram.com/rao_x_adi?igsh=MW9hY2RpNzFoYnAyYg==" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
              Instagram <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box" style={{ marginTop: '2rem' }}>
            <h2>
              Designed and Developed <br /> by <span>Adil Hasan</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;