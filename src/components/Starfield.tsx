// components/Starfield.tsx

import "./Starfield.css";

function Starfield() {
  const stars = Array.from({ length: 500 });

  return (
    <div className="starfield">
      {stars.map((_, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random(),
            transform: `scale(${Math.random() * 1.8 + 0.3})`,
          }}
        />
      ))}
    </div>
  );
}

export default Starfield;