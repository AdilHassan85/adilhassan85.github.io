import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

// Exporting smoother placeholder to keep layout dependencies intact
export let smoother: any = null;

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".header ul a, .navbar-logo");

    const handleScrollClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const sectionId = target.getAttribute("data-href") || target.getAttribute("href");

      if (sectionId && sectionId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(sectionId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    links.forEach((elem) => {
      elem.addEventListener("click", handleScrollClick);
    });

    return () => {
      links.forEach((elem) => {
        elem.removeEventListener("click", handleScrollClick);
      });
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="#landingDiv" data-href="#landingDiv" className="navbar-title swing-item" data-cursor="disable">
          Adil Hasan
        </a>

        <a href="mailto:juttzada517@gmail.com" className="navbar-connect swing-item" data-cursor="disable">
          juttzada517@gmail.com
        </a>

        <ul>
          <li className="swing-item">
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li className="swing-item">
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li className="swing-item">
            <a data-href="#blog" href="#blog">
              <HoverLinks text="BLOG" />
            </a>
          </li>
          <li className="swing-item">
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;