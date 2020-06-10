import React from "react";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";

const ChartStyles = styled("div")`
  grid-column: 3 / span 6;
  grid-row: 4 / span 1;
  overflow: scroll;
  padding: 40px;
`;
export const Chart = ({ data }) => {
  console.log(data);
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
