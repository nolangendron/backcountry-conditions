import React from "react";
import styled from "@emotion/styled";

const Container = styled("h1")`
  grid-column: 4 / span 6;
  grid-row: 1 / span 1;
  align-self: end;
  justify-self: center;

  .char {
    position: relative;
    animation: move-text-color 0.1s forwards;
    opacity: 0;
  }

  @keyframes move-text-color {
    0% {
      opacity: 1;
      color: #3e5c76;
    }

    100% {
      opacity: 1;
    }
  }
`;

const SplitText = ({ copy, role, count }) => {
  return (
    <Container>
      <span aria-label={copy} role={role}>
        {copy.split("").map(function (char, index) {
          let style = { animationDelay: count + index / 10 + "s" };
          return (
            <span className="char" aria-hidden="true" key={index} style={style}>
              {char}
            </span>
          );
        })}
      </span>
    </Container>
  );
};

export default SplitText;
