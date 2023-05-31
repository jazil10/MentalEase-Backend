import React from "react";
import image from "../images/heroimg.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Your Mental Health, <br />
          Our Responsibility
        </h1>
        <p>
        Welcome to MentalEase - Your Trusted Mental Health Companion
We understand that mental well-being is essential for a fulfilling life. At MentalEase, we are dedicated to providing professional and compassionate mental health consultation services. Whether you're seeking support, guidance, or simply looking for a safe space to express yourself, we're here to help.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
