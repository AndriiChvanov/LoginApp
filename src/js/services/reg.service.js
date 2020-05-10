import axios from '../plugins/axios';


/**
* Function getCities. Make cities request to API.
*
*/
export async function getCities(index) {
    try {
        const response = await axios.get(`/location/get-cities/${index}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Function getCountries. Make countries request to API.
 *
 */
export async function getCountries() {
    try {
        const response = await axios.get(`/location/get-countries`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Function login. Make login request to API.
 * @param {Object} Object
 *
 */
export async function register(object) {
    try {
        const response = await axios.post(`/auth/signup`, JSON.stringify(object));
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 *
 * @param {Object} error
 * @returns {String}
 */
export function getRegisterErrorMessage(error) {
    const msg = JSON.parse(error.request.response);
    return msg.message;
}

