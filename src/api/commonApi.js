import { getAxiosInstance } from './config/axiosSettings';
import configs from '../config/configs';

const API_KEY = process.env.REACT_APP_API_KEY;
const axiosInstance = getAxiosInstance();
const delayTime = configs.requestDelayTimeInMs;

/**
 * Get data from a specific api in recursive way untill a empty array recieves.
 * API call will be sent in 100ms time gap.
 *
 * @param {string} url
 */
export const get = (url) => {
  const requestUrl = `${url}&apikey=${API_KEY}`;

  const request = axiosInstance.get(requestUrl)
    .then((response) => {
      return response.status === 200 && response.data.length
        ? secureDelay(delayTime, response)
        : response;
    })
    .then(response => {
      if(response.status === 200 && !response.data.length) {
        return response.data;
      } else if (response.status === 200 && response.data.length) {
        const [lastItem] = response.data.slice(-1);

        return get(
          `${url.split("&")[0]}&last=${lastItem["__rowid__"]}`
        ).then((newResponse) => response.data.concat(newResponse));
      } else {
        return Promise.reject(response.data);
      }
    })
    .catch((error) => error);

  return request;
};

/**
 * Delaying by setting timeout
 *
 * @param {int} timeInMilliSeconds
 * @param {object} responseData
 */
const secureDelay = (timeInMilliSeconds, responseData) => {
  return new Promise((resolve) =>
    setTimeout(resolve, timeInMilliSeconds, responseData)
  );
};
