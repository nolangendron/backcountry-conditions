import React from 'react';
import styled from '@emotion/styled';

const SnowDetailsList = styled("div")`
display: flex;
height: 100%;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-around;
align-content: center;

h1{
  margin: 0;
  padding: 0;
  font-size: 1.5em;
}
h2 {
  font-size: 1.5rem;
  font-weight: 900;
  text-align: center;
  color: #505865;
  position: relative;
  margin: 0 0 25px;
  text-transform: uppercase;
}
h2{
  margin: 0;
}
h3 {
  margin: 0 0 10px 0;
  font-size: 1em;
  color: #1a366c;
  text-transform: uppercase;
}
p {
  margin: 0;
}

.title {
  width: 100%;
  text-align: center;
  margin: 15px;
}

.flex-item {
  width: 25%;
  text-align: center;
}
`

export const SnowDetails = ({ lowElevationName, lowElevation, highElevationName, highElevation, newSnowLastDayCoq, newSnowLastTwoDayCoq, newSnowLastWeekCoq, snowDepthCoq, newSnowLastDayLit, newSnowLastTwoDayLit, newSnowLastWeekLit, snowDepthLit }) => {
  return (
    <SnowDetailsList>
      <h2 className="title">Snow Conditions</h2>
      <h3 className="title">{highElevationName} {highElevation}</h3>
      <div className="flex-item">
        <p>24hr</p>
      </ div>
      <div className="flex-item">
        <p>48hr</p></ div>
      <div className="flex-item">
        <p>7 Days</p>
      </ div>
      <div className="flex-item">
        <p>Base</p>
      </ div>
      <div className="flex-item">
        <h1>{newSnowLastDayLit}cm</h1>
      </ div>
      <div className="flex-item">
        <h1>{newSnowLastTwoDayLit}cm</h1>
      </ div>
      <div className="flex-item">
        <h1>{newSnowLastWeekLit}cm</h1>
      </ div>
      <div className="flex-item">
        <h1>{snowDepthLit}cm</h1>
      </ div>
      <h3 className="title">{lowElevationName} {lowElevation}</h3>
      <div className="flex-item">
        <p>24hr</p>
      </ div>
      <div className="flex-item">
        <p>48hr</p></ div>
      <div className="flex-item">
        <p>7 Days</p>
      </ div>
      <div className="flex-item">
        <p>Base</p>
      </ div>
      <div className="flex-item">
        <h1>{newSnowLastDayCoq}cm</h1>
      </ div>
      <div className="flex-item">
        <h1>{newSnowLastTwoDayCoq}cm</h1>
      </ div>
      <div className="flex-item">
        <h1>{newSnowLastWeekCoq}cm</h1>
      </ div>
      <div className="flex-item">
        <h1>{snowDepthCoq}cm</h1>
      </ div>

    </SnowDetailsList>
  )
}