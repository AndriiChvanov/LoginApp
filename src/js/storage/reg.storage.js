import { getCities, getCountries } from "../services/reg.service";

/**
 *
 * @returns {Promise<*>}
 */
export async function getCountry() {
    try {
        let count = 0;
        let arr;
        await getCountries().then((res) => {
            Object.values(res).reduce((acc, item) => {
                acc[item] = ++count;
                arr = acc;
                return acc;
            }, {});
        });

        return arr;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getCity(index) {
    try {
        let count = 0;
        let arr;
        await getCities(index).then((res) => {
            Object.values(res).reduce((acc, item) => {
                acc[item] = ++count;
                arr = acc;
                return acc;
            }, {});
        });

        return arr;
    } catch (error) {
        return Promise.reject(error);
    }
}

