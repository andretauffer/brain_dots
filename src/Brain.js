import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import StyledPath from "./StyledPath";
import BrainFill from "./BrainFill";
import Connect from "./Connect";
import BrainLines from "./BrainLines";

const SvgStyled = styled.svg`
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  @media only screen and (max-width: 700px) {
    scale: 0.5;
    transform: translate(-45%, -50%) scale(0.8);
  }
`;
// ${BrainFill}:hover circle & {
//   fill: red;
//   /* animation: move-to-cursor 4s ease forwards;
//   @keyframes move-to-cursor {
//     100%{
//       transform: ;
//     }
//   } */
// }
// [50, 50]

const StyledDot = styled.circle`
  fill: #8cffa3;
  stroke: #8cffa3;
  ${SvgStyled}:hover & {
    /* fill: red; */
    /* animation: move-to-cursor 4s ease forwards;
    @keyframes move-to-cursor {
      100%{
        transform: ;
      }
    } */
  }
`;

const SpecialDot = styled.circle`
  position: fixed;
  top: var(--mouse-y);
  left: var(--mouse-x);
  fill: red;
`;

const StyledLine = styled.line`
  display: ${props => (props.disable ? "box" : "none")};
`;

export default () => {
  const [dots, setDots] = useState([]);
  const ref = useRef(null);

  const initialPoints = quantity => {
    const dotsArray = [];
    for (let i = 0; i < quantity; i++) {
      const modifierX = Math.floor(i / 12) * 250;
      const modifierY = i % 6 === 0 ? Math.floor(i / 6) * 100 : (i % 6) * 200;
      dotsArray.push({
        cx: 450 + modifierX + Math.floor(Math.random() * 200) - 400,
        cy: modifierY + Math.floor(Math.random() * 50) - 100,
        moveX: Math.floor(Math.random() * 500) - 250,
        moveY: Math.floor(Math.random() * 500) - 250,
        duration: "30s"
      });
    }
    // duration: Math.floor(Math.random() * 30) + 10 + "s"
    setDots(dotsArray);
  };

  document.addEventListener("mousemove", evt => {
    let x = evt.clientX;
    let y = evt.clientY;

    if (ref.current) {
      ref.current.style.setProperty("cy", y * 2.5 + "px");
      ref.current.style.setProperty("cx", x * 2.5 + "px");
    }
  });

  useEffect(() => {
    const container = document
      .querySelector(".svg-container")
      .getBoundingClientRect();
    const quantity = (container.width / 70) * (container.height / 70);
    initialPoints(quantity);
  }, []);

  return (
    <div>
      <SvgStyled
        className="svg-container"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1458 1334"
      >
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="blurLess">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="cut-off">
            <BrainFill />
          </clipPath>
          <pattern id="Pattern" x="0" y="0" width="1" height="1">
            {dots &&
              dots.map((dot, i) => (
                <StyledDot
                  key={`dot-${i}`}
                  id={`dot-${i}`}
                  cx={dot.cx}
                  cy={dot.cy}
                  filter="url(#blurMe)"
                  r="6"
                >
                  <animate
                    attributeName="cx"
                    values={`0;${dot.moveX};0`}
                    dur={dot.duration}
                    repeatCount="indefinite"
                    additive="sum"
                  />
                  <animate
                    attributeName="cy"
                    values={`0;${dot.moveY};0`}
                    dur={dot.duration}
                    repeatCount="indefinite"
                    additive="sum"
                  />
                </StyledDot>
              ))}
            {dots.length > 0 && <Connect dots={dots} />}
          </pattern>
        </defs>

        <BrainLines />
        <StyledPath />
        <BrainFill className="brainFill" fill="url(#stars)" />
        <rect
          width="1400"
          height="1200"
          clipPath="url(#cut-off)"
          fill="url(#Pattern)"
        />
        <svg xmlns="http://www.w3.org/2000/svg" clipPath="url(#cut-off)"></svg>
      </SvgStyled>
    </div>
  );
};
{
  /* <svg clipPath="url(#cut-off)">
  <SpecialDot
    ref={ref}
    id={`special-dot`}
    cx="10"
    cy="10"
    filter="url(#blurMe)"
    r="300"
  ></SpecialDot>
</svg> */
}
