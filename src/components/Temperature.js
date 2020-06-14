import React from "react";
import styled from "@emotion/styled";

const TemperatureStyles = styled("div")`
  grid-column: 5 / span 1;
  grid-row: ${(props) =>
    props.temperatureLower ? "4 / span 1" : "3 / span 1"};
  justify-self: center;
  align-self: center;

  .temperature-value {
    margin: 0;
    font-size: 2em;
  }

  .celsius {
    font-size: 0.5em;
  }
`;

const Temperature = ({ temperature, temperatureLower }) => {
  return (
    <TemperatureStyles temperatureLower={temperatureLower}>
      <h3 className="temperature-value">
        {temperature}
        <sup className="celsius">{String.fromCharCode(176)}C</sup>
      </h3>
    </TemperatureStyles>
  );
};

export default Temperature;
