import React from "react";
import styled from "@emotion/styled";
import { Bar } from "react-chartjs-2";

const SnowFallChartStyles = styled("div")`
  grid-column: 5 / span 1;
  grid-row: 1 / span 1;
`;
const SnowFallChart = ({ data }) => {
  console.log(data);
  return (
    <SnowFallChartStyles>
      <Bar
        data={data}
        width={"80%"}
        height={"80%"}
        options={{
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                display: false,
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </SnowFallChartStyles>
  );
};

export default SnowFallChart;
