import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { path } from "./BrainPath";
import { brainFill } from "./BrainInterior";
import Dot from "./Dots";

const Canvas = styled.canvas``;

export default () => {
  const canvas = useRef(null);
  useEffect(() => {
    const cv = canvas.current;
    if (cv && cv.getContext) {
      const ctx = cv.getContext("2d");

      const brain = new Path2D(path);
      ctx.strokeStyle = "#8cffa3";
      ctx.stroke(brain);
      ctx.clip(brain);
      ctx.fill(brain);

      const brainInLines = new Path2D(brainFill);
      ctx.strokeStyle = "#8cffa341";
      ctx.stroke(brainInLines);

      var circle = new Path2D();

      for (let i = 0; i < 50; i++) {
        const randomP = 400;

        const x = Math.random() * randomP;
        const y = Math.random() * randomP;

        ctx.moveTo(x + 0.5, y);
        ctx.arc(x, y, 0.5, 0, 2 * Math.PI);

        ctx.stroke();
      }

      ctx.fillStyle = "#8cffa341";
      ctx.fillRect(0, 0, 150, 150);
      ctx.translate(75, 75);
    }
  }, []);
  return <Canvas width="400" height="400" ref={canvas} />;
};
