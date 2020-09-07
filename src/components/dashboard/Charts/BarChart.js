import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import configs from '../../../config/configs';
import { groupArrayByKey } from '../../../utils/SystemManager';

const BarChart = ({ chartData, stackedByKey, groupByKey }) => {
  const [labels, setLabels]     = useState([]);
  const [datasets, setDataSets] = useState([]);

  const { operationalStatus } = configs.colorCode;

  useEffect(() => {
    if (chartData.length && stackedByKey && groupByKey && operationalStatus) {
      const lineChartData         = groupArrayByKey(chartData, groupByKey);
      const operationalStatusData = groupArrayByKey(chartData, stackedByKey);

      setLabels(lineChartData ? Object.keys(lineChartData) : []);

      setDataSets(
        Object.keys(operationalStatusData).map((element, index) => {
          const dataValues = Object.values(lineChartData).map(
            dataArrays => dataArrays.filter(
              (arrayValues) => arrayValues[stackedByKey] === element).length
          );

          return ({
            label: element,
            data: dataValues, 
            backgroundColor: operationalStatus[index],
          })
        })
      );
    }
  }, [chartData, stackedByKey, groupByKey, operationalStatus]);

  // Data for Bar chart
  const chartDataRender = {
    labels,
    datasets,
  };

  // Chart options data
  const chartOptions = {
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      }],
      xAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };

  return (
    <Bar data={chartDataRender} options={chartOptions}/>
  );
}

export default BarChart;
