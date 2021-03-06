import React, { useState, useEffect, Fragment } from "react";
import styled from "@emotion/styled";
import { fonts } from "../styles/index";
import { calNewSnowLastDay, getWeatherStationData } from "../utils/index";
import { stationNumbers } from "../data/weatherStationDetails";
import { imgLandingPage, coquihalla, duffey, manning } from "../images/index";
import SplitText from "./SplitText";
import Select from "react-select";
import ConditionsTable from "./ConditionsTable";
import ConditionsTableMobile from "./ConditionsTableMobile";

const Container = styled("div")`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 42vh 60px 1fr;
  column-gap: 30px;
  height: 100vh;
  overflow: scroll;

  .select {
    grid-column: 5 / span 4;
    grid-row: 2 span 1;
    align-self: start;
    justify-self: center;
    min-width: 180px;
    width: 330px;
    font-family: ${fonts.text};
  }

  .bgImage2 {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    -webkit-transition: opacity 0.5s ease-in-out;
    -moz-transition: opacity 0.5s ease-in-out;
    -o-transition: opacity 0.5s ease-in-out;
    transition: opacity 0.5s ease-in-out;
    width: 100%;
    height: 100%;
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
`;

const images = [
  { value: "none", label: "none", image: imgLandingPage },
  { value: "coquihalla", label: "Coquihalla", image: coquihalla },
  { value: "duffey", label: "Duffey", image: duffey },
  { value: "manningPark", label: "Manning Park", image: manning },
];

const options = [
  { value: "none", label: "Select Area", image: imgLandingPage },
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

  let width = window.innerWidth;

  return (
    <Container
      selected={state.selectedOption && state.selectedOption.image}
      width={width}
    >
      <SplitText copy="BC Backcountry Weather" role="heading" count={0.1} />
      <div className="select">
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
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
          {width < 390 ? (
            <ConditionsTableMobile
              elevationUpper={stationNumbers[station && station].elevationUpper}
              elevationLower={stationNumbers[station && station].elevationLower}
              temperatureUpper={upperStationTemp && upperStationTemp}
              temperatureLower={lowerStationTemp && lowerStationTemp}
              snow24Upper={
                newSnowUpperStation[0].snow && newSnowUpperStation[0].snow
              }
              snow24Lower={
                newSnowLowerStation[0].snow && newSnowLowerStation[0].snow
              }
              snow48Upper={
                newSnowUpperStation[1].snow && newSnowUpperStation[1].snow
              }
              snow48Lower={
                newSnowLowerStation[1].snow && newSnowLowerStation[1].snow
              }
              snow7Upper={
                newSnowUpperStation[2].snow && newSnowUpperStation[2].snow
              }
              snow7Lower={
                newSnowLowerStation[2].snow && newSnowLowerStation[2].snow
              }
              snowBaseUpper={upperStationSnowDepth && upperStationSnowDepth}
              snowBaseLower={lowerStationSnowDepth && lowerStationSnowDepth}
              windSpeedUpper={windUpperStation && windUpperStation.windSpeed}
              windDirectionUpper={
                windUpperStation && windUpperStation.windDirection
              }
              windSpeedLower={windLowerStation && windLowerStation.windSpeed}
              windDirectionLower={
                windLowerStation && windLowerStation.windDirection
              }
              chartData={historicSnowData.data}
            />
          ) : (
            <ConditionsTable
              elevationUpper={stationNumbers[station && station].elevationUpper}
              elevationLower={stationNumbers[station && station].elevationLower}
              temperatureUpper={upperStationTemp && upperStationTemp}
              temperatureLower={lowerStationTemp && lowerStationTemp}
              snow24Upper={
                newSnowUpperStation[0].snow && newSnowUpperStation[0].snow
              }
              snow24Lower={
                newSnowLowerStation[0].snow && newSnowLowerStation[0].snow
              }
              snow48Upper={
                newSnowUpperStation[1].snow && newSnowUpperStation[1].snow
              }
              snow48Lower={
                newSnowLowerStation[1].snow && newSnowLowerStation[1].snow
              }
              snow7Upper={
                newSnowUpperStation[2].snow && newSnowUpperStation[2].snow
              }
              snow7Lower={
                newSnowLowerStation[2].snow && newSnowLowerStation[2].snow
              }
              snowBaseUpper={upperStationSnowDepth && upperStationSnowDepth}
              snowBaseLower={lowerStationSnowDepth && lowerStationSnowDepth}
              windSpeedUpper={windUpperStation && windUpperStation.windSpeed}
              windDirectionUpper={
                windUpperStation && windUpperStation.windDirection
              }
              windSpeedLower={windLowerStation && windLowerStation.windSpeed}
              windDirectionLower={
                windLowerStation && windLowerStation.windDirection
              }
              chartData={historicSnowData.data}
            />
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default LandingPage;
