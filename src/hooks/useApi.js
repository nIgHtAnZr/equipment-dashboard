import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get } from '../api/commonApi';

const useApi = () => {
  const dispatch = useDispatch();
  const [actions, setActions] = useState();
  const [baseUrl, setBaseUrl] = useState(null);
  const [method, setMethod] = useState('GET');

  const callAPI = () => {
    switch (method) {
      case 'GET':
        return get(baseUrl);

      default:
        return get(baseUrl);
    }
  };

  useEffect(() => {
    if (baseUrl) {
      const requestApiCall = async () => {
        dispatch({ type: actions.request });

        try {
          const result = await callAPI();

          if (result) {
            dispatch({
              type: actions.success,
              payload: result,
            });
          } else {
            dispatch({
              type: actions.fail,
              payload: result.data,
            });
          }
        } catch (error) {
          dispatch({
            type: actions.fail,
            payload: error,
          });
        }

        setBaseUrl(null);
      };

      requestApiCall();
    }
  }, [baseUrl, actions]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitForm = (
    url,
    request,
    success,
    fail,
    method,
  ) => {
    const newActions = { request, success, fail };
    const mergedActions = { ...actions, ...newActions };

    setMethod(method);
    setActions(mergedActions);
    setBaseUrl(url);
  };

  return [submitForm];
}

export default useApi;
