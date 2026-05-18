import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

// Exporting smoother placeholder to keep layout dependencies intact
export let smoother: any = null;

const Navbar = () => {
  useEffect(() => {
    // 🚀 CRASH FIX: Finding all menu links and applying native smooth scroll
    const links = document.querySelectorAll(".header ul a, .navbar-logo");

    const handleScrollClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const sectionId = target.getAttribute("data-href") || target.getAttribute("href");

      if (sectionId && sectionId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(sectionId);

        if (targetSection) {
          // Native browser smooth scrolling (100% crash proof)
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    links.forEach((elem) => {
      elem.addEventListener("click", handleScrollClick);
    });

    // Cleanup listeners on unmount
    return () => {
      links.forEach((elem) => {
        elem.removeEventListener("click", handleScrollClick);
      });
    };
  }, []);

  return (
    <>
      <div className="header">
        {/* Logo Text */}
        <a href="#landingDiv" data-href="#landingDiv" className="navbar-title" data-cursor="disable">
          Adil Hasan
        </a>

        {/* Email Link */}
        <a
          href="mailto:juttzada517@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          juttzada517@gmail.com
        </a>

        {/* Navigation Menu */}
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
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