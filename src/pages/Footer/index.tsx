import React from 'react';
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>
        Weather App Is Developed & Desgined by Ahmad Said Husirami. Learn more{" "}
        <a href="https://github.com/AhmadHusirami" target='_blank'>
          here
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
