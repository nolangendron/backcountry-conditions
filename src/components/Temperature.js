import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { FaTemperatureLow } from "react-icons/fa";

const TemperatureStyles = styled("div")`
  grid-column: 4 / span 1;
  grid-row: ${(props) =>
    props.temperatureLower ? "2 / span 1" : "1 / span 1"};
  justify-self: end;
  align-self: end;

  .temperature-value {
    font-size: 2.5em;
  }

  .celsius {
    font-size: 0.5em;
  }
`;

const Temperature = ({ temperature, temperatureLower }) => {
  return (
    <TemperatureStyles temperatureLower={temperatureLower}>
      {temperatureLower ? null : <FaTemperatureLow size="2.5em" />}
      <h3 className="temperature-value">
        {temperature}
        <sup className="celsius">{String.fromCharCode(176)}C</sup>
      </h3>
    </TemperatureStyles>
  );
};

export default Temperature;
