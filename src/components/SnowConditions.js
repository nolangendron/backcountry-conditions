import React from "react";
import styled from "@emotion/styled";

const SnowConditionsStyles = styled("div")`
  grid-column: ${(props) => props.gridColumn && props.gridColumn};
  grid-row: ${(props) => props.gridRow && props.gridRow};
  justify-self: center;
  align-self: center;

  .snow {
    font-size: 2.5em;
    margin: 0;
  }

  .cm {
    font-size: 0.5em;
  }
`;

const SnowConditions = ({ snow, gridColumn, gridRow }) => {
  return (
    <SnowConditionsStyles gridColumn={gridColumn} gridRow={gridRow}>
      <h3 className="snow">
        {snow}
        <span className="cm">cm</span>
      </h3>
    </SnowConditionsStyles>
  );
};

export default SnowConditions;
