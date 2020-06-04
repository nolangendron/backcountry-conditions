export const getWeatherStationData = async (station) => {
  const url = `https://wx.avalanche.ca/stations/${station}/measurements/`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
