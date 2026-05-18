import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const splitText = () => {
  console.log("Standard GSAP initialized.");
};

// Yeh line add karne se 'default export' ka crash khatam ho jayega
export default splitText;