import React from "react";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";

const ChartStyles = styled("div")`
  grid-column: ${(props) => props.gridColumn && props.gridColumn};
  grid-row: ${(props) => props.gridRow && props.gridRow};
  padding-bottom: 10px;
`;
export const Chart = ({ data, gridColumn, gridRow }) => {
  return (
    <ChartStyles gridColumn={gridColumn} gridRow={gridRow}>
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: "Season Snowfall",
          },
        }}
      />
    </ChartStyles>
  );
};
