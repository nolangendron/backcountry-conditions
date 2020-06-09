import React from "react";
import styled from "@emotion/styled";

const AltitudeStyles = styled("div")`
  grid-column: 3 / span 1;
  grid-row: ${(props) => (props.elevationLower ? "3 / span 1" : "2 / span 1")};
  justify-self: center;
  align-self: center;

  .elevation {
    font-size: 1.5em;
  }
`;

const Altitude = ({ elevation, elevationLower }) => {
  return (
    <AltitudeStyles elevationLower={elevationLower}>
      <h3 className="elevation">{elevation}</h3>
    </AltitudeStyles>
  );
};

export default Altitude;