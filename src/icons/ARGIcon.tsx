import React from 'react';

const ARGIcon = () => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle id="Ellipse 2" cx="12" cy="12.5" r="12" fill="url(#pattern0_231_75245)" />
      <defs>
        <pattern id="pattern0_231_75245" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref ="#image0_231_75245" transform="scale(0.0149254)" />
        </pattern>
        <image
          id="image0_231_75245"
          width="67"
          height="67"
         xlinkHref ="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default ARGIcon;
