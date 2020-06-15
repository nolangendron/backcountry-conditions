import React, { useState } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Wind = styled("div")`
  grid-column: ${(props) => props.gridColumn && props.gridColumn};
  grid-row: ${(props) => props.gridRow && props.gridRow};
  justify-self: center;
  align-self: center;

  .locationArrow {
    margin-left: 20px;
    font-size: 2em;
    cursor: pointer;
  }

  .windSpeed {
    display: inline-block;

    margin-left: 20px;
    font-size: 1.2em;
  }

  .km {
    display: inline-block;
    font-size: 1em;
    margin-left: 20px;
  }
`;

export const WindChart = ({
  gridColumn,
  gridRow,
  windSpeed,
  windDirection,
}) => {
  const [rotation, setRotation] = useState({
    degree: 0,
  });
  const [speed, setSpeed] = useState({
    data: 0,
  });

  const clearState = () => {
    setRotation({
      degree: 0,
    });
    setSpeed({
      data: 0,
    });
  };

  const windDirectionLastTwoDays = (arr1, arr2) => {
    if (arr1 !== undefined) {
      for (let i = 0; i < arr1.length; i++) {
        if (i === arr1.length) {
          clearState();
        } else {
          setTimeout(function timer() {
            setRotation({
              degree: arr1[i],
            });
            setSpeed({
              data: [Math.trunc(arr2[i])],
            });
          }, i * 150);
        }
      }
    } else {
      return;
    }
  };

  return (
    <Wind gridColumn={gridColumn} gridRow={gridRow}>
      <FontAwesomeIcon
        className="locationArrow"
        transform={{ rotate: rotation.degree }}
        color="red"
        icon={faArrowUp}
        onClick={() => windDirectionLastTwoDays(windDirection, windSpeed)}
      />
      <span className="windSpeed">{speed.data && speed.data}</span>
      <span className="km">km/h</span>
    </Wind>
  );
};

export default WindChart;
