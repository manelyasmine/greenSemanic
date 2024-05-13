import React, { useState } from 'react';

import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    // Additional logic for toggling theme
  };

  return (
    <label htmlFor="theme" className="theme">
      <span className="theme__toggle-wrap">
        <input
          id="theme"
          className="theme__toggle"
          type="checkbox"
          role="switch"
          name="theme"
          value="dark"
          checked={isDarkTheme}
          onChange={handleThemeToggle}
        />
        <span className="theme__fill"></span>
        <span className="theme__icon">
          {[...Array(9)].map((_, index) => (
            <span key={index} className="theme__icon-part"></span>
          ))}
        </span>
      </span>
    </label>
  );
};

export default ThemeToggle;
