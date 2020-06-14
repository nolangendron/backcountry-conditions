import React, { useState, useEffect, Fragment } from "react";
import styled from "@emotion/styled";
import { getWeatherStationData } from "../utils/apiCalls";
import { calNewSnowLastDay } from "../utils/calNewSnowLastDay";
import { stationNumbers } from "../data/weatherStationDetails";
import imgLandingPage from "../images/powder.webp";
import coquihalla from "../images/coq.webp";
import duffey from "../images/duffey.webp";
import manning from "../images/manning.webp";
import SplitText from "./SplitText";
import Select from "react-select";
import Altitude from "./Altitude";
import Temperature from "./Temperature";
import SnowConditions from "./SnowConditions";
import {
  FaTemperatureLow,
  FaMountain,
  FaRegSnowflake,
  FaWind,
} from "react-icons/fa";
import { Chart } from "./Chart.js";
import WindChart from "./WindChart.js";

const Container = styled("div")`
  display: grid;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 50vh 8% 15% 15% 1fr;
  height: 100vh;
  overflow: scroll;

  .left-container {
    grid-column: 5 / span 4;
    grid-row: 1 / span 1;
  }

  .title {
    margin-top: 20%;
    font-size: 2em;
  }

  .title h1 {
    margin: 0;
  }

  .bgImage2 {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
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
    width: 100%;
    height: 100%;
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
    width: 100%;
    height: 50vh;
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
    width: 100%;
    height: 50vh;
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
    width: 100%;
    height: 50vh;
  }

  .select {
    margin-top: 20px;
    width: 300px;
  }

  .altitude-icon {
    grid-column: 4 / span 1;
    grid-row: 2 / span 1;
    justify-self: center;
    align-self: end;
  }

  .temp-icon {
    grid-column: 5 / span 1;
    grid-row: 2 / span 1;
    justify-self: center;
    align-self: end;
  }

  .snow-icon {
    grid-column: 6 / span 4;
    grid-row: 2 / span 1;
    justify-self: center;
    align-self: end;
  }

  .wind-icon {
    grid-column: 10 / span 2;
    grid-row: 2 / span 1;
    justify-self: center;
    align-self: end;
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
  const [lowerStationData, setLowerStationData] = useState([]);
  const [upperStationData, setUpperStationData] = useState([]);

  const [newSnowLowerStation, setNewSnowLowerStation] = useState([
    { name: "24hrs", snow: null },
    { name: "48hrs", snow: null },
    { name: "7 Days", snow: null },
  ]);

  const [newSnowUpperStation, setNewSnowUpperStation] = useState([
    { name: "24hrs", snow: null },
    { name: "48hrs", snow: null },
    { name: "7 Days", snow: null },
  ]);

  const [windUpperStation, setWindUpperStation] = useState({
    windSpeed: [],
    windDirection: [],
  });

  const [windLowerStation, setWindLowerStation] = useState({
    windSpeed: [],
    windDirection: [],
  });

  const [historicSnowData, setHistoricSnowData] = useState({
    data: {
      labels: [],
      datasets: [
        { label: "", fill: false, backgroundColor: "", data: [] },
        { label: "", fill: false, backgroundColor: "", data: [] },
      ],
    },
  });

  useEffect(() => {
    if (state.selectedOption.value !== "none") {
      getWeatherStationData(state.selectedOption.lowerStation).then(
        (result) => {
          let lowerData = result;
          console.log(lowerData);
          setLowerStationData(lowerData);
        }
      );

      getWeatherStationData(state.selectedOption.upperStation).then(
        (result) => {
          let upperData = result;
          setUpperStationData(upperData);
        }
      );
    }
  }, [state]);

  useEffect(() => {
    const lastDaySnowLowerStation =
      lowerStationData && lowerStationData.slice(0, 23);
    const newSnowLowerStation =
      lastDaySnowLowerStation &&
      lastDaySnowLowerStation.map((day) => {
        return day.snowHeight;
      });
    const lastTwoDaySnowLowerStation =
      lowerStationData && lowerStationData.slice(0, 47);
    const newTwoDaySnowLowerStation =
      lastTwoDaySnowLowerStation &&
      lastTwoDaySnowLowerStation.map((day) => {
        return day.snowHeight;
      });
    const lastWeekSnowLowerStation =
      lowerStationData && lowerStationData.slice(0, 160);
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

    setNewSnowLowerStation([
      { name: "24hrs", snow: sumNewSnowLowerStation },
      { name: "48hrs", snow: sumNewTwoDaySnowLowerStation },
      { name: "7 Days", snow: sumNewLastWeekSnowLowerStation },
    ]);

    const windSpeedLowerStation =
      lastTwoDaySnowLowerStation &&
      lastTwoDaySnowLowerStation.map((day) => {
        return day.windSpeedAvg;
      });

    const windDirectionLowerStation =
      lastTwoDaySnowLowerStation &&
      lastTwoDaySnowLowerStation.map((day) => {
        return day.windDirAvg;
      });

    setWindLowerStation({
      windSpeed: windSpeedLowerStation,
      windDirection: windDirectionLowerStation,
    });
  }, [lowerStationData]);

  useEffect(() => {
    const lastDaySnowUpperStation =
      upperStationData && upperStationData.slice(0, 23);
    const newSnowUpperStation =
      lastDaySnowUpperStation &&
      lastDaySnowUpperStation.map((day) => {
        return day.snowHeight;
      });
    const lastTwoDaySnowUpperStation =
      upperStationData && upperStationData.slice(0, 47);
    const newTwoDaySnowUpperStation =
      lastTwoDaySnowUpperStation &&
      lastTwoDaySnowUpperStation.map((day) => {
        return day.snowHeight;
      });
    const lastWeekSnowUpperStation =
      upperStationData && upperStationData.slice(0, 160);
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

    const windSpeedUpperStation =
      lastTwoDaySnowUpperStation &&
      lastTwoDaySnowUpperStation.map((day) => {
        return day.windSpeedAvg;
      });

    const windDirectionUpperStation =
      lastTwoDaySnowUpperStation &&
      lastTwoDaySnowUpperStation.map((day) => {
        return day.windDirAvg;
      });

    setWindUpperStation({
      windSpeed: windSpeedUpperStation,
      windDirection: windDirectionUpperStation,
    });
    setNewSnowUpperStation([
      { name: "24hrs", snow: sumNewSnowUpperStation },
      { name: "48hrs", snow: sumNewTwoDaySnowUpperStation },
      { name: "7 Days", snow: sumNewLastWeekSnowUpperStation },
    ]);
  }, [upperStationData]);

  const lowerSeasonData =
    state.selectedOption &&
    stationNumbers[state.selectedOption.value].seasonDataLower;
  const upperSeasonData =
    state.selectedOption &&
    stationNumbers[state.selectedOption.value].seasonDataUpper;
  const lowerLabel =
    state.selectedOption &&
    stationNumbers[state.selectedOption.value].elevationLower;
  const upperLabel =
    state.selectedOption &&
    stationNumbers[state.selectedOption.value].elevationUpper;

  useEffect(() => {
    const getSnowPackData = (arr) => {
      if (arr !== null) {
        const dataArray = [];
        const dateArray = [];
        for (let i = 0; i < arr.length; i++) {
          if (
            arr[i].date.charAt(11) === "2" &&
            arr[i].date.charAt(12) === "3"
          ) {
            dateArray.push(arr[i].date.slice(0, 10));
            dataArray.push(arr[i].snowpack);
          }
        }
        return { dataArray, dateArray };
      }
    };
    const upperSnowData = getSnowPackData(upperSeasonData && upperSeasonData);
    const lowerSnowData = getSnowPackData(lowerSeasonData && lowerSeasonData);
    setHistoricSnowData({
      data: {
        labels: lowerSnowData && lowerSnowData.dateArray,
        datasets: [
          {
            label: lowerLabel,
            backgroundColor: "#50D8D7",
            data: lowerSnowData && lowerSnowData.dataArray,
          },
          {
            label: upperLabel,
            backgroundColor: "#547AA5",
            data: upperSnowData && upperSnowData.dataArray,
          },
        ],
      },
    });
  }, [lowerLabel, lowerSeasonData, upperLabel, upperSeasonData]);

  const handleChange = (selectedOption) => {
    setState({ selectedOption });
  };
  const { selectedOption } = state;

  const station = selectedOption && selectedOption.value;
  const lowerStation = lowerStationData && lowerStationData[0];
  const lowerStationTemp = lowerStation && lowerStation.airTempAvg;
  const lowerStationSnowDepth = lowerStation && lowerStation.snowHeight;

  const upperStation = upperStationData && upperStationData[0];
  const upperStationTemp = upperStation && upperStation.airTempAvg;
  const upperStationSnowDepth = upperStation && upperStation.snowHeight;

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
          ></div>
        );
      })}

      {selectedOption.value !== "none" && (
        <Fragment>
          <FaMountain className="altitude-icon" size="2.5em" />

          <Altitude
            elevation={stationNumbers[station && station].elevationUpper}
          />
          <Altitude
            elevation={stationNumbers[station && station].elevationLower}
            elevationLower={true}
          />
          <FaTemperatureLow className="temp-icon" size="2.5em" />

          <Temperature temperature={upperStationTemp && upperStationTemp} />
          <Temperature
            temperature={lowerStationTemp && lowerStationTemp}
            temperatureLower={true}
          />
          <FaRegSnowflake className="snow-icon" size="2.5em" />
          <SnowConditions
            snow={newSnowUpperStation[0].snow && newSnowUpperStation[0].snow}
            gridColumn={"6 / span 1"}
            gridRow={"3 / span 1"}
            type={"24hrs"}
          />
          <SnowConditions
            snow={newSnowUpperStation[1].snow && newSnowUpperStation[1].snow}
            gridColumn={"7 / span 1"}
            gridRow={"3 / span 1"}
            type={"48hrs"}
          />
          <SnowConditions
            snow={newSnowUpperStation[2].snow && newSnowUpperStation[2].snow}
            gridColumn={"8 / span 1"}
            gridRow={"3 / span 1"}
            type={"7 day"}
          />
          <SnowConditions
            snow={upperStationSnowDepth && upperStationSnowDepth}
            gridColumn={"9 / span 1"}
            gridRow={"3 / span 1"}
            type={"Base"}
          />
          <SnowConditions
            snow={newSnowLowerStation[0].snow && newSnowLowerStation[0].snow}
            gridColumn={"6 / span 1"}
            gridRow={"4 / span 1"}
          />
          <SnowConditions
            snow={newSnowLowerStation[1].snow && newSnowLowerStation[1].snow}
            gridColumn={"7 / span 1"}
            gridRow={"4 / span 1"}
          />
          <SnowConditions
            snow={newSnowLowerStation[2].snow && newSnowLowerStation[2].snow}
            gridColumn={"8 / span 1"}
            gridRow={"4 / span 1"}
          />
          <SnowConditions
            snow={lowerStationSnowDepth && lowerStationSnowDepth}
            gridColumn={"9 / span 1"}
            gridRow={"4 / span 1"}
          />
          <FaWind className="wind-icon" size="2.5em" />

          <WindChart
            gridRow={"3 / span 1"}
            gridColumn={"10 / span 2"}
            windSpeed={windUpperStation && windUpperStation.windSpeed}
            windDirection={windUpperStation && windUpperStation.windDirection}
          />
          <WindChart
            gridColumn={"10 / span 2"}
            gridRow={"4 / span 1"}
            windSpeed={windLowerStation && windLowerStation.windSpeed}
            windDirection={windLowerStation && windLowerStation.windDirection}
          />
          <Chart data={historicSnowData.data} />
        </Fragment>
      )}
    </Container>
  );
};

export default LandingPage;
