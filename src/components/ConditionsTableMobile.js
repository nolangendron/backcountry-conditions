import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { colors } from "../styles/index";
import WindChart from "./WindChart.js";
import { Chart } from "./Chart.js";

const center = css`
  align-self: center;
  justify-self: center;
`;
const titles = css`
  grid-column: 1 / span 1;
`;

const upper = css`
  grid-column: 3 / span 1;
`;

const lower = css`
  grid-column: 2 / span 1;
`;

const line = css`
  grid-column: 1 / span 3;
  background-color: ${colors.secondary};
  margin: 0;
`;

const ConditionsTableMobileStyles = styled("div")`
  margin-top: 60px;
  margin-bottom: 20px;
  grid-column: 1 / span 12;
  grid-row: 3 / span 1;
  align-self: start;
  justify-self: center;
  background-color: ${colors.tableBackground};
  width: 360px;
  height: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 60px 1px 60px 1px 60px 1px 60px 1px 60px 1px 60px 1px 60px 1px 1fr;

  .elevation-title {
    grid-row: 1 / span 1;
    ${titles}
    ${center}
  }

  .elevation-upper {
    grid-row: 1 / span 1;
    ${upper}
    ${center}
  }

  .elevation-lower {
    grid-row: 1 / span 1;
    ${lower}
    ${center}
  }

  .temperature-title {
    grid-row: 3 / span 1;
    ${titles}
    ${center}
  }

  .temperature-upper {
    grid-row: 3 / span 1;
    ${upper}
    ${center}
  }

  .temperature-lower {
    grid-row: 3 / span 1;
    ${lower}
    ${center}
  }

  .snow24-title {
    grid-row: 5 / span 1;
    ${titles}
    ${center}
  }

  .snow24-upper {
    grid-row: 5 / span 1;
    ${upper}
    ${center}
  }

  .snow24-lower {
    grid-row: 5 / span 1;
    ${lower}
    ${center}
  }

  .snow48-title {
    grid-row: 7 / span 1;
    ${titles}
    ${center}
  }

  .snow48-upper {
    grid-row: 7 / span 1;
    ${upper}
    ${center}
  }

  .snow48-lower {
    grid-row: 7 / span 1;
    ${lower}
    ${center}
  }

  .snow7-title {
    grid-row: 9 / span 1;
    ${titles}
    ${center}
  }

  .snow7-upper {
    grid-row: 9 / span 1;
    ${upper}
    ${center}
  }

  .snow7-lower {
    grid-row: 9 / span 1;
    ${lower}
    ${center}
  }

  .snowBase-title {
    grid-row: 11 / span 1;
    ${titles}
    ${center}
  }

  .snowBase-upper {
    grid-row: 11 / span 1;
    ${upper}
    ${center}
  }

  .snowBase-lower {
    grid-row: 11 / span 1;
    ${lower}
    ${center}
  }

  .wind-title {
    grid-row: 13 / span 1;
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

  .line-four {
    grid-row: 8 / span 1;
    ${line}
  }

  .line-five {
    grid-row: 10 / span 1;
    ${line}
  }

  .line-six {
    grid-row: 12 / span 1;
    ${line}
  }

  .line-seven {
    grid-row: 14 / span 1;
    ${line}
  }
`;

const ConditionsTableMobile = ({
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
    <ConditionsTableMobileStyles>
      <hr className="line-one"></hr>
      <hr className="line-two"></hr>
      <hr className="line-three"></hr>
      <hr className="line-four"></hr>
      <hr className="line-five"></hr>
      <hr className="line-six"></hr>
      <hr className="line-seven"></hr>
      <h5 className="elevation-title">Elevation</h5>
      <h6 className="elevation-upper">{elevationUpper}</h6>
      <h6 className="elevation-lower">{elevationLower}</h6>
      <h5 className="temperature-title">Temperature</h5>
      <h6 className="temperature-upper">
        {temperatureUpper}
        <sup className="celsius">{String.fromCharCode(176)}C</sup>
      </h6>
      <h6 className="temperature-lower">
        {temperatureLower}
        <sup className="celsius">{String.fromCharCode(176)}C</sup>
      </h6>
      <h5 className="snow24-title">24hrs</h5>
      <h6 className="snow24-upper">{snow24Upper}cm</h6>
      <h6 className="snow24-lower">{snow24Lower}cm</h6>
      <h5 className="snow48-title">48hrs</h5>
      <h6 className="snow48-upper">{snow48Upper}cm</h6>
      <h6 className="snow48-lower">{snow48Lower}cm</h6>
      <h5 className="snow7-title">7day</h5>
      <h6 className="snow7-upper">{snow7Upper}cm</h6>
      <h6 className="snow7-lower">{snow7Lower}cm</h6>
      <h5 className="snowBase-title">Base</h5>
      <h6 className="snowBase-upper">{snowBaseUpper}cm</h6>
      <h6 className="snowBase-lower">{snowBaseLower}cm</h6>
      <h5 className="wind-title">Wind</h5>
      <WindChart
        gridColumn={"3 / span 1"}
        gridRow={"12 / span 3"}
        windSpeed={windSpeedUpper && windSpeedUpper}
        windDirection={windDirectionUpper && windDirectionUpper}
      />
      <WindChart
        gridColumn={"2 / span 1"}
        gridRow={"12 / span 2"}
        windSpeed={windSpeedLower && windSpeedLower}
        windDirection={windDirectionLower && windDirectionLower}
      />
      <Chart
        gridColumn={"1 / span 3"}
        gridRow={"15 / span 1"}
        data={chartData && chartData}
      />
    </ConditionsTableMobileStyles>
  );
};

export default ConditionsTableMobile;
