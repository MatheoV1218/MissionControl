import cyanBurst from "../assets/shapes/s2-1.png";
import purpleCluster from "../assets/shapes/s2-2.png";
import tealSparkle from "../assets/shapes/s2-3.png";
import meshMotif from "../assets/shapes/s3-1.png";
import purpleSparkle from "../assets/shapes/s3-2.png";
import sparkleStack from "../assets/shapes/s4-1.png";
import ribbonOrbit from "../assets/shapes/s4-2.png";
import shootingStars from "../assets/shapes/s4-3.png";
import petalDuo from "../assets/shapes/s5-1.png";
import waveBlob from "../assets/shapes/s6-1.png";
import cyanSwirl from "../assets/shapes/s8-1.png";
import purpleSplat from "../assets/shapes/s9-1.png";
import "./DecorativeShapes.css";

// Two tightly-stacked columns of the larger graphic shapes, pinned to the
// left/right edges. Each item overlaps the one above it slightly (negative
// margin) so the cropped transparent padding on each PNG doesn't read as a
// gap between them. The sequence repeats to run the full height of the
// viewport instead of stopping partway down.
const REPEATS = 4;

const leftColumnUnit = [
  { src: purpleSplat, size: 85 },
  { src: meshMotif, size: 90 },
  { src: ribbonOrbit, size: 110 },
  { src: petalDuo, size: 110 },
];

const rightColumnUnit = [
  { src: cyanSwirl, size: 85 },
  { src: cyanBurst, size: 75 },
  { src: purpleCluster, size: 90 },
  { src: waveBlob, size: 90 },
];

const leftColumn = Array.from({ length: REPEATS }).flatMap(() => leftColumnUnit);
const rightColumn = Array.from({ length: REPEATS }).flatMap(() => rightColumnUnit);

// Plain sparkle/star/comet motifs stay scattered loosely across the page,
// like the background starfield, instead of joining the stacked columns.
// Mixed colors (purple, teal/green, white) rather than all one hue.
const scatteredStars = [
  { src: sparkleStack, left: "22%", top: "4%", size: 95, rotate: 6 },
  { src: purpleSparkle, left: "42%", top: "18%", size: 60, rotate: 10 },
  { src: tealSparkle, left: "60%", top: "10%", size: 55, rotate: -4 },
  { src: shootingStars, left: "30%", top: "42%", size: 100, rotate: -6 },
  { src: tealSparkle, left: "48%", top: "34%", size: 60, rotate: 12 },
  { src: purpleSparkle, left: "8%", top: "84%", size: 65, rotate: 14 },
  { src: sparkleStack, left: "70%", top: "86%", size: 80, rotate: -10 },
  { src: tealSparkle, left: "36%", top: "62%", size: 50, rotate: -10 },
  { src: purpleSparkle, left: "55%", top: "76%", size: 55, rotate: 6 },
  { src: tealSparkle, left: "20%", top: "94%", size: 55, rotate: 8 },
  { src: sparkleStack, left: "45%", top: "56%", size: 80, rotate: -6 },
];

function DecorativeShapes() {
  return (
    <div className="decorative-shapes" aria-hidden="true">
      <div className="decorative-column decorative-column-left">
        {leftColumn.map((shape, i) => (
          <img
            key={i}
            src={shape.src}
            className="decorative-shape decorative-stacked"
            style={{ width: shape.size, marginTop: i === 0 ? 0 : -10 }}
          />
        ))}
      </div>

      <div className="decorative-column decorative-column-right">
        {rightColumn.map((shape, i) => (
          <img
            key={i}
            src={shape.src}
            className="decorative-shape decorative-stacked"
            style={{ width: shape.size, marginTop: i === 0 ? 0 : -10 }}
          />
        ))}
      </div>

      {scatteredStars.map((shape, i) => (
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
