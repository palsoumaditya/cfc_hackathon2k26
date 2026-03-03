import React, { useEffect, useState } from "react";
import "../styles/hero.css";
import bgImage from "../assets/st-hero-bg.png";
import { Button } from "@mui/material";
import logo from "../assets/st-text-hero.png";

const Hero = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const calculateTimeLeft = () => {
    const difference = +new Date("2026-04-10") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <section id="home">
      <div
        className="hero-container"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay" />

        <div className="hero-content">
          <img src={logo} alt="Hack The Upside Down" className="hero-logo" />

          <p className="tagline fade-in-up delay-1">
            Enter the Upside Down of Innovation
          </p>

          <p className="time fade-in-up delay-2">
            April 10 - 11, 2026 • NSHM KNOWLEDGE CAMPUS, DURGAPUR
          </p>

          <div className="countdown fade-in-up delay-3">
            <div>
              <h2>{timeLeft.days}</h2>
              <span>DAYS</span>
            </div>
            <div>
              <h2>{timeLeft.hours}</h2>
              <span>HOURS</span>
            </div>
            <div>
              <h2>{timeLeft.minutes}</h2>
              <span>MINUTES</span>
            </div>
            <div>
              <h2>{timeLeft.seconds}</h2>
              <span>SECONDS</span>
            </div>
          </div>

          <div className="hero-buttons fade-in-up delay-3">
            <div
              className="apply-button"
              data-hackathon-slug="code-for-change-2026"
              data-button-theme="dark"
              style={{ height: "44px", width: "312px" }}
            ></div>

            {/* Keep schedule button */}
            <Button
              variant="outlined"
              className="view-schedule"
              href="#timeline"
            >
              View Schedule
            </Button>
          </div>

          <br />
          <h1 className="inverted-text">ɥɐɔʞ ʇɥǝ npsᴉpǝ poʍu</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
