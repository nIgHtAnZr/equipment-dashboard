import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import configs from '../../../config/configs';
import { groupArrayByKey } from '../../../utils/SystemManager';

const DoughnutPieChart = ({
  chartData,
  cutoutPercentage,
  groupByPropery,
}) => {
  const [data, setData] = useState({
    labels: [],
    values: []
  });

  useEffect(() => {
    if (chartData.length && groupByPropery) {
      const operationalStatusData = groupArrayByKey(chartData, groupByPropery);

      setData({
        labels: operationalStatusData ?
          Object.keys(operationalStatusData) :
          [],
        values : operationalStatusData ?
          Object.values(operationalStatusData).map(values => values.length) :
          [],
      });
    }
  }, [chartData, groupByPropery]);

  // Data for Dougnat Chart
  const chartDataRender = {
    labels: data.labels,
    datasets: [{
      data: data.values,
      backgroundColor: configs.colorCode.operationalStatus,
    }]
  };

  // Data for Dougnat Chart options
  const chartOptions = {
    cutoutPercentage: cutoutPercentage || '0',
    responsive: true,
    legend: {
      display: false,
    }
  };

  return (
    <Doughnut data={chartDataRender} options={chartOptions} />
  );
}

export default DoughnutPieChart;