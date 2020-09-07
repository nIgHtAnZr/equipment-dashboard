import axios from 'axios';

import config from '../../config/configs';
import { deps } from '../../redux/store';

export const getAxiosInstance = () => {
    const instance = axios.create();
    const { history } = deps;

    // Add interceptors to check response errors
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            // Check the error is an internal server error or not
            if (
                error.response &&
                config.statusCode.errorCodes.includes(error.response.status)
            ) {
              history.push('/internal-server-error');
            }

            // Check the error is an unauthorized error or not
            if (
                error.response &&
                config.statusCode.unauthorizedCodes.includes(error.response.status)
            ) {
              history.push('/unathourized');
            }

            return Promise.reject(error.response);
        }
    );

    return instance;
}
