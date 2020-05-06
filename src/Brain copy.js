import React, { useRef, useEffect, useState } from "react";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import StyledPath from "./StyledPath";
import BrainFill from "./BrainFill";
import Connect from "./Connect";
import BrainLines from "./BrainLines";

const SvgStyled = styled.svg`
  width: 600px;
  height: 400px;
  ${BrainFill}:hover circle & {
    fill: red;
    /* animation: move-to-cursor 4s ease forwards;
    @keyframes move-to-cursor {
      100%{
        transform: ;
      }
    } */
  }
`;
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
  display: ${(props) => (props.disable ? "box" : "none")};
`;

export default () => {
  const [dots, setDots] = useState([]);
  const ref = useRef(null);

  const initialPoints = (width, height) => {
    const countX = width / 50;
    const countY = height / 50;
    const dotsArray = [];
    for (let i = 0; i < countX * countY * 2; i++) {
      const modifierX = Math.floor(i / 12) * 100;
      const modifierY = i % 12 === 0 ? (i / 12) * 50 : (i % 12) * 200;
      dotsArray.push({
        cx: 400 + modifierX + Math.floor(Math.random() * 200) - 400,
        cy: modifierY + Math.floor(Math.random() * 200) - 400,
        moveX: Math.floor(Math.random() * 500) - 250,
        moveY: Math.floor(Math.random() * 500) - 250,
        duration: Math.floor(Math.random() * 30) + 10 + "s",
      });
    }
    setDots(dotsArray);
  };

  document.addEventListener("mousemove", (evt) => {
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
    const width = container.width;
    const height = container.height;
    initialPoints(width, height);
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
          <clipPath id="cut-off">
            <BrainFill />
          </clipPath>
        </defs>

        <BrainLines />
        <StyledPath />
        <BrainFill className="brainFill" />
        {/* <rect width="1600" height="1400" clipPath="url(#cut-off)" /> */}
        {/* <svg clipPath="url(#cut-off)">
          <SpecialDot
            ref={ref}
            id={`special-dot`}
            cx="10"
            cy="10"
            filter="url(#blurMe)"
            r="300"
          ></SpecialDot>
        </svg> */}
        <svg
          // viewBox="0 200 1458 1334"
          xmlns="http://www.w3.org/2000/svg"
          clipPath="url(#cut-off)"
        >
          {dots &&
            dots.map((dot, i) => (
              <svg clipPath="url(#cut-off)" height="100" width="100">
                <StyledDot
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
              </svg>
            ))}
          {dots.length > 0 && <Connect dots={dots} />}
        </svg>
      </SvgStyled>
    </div>
  );
};
