import React from "react";
import styled from "@emotion/styled";

const SnowConditionsStyles = styled("div")`
  grid-column: ${(props) => props.gridColumn && props.gridColumn};
  grid-row: 1 span 1;
  justify-self: end;
  align-self: end;

  .elevation {
    font-size: 1.5em;
  }
`;

const SnowConditions = ({ snow, gridColumn }) => {
  return (
    <SnowConditionsStyles gridColumn={gridColumn}>
      <h3 className="elevation">{snow}cm</h3>
    </SnowConditionsStyles>
  );
};

export default SnowConditions;
