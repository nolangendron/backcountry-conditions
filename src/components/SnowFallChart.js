import React from "react";
import styled from "@emotion/styled";
import { Bar } from "react-chartjs-2";

const SnowFallChartStyles = styled("div")`
  grid-column: 5 / span 1;
`;
const SnowFallChart = ({ data }) => {
  console.log(data);
  return (
    <SnowFallChartStyles>
      <div className="chart">
        <Bar data={data} />
      </div>
    </SnowFallChartStyles>
  );
};

export default SnowFallChart;
