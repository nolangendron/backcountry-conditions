import React from "react";
import styled from "@emotion/styled";

const TemperatureStyles = styled("div")`
  grid-column: 4 / span 1;
  grid-row: ${(props) =>
    props.temperatureLower ? "2 / span 1" : "1 / span 1"};
  justify-self: end;
  align-self: end;
`;

const Temperature = ({ temperature, temperatureLower }) => {
  return (
    <TemperatureStyles temperatureLower={temperatureLower}>
      <h3>{temperature}</h3>
    </TemperatureStyles>
  );
};

export default Temperature;
