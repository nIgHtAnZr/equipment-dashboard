import {
  FETCH_DATA_FOR_CHART_REQUEST,
  FETCH_DATA_FOR_CHART_SUCCESS,
  FETCH_DATA_FOR_CHART_FAIL,
} from '../actionTypes/dashboardActions';

const dashboardReducer = (
  state = {
    equipmentDataForChartLoading: false,
    equipmentDataForChart: null,
    equipmentDataForChartError: null,
  },
  action
) => {
  switch (action.type) {
    case FETCH_DATA_FOR_CHART_REQUEST:
      return {
        ...state,
        equipmentDataForChartLoading: true,
        equipmentDataForChart: null,
        equipmentDataForChartError: null,
      };

    case FETCH_DATA_FOR_CHART_SUCCESS:
      return {
        ...state,
        equipmentDataForChartLoading: false,
        equipmentDataForChart: action.payload,
        equipmentDataForChartError: null,
      };

    case FETCH_DATA_FOR_CHART_FAIL:
      return {
        ...state,
        equipmentDataForChartLoading: false,
        equipmentDataForChart: null,
        equipmentDataForChartError: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
