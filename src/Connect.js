import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledPolyline = styled.polyline`
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: fill-in 7s linear alternate infinite;

  @keyframes fill-in {
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: -500;
    }
  }
`;

export default dots => {
  const [lines, setLines] = useState([]);

  const randomizer = () => {
    const randomPoint = Math.floor(Math.random() * dots.dots.length);
    return dots.dots[randomPoint];
  };

  const randomStart = (previous = 0) => {
    const randomStart = Math.floor(Math.random() * 5);
    return previous + randomStart;
  };

  const randomLength = () => {
    return Math.floor(Math.random() * 6);
  };

  const pickClosePoint = point => {
    const { cx, cy } = point;
    const secondPoint = dots.dots.find(dot =>
      disableLine({ x1: cx, x2: dot.cx, y1: cy, y2: dot.cy })
    );
    return secondPoint;
  };

  const disableLine = ({ x1, x2, y1, y2 }) => {
    const x = x1 - x2 < 0 ? -(x1 - x2) : x1 - x2;
    const y = y1 - y2 < 0 ? -(y1 - y2) : y1 - y2;

    return x < 150 && y < 150;
  };

  const addLines = quantity => {
    let newLines = [];
    lines.length > quantity && lines.splice(1, quantity);
    for (let i = 0; i < quantity; i++) {
      const initialPoint = randomizer();
      let line = {
        polyline: `${initialPoint.cx},${initialPoint.cy}`,
        polylineEnd: `${initialPoint.cx +
          initialPoint.moveX},${initialPoint.cy + initialPoint.moveY}`,
        duration: initialPoint.duration,
        begin: `${randomStart()}s`,
        points: [
          {
            x: initialPoint.cx,
            y: initialPoint.cy,
            xm: initialPoint.moveX,
            ym: initialPoint.moveY,
            dur: initialPoint.duration
          }
        ]
      };
      for (let l = 1; l <= randomLength(); l++) {
        const nextPoint = pickClosePoint({
          cx: line.points[l - 1].x,
          cy: line.points[l - 1].y
        });
        line.points.push({
          begin: `${randomStart()}s`,
          x: nextPoint.cx,
          y: nextPoint.cy,
          xm: nextPoint.moveX,
          ym: nextPoint.moveY,
          dur: nextPoint.duration
        });
        line.polyline = `${line.polyline} ${nextPoint.cx},${nextPoint.cy}`;
        line.polylineEnd = `${line.polylineEnd} ${nextPoint.cx +
          nextPoint.moveX},${nextPoint.cy + nextPoint.moveY}`;
      }

      newLines.push(line);
    }
    setLines([...lines, ...newLines]);
  };

  useEffect(() => addLines(50), []);

  return lines.map((li, i) => (
    <StyledPolyline
      key={`poly-${i}`}
      fill="transparent"
      stroke="transparent"
      strokeWidth="2"
      filter="url(#blurLess)"
    >
      <animate
        attributeName="points"
        values={`${li.polyline};${li.polylineEnd};${li.polyline}`}
        dur={li.duration}
        repeatCount="indefinite"
        additive="sum"
      />
      <animate
        id={`animation-${i}`}
        attributeName="stroke"
        values="transparent;#8cffa3;#8cffa3;#8cffa3;transparent"
        dur="10s"
        repeatCount="indefinite"
        additive="sum"
        begin={li.begin}
      />
    </StyledPolyline>
  ));
};

// if I manage to give the animation atributes to the smil instead of css I could make them start in different times
{
  /* <animate
  attributeName="strokeDashoffset"
  from="1000"
  to="0"
  dur={li.duration}
  begin={li.begin}
  fill="freeze"
  repeatCount="indefinite"
  additive="sum"
/> */
}

// lines solution

// const addLines = quantity => {
//   let newLines = [];
//   lines.length > quantity && lines.splice(1, quantity);
//   for (let i = 0; i < quantity; i++) {
//     const initialPoint = randomizer();
//     const secondPoint = pickClosePoint(initialPoint);
//     const thirtPoint = pickClosePOint(secondPoint);
//     const fourthPoint = pickClosePoint(thirdPoint);
//     const line = {
//       initialX: initialPoint.cx,
//       initialY: initialPoint.cy,
//       secondX: secondPoint.cx,
//       secondY: secondPoint.cy,
//       initialMoveX: initialPoint.moveX,
//       initialMoveY: initialPoint.moveY,
//       secondMoveX: secondPoint.moveX,
//       secondMoveY: secondPoint.moveY,
//       initialTime: initialPoint.duration,
//       secondTime: secondPoint.duration,
//       begin: `${randomStart()}s`
//     };
//     newLines.push(line);
//   }
//   setLines([...lines, ...newLines]);
// };
// <StyledLine
//   id={`line-${i}`}
//   x1={li.initialX}
//   y1={li.initialY}
//   x2={li.secondX}
//   y2={li.secondY}
//   stroke="transparent"
//   pathLength="20"
//   time={li.secondTime}
// >
//   <animate
//     attributeName="x1"
//     values={`0;${li.initialMoveX};0`}
//     dur={li.initialTime}
//     repeatCount="indefinite"
//     additive="sum"
//   />
//   <animate
//     attributeName="y1"
//     values={`0;${li.initialMoveY};0`}
//     dur={li.initialTime}
//     repeatCount="indefinite"
//     additive="sum"
//   />
//   <animate
//     attributeName="x2"
//     values={`0;${li.secondMoveX};0`}
//     dur={li.secondTime}
//     repeatCount="indefinite"
//     additive="sum"
//   />
//   <animate
//     attributeName="y2"
//     values={`0;${li.secondMoveY};0`}
//     dur={li.secondTime}
//     repeatCount="indefinite"
//     additive="sum"
//   />
//   <animate
//     id={`animation-${i}`}
//     attributeName="stroke-width"
//     values="0;0.2;0"
//     dur="5s"
//     repeatCount="indefinite"
//     additive="sum"
//     begin={li.begin}
//   />
//   <animate
//     id={`animation-${i}`}
//     attributeName="stroke"
//     values="transparent;transparent;#8cffa3;transparent;transparent"
//     dur="5s"
//     repeatCount="indefinite"
//     additive="sum"
//     begin={li.begin}
//   />
// </StyledLine>
