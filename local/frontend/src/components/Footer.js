import React from "react";
import "../styles/Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 My Basketball League. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service | Contact Us</p>
      </div>
      <div className="footer-social">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>{" "}
        |
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>{" "}
        |
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
    </footer>
  );
};
export default Footer;
