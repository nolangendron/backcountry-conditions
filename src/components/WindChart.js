import React, { useState } from "react";
import styled from "@emotion/styled";
import { Doughnut } from "react-chartjs-2";
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
    margin-left: 20px;
    font-size: 1.2em;
  }

  .km {
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
  const [chartData, setChartData] = useState({
    data: [0, 360],
  });

  const data = {
    datasets: [
      {
        labels: ["Red", "Blue"],
        data: chartData.data,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };

  const clearState = () => {
    setRotation({
      degree: 0,
    });
    setChartData({
      data: [0, 360],
    });
  };

  const windDirectionLastTwoDays = (arr1, arr2) => {
    if (arr1 !== undefined) {
      for (let i = 0; i < arr1.length + 1; i++) {
        if (i === arr1.length + 1) {
          clearState();
        } else {
          setTimeout(function timer() {
            setRotation({
              degree: arr1[i],
            });
            setChartData({
              data: [arr2[i] * 5, 360],
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
      <span className="windSpeed">
        {data.datasets[0].data[0] ? data.datasets[0].data[0] / 5 : 0}
      </span>
      <span className="km">km/h</span>
    </Wind>
  );
};

export default WindChart;
