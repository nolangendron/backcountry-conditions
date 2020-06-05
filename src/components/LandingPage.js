import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { getWeatherStationData } from "../utils/apiCalls";
import { calNewSnowLastDay } from "../utils/calNewSnowLastDay";
import { stationNumbers } from "../data/weatherStationDetails";
import imgLandingPage from "../images/powder2.png";
import coquihalla from "../images/Thar_Peak.jpg";
import duffey from "../images/duffey.jpg";
import manning from "../images/manning.jpg";
import SplitText from "./SplitText";
import Select from "react-select";
import Altitude from "./Altitude";
import Temperature from "./Temperature";
// import { CurrentWeather } from './CurrentWeather'

const Container = styled("div")`
  display: grid;
  margin: 0;
  padding: 0;
  grid-template-columns: 40px 400px 200px 200px 1fr;
  grid-template-rows: 225px 225px 1fr;
  height: 100vh;

  .left-container {
    grid-column: 2 / span 1;
    grid-row: 1 / span 2;
  }
  .title {
    margin-top: 80px;
    font-size: 2em;
  }

  .title h1 {
    margin: 0;
  }

  .bgImage2 {
    content: "";
    position: absolute;
    grid-column: 5 / span 8;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    -webkit-transition: opacity 0.75s ease-in-out;
    -moz-transition: opacity 0.75s ease-in-out;
    -o-transition: opacity 0.75s ease-in-out;
    transition: opacity 0.75s ease-in-out;
  }

  .bgImage2.active {
    opacity: 1;
  }

  .bgImage2.notActive {
    opacity: 0;
  }

  .bgImage2.active.none {
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      ),
      url(${imgLandingPage}) no-repeat;
    background-size: cover;
  }

  .bgImage2.active.coquihalla {
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0.5) 100%
      ),
      linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      ),
      url(${coquihalla}) no-repeat;
    background-size: cover;
  }

  .bgImage2.active.duffey {
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0.5) 100%
      ),
      linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      ),
      url(${duffey}) no-repeat;
    background-size: cover;
  }

  .bgImage2.active.manningPark {
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0.5) 100%
      ),
      linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      ),
      url(${manning}) no-repeat;
    background-size: cover;
  }

  .select {
    margin-top: 100px;
    width: 400px;
  }

  .path {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: dash 1s linear alternate forwards;
  }

  @keyframes dash {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const images = [
  { value: "none", label: "none", image: imgLandingPage },
  { value: "coquihalla", label: "Coquihalla", image: coquihalla },
  { value: "duffey", label: "Duffey", image: duffey },
  { value: "manningPark", label: "Manning Park", image: manning },
];
const options = [
  { value: "none", label: "Select Area...", image: imgLandingPage },
  {
    value: "coquihalla",
    label: "Coquihalla",
    image: coquihalla,
    lowerStation: 15,
    upperStation: 17,
  },
  {
    value: "duffey",
    label: "Duffey",
    image: duffey,
    lowerStation: 74,
    upperStation: 20,
  },
  {
    value: "manningPark",
    label: "Manning Park",
    image: manning,
    lowerStation: 73,
    upperStation: 13,
  },
];

const LandingPage = () => {
  const [state, setState] = useState({
    selectedOption: options[0],
  });
  const [weatherStationData, setWeatherStationData] = useState({
    lowerStationData: [],
    upperStationData: [],
  });
  const [newSnow, setNewSnow] = useState({
    lowerStationLastDay: null,
    lowerStationLastTwoDay: null,
    lowerStationLastWeek: null,
    upperStationLastDay: null,
    upperStationLastTwoDay: null,
    upperStationLastWeek: null,
  });

  useEffect(() => {
    if (state.selectedOption.value !== "none") {
      getWeatherStationData(state.selectedOption.lowerStation).then(
        (result) => {
          let lowerStationData = result;
          setWeatherStationData({
            lowerStationData: lowerStationData,
          });
        }
      );

      getWeatherStationData(state.selectedOption.upperStation).then(
        (result) => {
          let upperStationData = result;
          setWeatherStationData({
            upperStationData: upperStationData,
          });
        }
      );
    }
  }, [state]);

  useEffect(() => {
    const lastDaySnowLowerStation =
      weatherStationData.lowerStationData &&
      weatherStationData.lowerStationData.slice(0, 23);
    const newSnowLowerStation =
      lastDaySnowLowerStation &&
      lastDaySnowLowerStation.map((day) => {
        return day.snowHeight;
      });
    const lastTwoDaySnowLowerStation =
      weatherStationData.lowerStationData &&
      weatherStationData.lowerStationData.slice(0, 47);
    const newTwoDaySnowLowerStation =
      lastTwoDaySnowLowerStation &&
      lastTwoDaySnowLowerStation.map((day) => {
        return day.snowHeight;
      });
    const lastWeekSnowLowerStation =
      weatherStationData.lowerStationData &&
      weatherStationData.lowerStationData.slice(0, 160);
    const newLastWeekSnowLowerStation =
      lastWeekSnowLowerStation &&
      lastWeekSnowLowerStation.map((day) => {
        return day.snowHeight;
      });

    const getNewSnowLowerStation =
      newSnowLowerStation && calNewSnowLastDay(newSnowLowerStation);
    const getNewTwoSnowLowerStation =
      newTwoDaySnowLowerStation && calNewSnowLastDay(newTwoDaySnowLowerStation);
    const getNewLastWeekSnowLowerStation =
      newLastWeekSnowLowerStation &&
      calNewSnowLastDay(newLastWeekSnowLowerStation);
    const sumNewSnowLowerStation =
      getNewSnowLowerStation &&
      getNewSnowLowerStation.reduce((a, b) => a + b, 0);
    const sumNewTwoDaySnowLowerStation =
      getNewTwoSnowLowerStation &&
      getNewTwoSnowLowerStation.reduce((a, b) => a + b, 0);
    const sumNewLastWeekSnowLowerStation =
      getNewLastWeekSnowLowerStation &&
      getNewLastWeekSnowLowerStation.reduce((a, b) => a + b, 0);

    setNewSnow({
      lowerStationLastDay: sumNewSnowLowerStation && sumNewSnowLowerStation,
      lowerStationLastTwoDay:
        sumNewTwoDaySnowLowerStation && sumNewTwoDaySnowLowerStation,
      lowerStationLastWeek:
        sumNewLastWeekSnowLowerStation && sumNewLastWeekSnowLowerStation,
    });
  }, [weatherStationData.lowerStationData]);

  useEffect(() => {
    const lastDaySnowUpperStation =
      weatherStationData.upperStationData &&
      weatherStationData.upperStationData.slice(0, 23);
    const newSnowUpperStation =
      lastDaySnowUpperStation &&
      lastDaySnowUpperStation.map((day) => {
        return day.snowHeight;
      });
    const lastTwoDaySnowUpperStation =
      weatherStationData.upperStationData &&
      weatherStationData.upperStationData.slice(0, 47);
    const newTwoDaySnowUpperStation =
      lastTwoDaySnowUpperStation &&
      lastTwoDaySnowUpperStation.map((day) => {
        return day.snowHeight;
      });
    const lastWeekSnowUpperStation =
      weatherStationData.upperStationData &&
      weatherStationData.upperStationData.slice(0, 160);
    const newLastWeekSnowUpperStation =
      lastWeekSnowUpperStation &&
      lastWeekSnowUpperStation.map((day) => {
        return day.snowHeight;
      });

    const getNewSnowUpperStation =
      newSnowUpperStation && calNewSnowLastDay(newSnowUpperStation);
    const getNewTwoSnowUpperStation =
      newTwoDaySnowUpperStation && calNewSnowLastDay(newTwoDaySnowUpperStation);
    const getNewLastWeekSnowUpperStation =
      newLastWeekSnowUpperStation &&
      calNewSnowLastDay(newLastWeekSnowUpperStation);
    const sumNewSnowUpperStation =
      getNewSnowUpperStation &&
      getNewSnowUpperStation.reduce((a, b) => a + b, 0);
    const sumNewTwoDaySnowUpperStation =
      getNewTwoSnowUpperStation &&
      getNewTwoSnowUpperStation.reduce((a, b) => a + b, 0);
    const sumNewLastWeekSnowUpperStation =
      getNewLastWeekSnowUpperStation &&
      getNewLastWeekSnowUpperStation.reduce((a, b) => a + b, 0);

    setNewSnow({
      upperStationLastDay: sumNewSnowUpperStation && sumNewSnowUpperStation,
      upperStationLastTwoDay:
        sumNewTwoDaySnowUpperStation && sumNewTwoDaySnowUpperStation,
      upperStationLastWeek:
        sumNewLastWeekSnowUpperStation && sumNewLastWeekSnowUpperStation,
    });
  }, [weatherStationData.upperStationData]);

  const handleChange = (selectedOption) => {
    setState({ selectedOption });
  };

  const { selectedOption } = state;
  const station = selectedOption && selectedOption.value;
  const lowerStation =
    weatherStationData.lowerStationData &&
    weatherStationData.lowerStationData[0];
  const lowerStationTemp = lowerStation && lowerStation.airTempAvg;
  const upperStation =
    weatherStationData.upperStationData &&
    weatherStationData.upperStationData[0];
  const upperStationTemp = upperStation && upperStation.airTempAvg;

  return (
    <Container selected={state.selectedOption && state.selectedOption.image}>
      <div className="left-container">
        <div className="title">
          <h1>
            <SplitText copy="BC" role="heading" count={0.5} />
          </h1>
          <h1>
            <SplitText copy="Backcountry" role="heading" count={0.7} />
          </h1>
          <h1>
            <SplitText copy="Weather" role="heading" count={1.6} />
          </h1>
        </div>
        <div className="select">
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
          />
        </div>
      </div>
      {images.map((imgClass, index) => {
        return (
          <div
            key={index}
            className={`bgImage2 ${imgClass.value} ${
              imgClass.value === selectedOption.value ? "active" : "notActive"
            }`}
          >
            {/* <svg viewBox="0 0 700 1500" fill="none" stroke-linecap="square" stroke-miterlimit="10" xmlns="http://www.w3.org/2000/svg">
              <clipPath id="a">
                <path d="M0 0h960v720H0V0z" />
              </clipPath>
              <g clip-path="url(#a)">
                <path fill="none" d="M0 0h960v720H0z" />
                <path fill="none" d="M1.286 720L321.01 219.346l38.418 74.355L468.48 86.748l60.722 102.856L635.777 13.633l85.51 101.616L789.443 0" />
                <path className="path" stroke="#000" stroke-width="3" stroke-linejoin="round" stroke-linecap="butt" d="M1.286 720L321.01 219.346l38.418 74.355L468.48 86.748l60.722 102.856L635.777 13.633l85.51 101.616L789.443 0" pathLength="1" />
              </g>
            </svg> */}
          </div>
        );
      })}
      <Altitude elevation={stationNumbers[station && station].elevationUpper} />
      <Altitude
        elevation={stationNumbers[station && station].elevationLower}
        elevationLower={stationNumbers[station && station].elevationLower}
      />
      <Temperature temperature={upperStationTemp} />
      <Temperature
        temperature={lowerStationTemp}
        temperatureLower={lowerStationTemp}
      />
    </Container>
  );
};

export default LandingPage;
