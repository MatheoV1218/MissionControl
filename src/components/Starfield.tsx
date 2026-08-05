// components/Starfield.tsx

import { useMemo } from "react";
import "./Starfield.css";

function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 500 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random(),
        scale: Math.random() * 1.8 + 0.3,
      })),
    []
  );

  return (
    <div className="starfield">
      {stars.map((star, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            opacity: star.opacity,
            transform: `scale(${star.scale})`,
          }}
        />
      ))}
    </div>
  );
}

export default Starfield;
