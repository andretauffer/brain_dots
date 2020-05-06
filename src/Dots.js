import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Dot = styled.canvas``;

export default () => {
  const dot = useRef(null);
  useEffect(() => {
    const dotCv = dot.current;
    if (dotCv && dotCv.getContext) {
      const ctx = dotCv.getContext("2d");

      const randomP = Math.random() * 20;

      const x = randomP;
      const y = randomP;

      var circle = new Path2D();
      // circle.moveTo(x + 1, y+1);
      circle.arc(x, y, 1, 0, 2 * Math.PI);
    }
  }, []);

  return <canvas width="20" height="20"></canvas>;
};
