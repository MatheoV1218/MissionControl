import cyanBurst from "../assets/shapes/s2-1.png";
import purpleCluster from "../assets/shapes/s2-2.png";
import meshMotif from "../assets/shapes/s3-1.png";
import purpleSparkle from "../assets/shapes/s3-2.png";
import sparkleStack from "../assets/shapes/s4-1.png";
import ribbonOrbit from "../assets/shapes/s4-2.png";
import shootingStars from "../assets/shapes/s4-3.png";
import petalDuo from "../assets/shapes/s5-1.png";
import rainbowBurst from "../assets/shapes/s5-2.png";
import waveBlob from "../assets/shapes/s6-1.png";
import cyanSwirl from "../assets/shapes/s8-1.png";
import purpleSplat from "../assets/shapes/s9-1.png";
import "./DecorativeShapes.css";

const shapes = [
  { src: purpleSplat, left: "4%", top: "8%", size: 85, rotate: -8 },
  { src: sparkleStack, left: "22%", top: "4%", size: 95, rotate: 6 },
  { src: rainbowBurst, left: "88%", top: "6%", size: 100, rotate: -5 },
  { src: cyanBurst, left: "68%", top: "14%", size: 75, rotate: 4 },
  { src: purpleSparkle, left: "42%", top: "18%", size: 60, rotate: 10 },
  { src: meshMotif, left: "6%", top: "34%", size: 90, rotate: 0 },
  { src: cyanSwirl, left: "92%", top: "30%", size: 85, rotate: 0 },
  { src: shootingStars, left: "30%", top: "42%", size: 100, rotate: -6 },
  { src: purpleCluster, left: "78%", top: "46%", size: 90, rotate: 8 },
  { src: ribbonOrbit, left: "12%", top: "58%", size: 110, rotate: -4 },
  { src: petalDuo, left: "58%", top: "62%", size: 110, rotate: 5 },
  { src: waveBlob, left: "90%", top: "66%", size: 90, rotate: 0 },
  { src: cyanBurst, left: "36%", top: "76%", size: 70, rotate: -12 },
  { src: purpleSparkle, left: "8%", top: "84%", size: 65, rotate: 14 },
  { src: sparkleStack, left: "70%", top: "86%", size: 80, rotate: -10 },
  { src: rainbowBurst, left: "50%", top: "92%", size: 85, rotate: 8 },
];

function DecorativeShapes() {
  return (
    <div className="decorative-shapes" aria-hidden="true">
      {shapes.map((shape, i) => (
        <img
          key={i}
          src={shape.src}
          className="decorative-shape"
          style={{
            left: shape.left,
            top: shape.top,
            width: shape.size,
            transform: `rotate(${shape.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default DecorativeShapes;
