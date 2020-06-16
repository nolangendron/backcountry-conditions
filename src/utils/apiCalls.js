const getWeatherStationData = async (station) => {
  const url = `https://api.avalanche.ca/weather/stations/${station}/measurements/`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getWeatherStationData;
