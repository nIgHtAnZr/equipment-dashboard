import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useApi from '../../hooks/useApi';
import {
  FETCH_DATA_FOR_CHART_REQUEST,
  FETCH_DATA_FOR_CHART_SUCCESS,
  FETCH_DATA_FOR_CHART_FAIL,
} from '../../redux/actionTypes/dashboardActions';

import BarChart from '../../components/dashboard/Charts/BarChart';
import DoughnutPieChart from '../../components/dashboard/Charts/DoughnutPieChart';
import RowCard from '../../components/dashboard/Cards/RowCard';
import { groupArrayByKey } from '../../utils/SystemManager';
import configs from '../../config/configs';

const MAX_ITEM_PER_REQUEST = configs.maximumItemPerRequest;

const ChartView = () => {
  const [fetchData] = useApi();
  const [equipmentData, setEquipmentData] = useState([]);
  const {
    equipmentDataForChartLoading,
    equipmentDataForChart,
    equipmentDataForChartError,
  } = useSelector(state => state ? state.dashboard : {});

  useEffect(() => {
    // We can check equipmentDataForChart object here for null to send request
    // only when local storage is cleared.
    fetchData(
      `api/Asset/Asset/All?max=${MAX_ITEM_PER_REQUEST}&last=0`,
      FETCH_DATA_FOR_CHART_REQUEST,
      FETCH_DATA_FOR_CHART_SUCCESS,
      FETCH_DATA_FOR_CHART_FAIL,
      'GET',
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (equipmentDataForChart && equipmentDataForChart.length) {
      setEquipmentData(equipmentDataForChart);
    }
  }, [equipmentDataForChart]);

  useEffect(() => {
    if (equipmentDataForChartError) {
      setEquipmentData([]);
    }
  }, [equipmentDataForChartError]);

  const renderCardRows = () => {
    const operationalStatusData = groupArrayByKey(
      equipmentData,
      'OperationalStatus'
    );

    return operationalStatusData && Object.entries(operationalStatusData)
      .map(([key, value], index) => <RowCard
          key={index}
          title={key}
          value={value.length}
        />
      );
  }

  const renderChartViews = () => {
    return (
      <div className="row">
        <div className="col-xl-8 col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row">
              <h6 className="m-0 font-weight-bold text-primary">
                Equipments Details
              </h6>
            </div>
            <div className="card-body">
              <BarChart
                chartData={equipmentData}
                groupByKey={'AssetCategoryID'}
                stackedByKey={'OperationalStatus'}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4">
          <div className="row">
            {renderCardRows()}
            <div className="col-xl-12 col-md-6 mb-4">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Operational Status
                  </h6>
                </div>
                <div className="card-body">
                  <DoughnutPieChart
                    chartData={equipmentData}
                    cutoutPercentage={60}
                    groupByPropery={'OperationalStatus'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-12 mt-2 container">
      <div className="d-flex justify-content-center">
        {
          equipmentDataForChartLoading ?
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div> :
            renderChartViews()
        }
      </div>
    </div>
  );
}

export default ChartView;
