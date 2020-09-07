import { getAxiosInstance } from './config/axiosSettings';

const API_KEY       = process.env.REACT_APP_API_KEY;
const axiosInstance = getAxiosInstance();

export const get = (url) => {
  const requestUrl = `${url}&apikey=${API_KEY}`;

  const request = axiosInstance.get(requestUrl)
    .then(response => {
      if(response.status === 200 && !response.data.length) {
        return response.data;
      } else if (response.status === 200 && response.data.length) {
        const [lastItem] = response.data.slice(-1);

        return get(`${url.split('&')[0]}&last=${lastItem['__rowid__']}`)
          .then((newResponse) => {
            return response.data.concat(newResponse);
          });
      } else {
        return Promise.reject(response.data);
      }
    })
    .catch(error => (error));

  return request;
};
