import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Doughnut } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const Wind = styled("div")` 
display: flex;
position: relative;
height: 100%;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-content: center;
background: #fff;
box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);

.locationArrow {
  position: absolute;
  align-self: center;
  margin-top: 20px;
  transform: rotate(-45deg);
}

button {
  background: grey;
  color: white;
  margin-top: 10px;
  padding: 10px;
}
 .windSpeed {
   position: relative;
 }
 .title {
  width: 100%;
  text-align: center;
  margin: 15px;
}

h3 {
  margin: 0 0 5px 0;
  font-size: 1em;
  color: #1a366c;
  text-transform: uppercase;
}

.north {
  position: absolute;
	left: 48%; top: 35%;
}
/* South */
.south {
  position: absolute;
	left: 48%; bottom: 26%;
}

/* East */
.east {
  position: absolute;
	right: 31%; top: 52%;
}
/* West */
.west {
  position: absolute;
	left: 31%; top: 52%;
}
`

export const WindChart = ({ lowElevationName, highElevationName, windUpper, windLower }) => {

  const lowerStationName = lowElevationName && lowElevationName;
  const lowerWindDirection = windLower && windLower.lowerStationWindDirection;
  const lowerWindSpeed = windLower && windLower.lowerStationWindSpeed;

  const upperStationName = highElevationName && highElevationName;
  const upperWindDirection = windUpper && windUpper.upperStationWindDirection;
  const upperWindSpeed = windUpper && windUpper.upperStationWindSpeed;

  const windDirection = windUpper ? upperWindDirection : lowerWindDirection;
  const windSpeed = windUpper ? upperWindSpeed : lowerWindSpeed;
  const stationName = highElevationName ? upperStationName : lowerStationName;

  const [rotation, setRotation] = useState({
    degree: 0
  });
  const [chartData, setChartData] = useState({
    data: [0, 360]
  })

  const data = {
    datasets: [{
      labels: ["Red", "Blue"],
      data: chartData.data,
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)"
      ]
    }]
  }

  const options = {

    circumference: Math.PI * 2,
    rotation: Math.PI,
    cutoutPercentage: 80,
    plugins: {
      datalabels: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: '#ffffff',
        align: 'start',
        anchor: 'start',
        offset: 10,
        borderRadius: 4,
        borderWidth: 1,
        formatter: function (value, context) {
          var i = context.dataIndex;
          var len = context.dataset.data.length - 1;
          if (i === len) {
            return null;
          }
          return value + ' mph';
        }
      }
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    }
  }

  const clearState = () => {
    setRotation({
      degree: 0
    })
    setChartData({
      data: [0, 360]
    })
  }

  const windDirectionLastTwoDays = (arr1, arr2) => {
    for (let i = 0; i < arr1.length + 1; i++) {
      console.log(i)
      if (i === arr1.length + 1) {
        clearState();
      } else {
        setTimeout(function timer() {
          setRotation({
            degree: arr1[i],
          })
          setChartData({
            data: [arr2[i] * 5, 360]
          })
        }, i * 100);
      }
    }
  }

  return (
    <Wind>
      <h3 className="title">{stationName ? stationName : 'Station'}</h3>
      <div className='windSpeed'>
        <h3>{data.datasets[0].data[0] ? data.datasets[0].data[0] / 5 : 0} km/h</h3>
      </div>
      <Doughnut data={data} options={options} />
      <FontAwesomeIcon className='locationArrow' transform={{ rotate: rotation.degree }} size='2x' color='red' icon={faLocationArrow} />
      <span className='north'>N</span>
      <span className='east'>E</span>
      <span className='south'>S</span>
      <span className='west'>W</span>

      <div>
        <button onClick={() => windDirectionLastTwoDays(windDirection, windSpeed)}>48hr Playback</button>
      </div>

    </Wind >
  )
}

