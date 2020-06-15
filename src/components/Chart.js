import React from "react";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";

const ChartStyles = styled("div")`
  grid-column: 1 / span 3;
  grid-row: 15 / span 1;
  padding-bottom: 10px;
`;
export const Chart = ({ data }) => {
  return (
    <ChartStyles>
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
