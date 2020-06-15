import React from "react";
import styled from "@emotion/styled";

const AltitudeStyles = styled("h5")`
  grid-column: 1 / span 1;
  grid-row: ${(props) => (props.elevationLower ? "3 / span 1" : "2 / span 1")};
  justify-self: center;
  align-self: center;
  font-weight: 300;
`;

const Altitude = ({ elevation, elevationLower }) => {
  return (
    <AltitudeStyles elevationLower={elevationLower}>{elevation}</AltitudeStyles>
  );
};

export default Altitude;
