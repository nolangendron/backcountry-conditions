import React from "react";
import styled from "@emotion/styled";
import { BarChart, Bar, XAxis } from "recharts";

const SnowFallChartStyles = styled("div")`
  grid-column: 5 / span 1;
  grid-row: 1 / span 1;
`;
const SnowFallChart = ({ data }) => {
  return (
    <SnowFallChartStyles>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <Bar dataKey="snow" fill="#8884d8" />
      </BarChart>
    </SnowFallChartStyles>
  );
};

export default SnowFallChart;
