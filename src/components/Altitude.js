import React from "react";
import styled from "@emotion/styled";

const AltitudeStyles = styled("div")`
  grid-column: 3 / span 1;
  grid-row: ${(props) => (props.elevationLower ? "2 / span 1" : "1 / span 1")};
  justify-self: end;
  align-self: end;
`;

const Altitude = ({ elevation, elevationLower }) => {
  return (
    <AltitudeStyles elevationLower={elevationLower}>
      <h3>{elevation}</h3>
    </AltitudeStyles>
  );
};

export default Altitude;
