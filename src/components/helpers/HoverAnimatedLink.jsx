import React, { useState } from "react";
import PropTypes from "prop-types";
import { HashLink } from "react-router-hash-link";

const HoverAnimatedLink = ({
  text,
  className = "",
  link = false,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;

    if (isTouchDevice) {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 1000); // vuelve al estado original tras 1s
    }
  };

  const baseClass = "block transition-transform duration-200";
  const activeClass = "-translate-y-full";

  return link ? (
    <HashLink
      {...props}
      onClick={handleToggle}
      className={`relative inline-block overflow-hidden group h-full ${className}`}
    >
      <span
        className={`${baseClass} ${
          isActive ? activeClass : ""
        } group-hover:-translate-y-full leading-normal`}
      >
        {text}
      </span>
      <span
        className={`absolute top-full left-0 w-full ${baseClass} duration-200 ${
          isActive ? activeClass : ""
        } group-hover:-translate-y-full leading-normal`}
      >
        {text}
      </span>
    </HashLink>
  ) : (
    <a
      {...props}
      onClick={handleToggle}
      className={`relative inline-block overflow-hidden group ${className}`}
    >
      <span
        className={`${baseClass} ${
          isActive ? activeClass : ""
        } group-hover:-translate-y-full`}
      >
        {text}
      </span>
      <span
        className={`absolute top-full left-0 w-full ${baseClass} duration-200 ${
          isActive ? activeClass : ""
        } group-hover:-translate-y-full`}
      >
        {text}
      </span>
    </a>
  );
};

HoverAnimatedLink.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default HoverAnimatedLink;
