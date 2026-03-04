import { motion, useAnimate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import sponsorsData from "../data/sponsorsData";
import { SiGoogle, SiTiktok, SiSpotify } from "react-icons/si";
import { FaDiscord } from "react-icons/fa";
import {
  Github,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Code,
} from "lucide-react";
import "../styles/sponsors.css";

const titleVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({
  Icon,
  href,
  imgSrc,
  className,
  label,
  containerClassName,
}) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.target.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative grid h-20 w-full place-content-center sm:h-28 md:h-36 text-white bg-[var(--st-bg-card)] hover:text-[var(--st-red)] border border-[var(--st-border)] transition-colors duration-300 ${containerClassName || ""}`}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={label || "custom icon"}
          className={
            className ??
            "max-h-10 sm:max-h-16 md:max-h-20 object-contain brightness-100 grayscale"
          }
        />
      ) : (
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      )}

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-[var(--st-red)] text-white transition-colors duration-300"
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={label || "custom icon hover"}
            className={
              className ??
              "max-h-10 sm:max-h-16 md:max-h-20 object-contain brightness-0 invert"
            }
          />
        ) : (
          <Icon className="text-xl sm:text-3xl md:text-4xl" />
        )}
      </div>
    </a>
  );
};

export default function Sponsors() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const tiers = [
    { key: "platinum", label: "PLATINUM SPONSORS", color: "var(--st-cyan)" },
    { key: "gold", label: "GOLD SPONSORS", color: "#ffd700" },
    { key: "silver", label: "SILVER SPONSORS", color: "#e8e8e8" },
  ];

  return (
    <section className="st-section sponsors-section" id="sponsors" ref={ref}>
      <div className="st-container">
        <motion.h2
          className="st-section-title"
          variants={titleVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          PARTNERS FROM THE OTHER SIDE
        </motion.h2>

        <div className="sponsor-tiers-container">
          {tiers.map((tier) => (
            <div key={tier.key} className="sponsor-tier">
              <h3 className="sponsor-tier-label" style={{ color: tier.color }}>
                {tier.label}
              </h3>
              <div className="sponsor-tier-underline"></div>

              <div className="sponsor-grid-centered">
                {sponsorsData[tier.key].map((sponsor, idx) => (
                  <div key={idx} className="sponsor-card-new shadow-new">
                    {sponsor.link ? (
                      <a
                        href={sponsor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={sponsor.logo}
                          alt={sponsor.alt || sponsor.name}
                          className="sponsor-logo-img"
                          style={{ maxHeight: "60px", objectFit: "contain" }}
                        />
                      </a>
                    ) : (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.alt || sponsor.name}
                        className="sponsor-logo-img"
                        style={{ maxHeight: "60px", objectFit: "contain" }}
                      />
                    )}
                    <span className="sponsor-name-tooltip">{sponsor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
