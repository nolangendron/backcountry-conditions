import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const center = css`
  align-self: center;
  justify-self: center;
`;
const titles = css`
  grid-row: 1 / span 1;
`;

const upper = css`
  grid-row: 2 / span 1;
`;

const lower = css`
  grid-row: 3 / span 1;
`;

const ConditionsTableStyles = styled("div")`
  margin-top: 60px;
  grid-column: 4 / span 6;
  grid-row: 3 span 1;
  align-self: start;
  justify-self: center;
  background-color: white;
  width: 650px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr 1fr 1fr;

  .elevation-title {
    grid-column: 1 / span 1;
    ${titles}
    ${center}
  }

  .elevation-upper {
    grid-column: 1 / span 1;
    ${upper}
    ${center}
  }

  .elevation-lower {
    grid-column: 1 / span 1;
    ${lower}
    ${center}
  }

  .temperature-title {
    grid-column: 2 / span 1;
    ${titles}
    ${center}
  }

  .temperature-upper {
    grid-column: 2 / span 1;
    ${upper}
    ${center}
  }

  .temperature-lower {
    grid-column: 2 / span 1;
    ${lower}
    ${center}
  }

  .snow24-title {
    grid-column: 3 / span 1;
    ${titles}
    ${center}
  }

  .snow24-upper {
    grid-column: 3 / span 1;
    ${upper}
    ${center}
  }

  .snow24-lower {
    grid-column: 3 / span 1;
    ${lower}
    ${center}
  }

  .snow48-title {
    grid-column: 4 / span 1;
    ${titles}
    ${center}
  }

  .snow48-upper {
    grid-column: 4 / span 1;
    ${upper}
    ${center}
  }

  .snow48-lower {
    grid-column: 4 / span 1;
    ${lower}
    ${center}
  }

  .snow7-title {
    grid-column: 5 / span 1;
    ${titles}
    ${center}
  }

  .snow7-upper {
    grid-column: 5 / span 1;
    ${upper}
    ${center}
  }

  .snow7-lower {
    grid-column: 5 / span 1;
    ${lower}
    ${center}
  }

  .snowBase-title {
    grid-column: 6 / span 1;
    ${titles}
    ${center}
  }

  .snowBase-upper {
    grid-column: 6 / span 1;
    ${upper}
    ${center}
  }

  .snowBase-lower {
    grid-column: 6 / span 1;
    ${lower}
    ${center}
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
}) => {
  return (
    <ConditionsTableStyles>
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
      <h6 className="wind-upper">{snowBaseUpper}</h6>
      <h6 className="wind-lower">{snowBaseLower}</h6>
    </ConditionsTableStyles>
  );
};

export default ConditionsTable;
