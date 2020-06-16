import React from "react";
import styled from "@emotion/styled";
import { colors } from "../styles/index";
import { css } from "@emotion/core";
import WindChart from "./WindChart.js";
import { Chart } from "./Chart.js";

const center = css`
  align-self: center;
  justify-self: center;
`;

const titles = css`
  grid-row: 1 / span 1;
`;

const upper = css`
  grid-row: 3 / span 1;
`;

const lower = css`
  grid-row: 5 / span 1;
`;

const line = css`
  grid-column: 1 / span 8;
  background-color: ${colors.secondary};
  margin: 0;
`;

const ConditionsTableStyles = styled("div")`
  margin-top: 60px;
  margin-bottom: 20px;
  grid-column: 4 / span 6;
  grid-row: 3 / span 1;
  align-self: start;
  justify-self: center;
  background-color: ${colors.tableBackground};
  width: 650px;
  height: auto;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 60px 1px 60px 1px 60px 1px 1fr;

  .title {
    ${titles}
    ${center}
  }

  .elevation-upper {
    ${upper}
    ${center}
  }

  .elevation-lower {
    ${lower}
    ${center}
  }

  .wind-title {
    grid-column: 7 / span 2;
    ${titles}
    ${center}
  }

  .line-one {
    grid-row: 2 / span 1;
    ${line}
  }

  .line-two {
    grid-row: 4 / span 1;
    ${line}
  }

  .line-three {
    grid-row: 6 / span 1;
    ${line}
  }
`;

const ConditionsTable = ({
  elevationUpper,
  elevationLower,
  temperatureUpper,
  temperatureLower,
  snow24Upper,
  snow24Lower,
  snow48Upper,
  snow48Lower,
  snow7Upper,
  snow7Lower,
  snowBaseUpper,
  snowBaseLower,
  windSpeedUpper,
  windDirectionUpper,
  windSpeedLower,
  windDirectionLower,
  chartData,
}) => {
  return (
    <ConditionsTableStyles>
      <hr className="line-one"></hr>
      <hr className="line-two"></hr>
      <hr className="line-three"></hr>
      <h5 className="title">Elevation</h5>
      <h6 className="elevation-upper">{elevationUpper}</h6>
      <h6 className="elevation-lower">{elevationLower}</h6>
      <h5 className="title">Temperature</h5>
      <h6 className="elevation-upper">
        {temperatureUpper}
        <sup className="celsius">{String.fromCharCode(176)}C</sup>
      </h6>
      <h6 className="elevation-lower">
        {temperatureLower}
        <sup className="celsius">{String.fromCharCode(176)}C</sup>
      </h6>
      <h5 className="title">24hrs</h5>
      <h6 className="elevation-upper">{snow24Upper}cm</h6>
      <h6 className="elevation-lower">{snow24Lower}cm</h6>
      <h5 className="title">48hrs</h5>
      <h6 className="elevation-upper">{snow48Upper}cm</h6>
      <h6 className="elevation-lower">{snow48Lower}cm</h6>
      <h5 className="title">7day</h5>
      <h6 className="elevation-upper">{snow7Upper}cm</h6>
      <h6 className="elevation-lower">{snow7Lower}cm</h6>
      <h5 className="title">Base</h5>
      <h6 className="elevation-upper">{snowBaseUpper}cm</h6>
      <h6 className="elevation-lower">{snowBaseLower}cm</h6>
      <h5 className="title">Wind</h5>
      <WindChart
        gridColumn={"7 / span 2"}
        gridRow={"3 / span 1"}
        windSpeed={windSpeedUpper && windSpeedUpper}
        windDirection={windDirectionUpper && windDirectionUpper}
      />
      <WindChart
        gridColumn={"7 / span 2"}
        gridRow={"5 / span 1"}
        windSpeed={windSpeedLower && windSpeedLower}
        windDirection={windDirectionLower && windDirectionLower}
      />
      <Chart
        gridColumn={"1 / span 8"}
        gridRow={"7 / span 1"}
        data={chartData && chartData}
      />
    </ConditionsTableStyles>
  );
};

export default ConditionsTable;
