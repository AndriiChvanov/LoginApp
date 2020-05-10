import { parse, day, month, year } from "../helpers/date";

/**
 * Function show error. Add input error.
 * @param {HTMLInputElement} elem
 * @
 */
export function getResponseObject(form) {
    const pack = Object.values(form).reduce((acc, el) => {
        let id = el.id.replace("reg-", "");
        if (id === "date_of_birth") {
            const date = parse(el.value);
            acc["date_of_birth_day"] = day(date);
            acc["date_of_birth_month"] = month(date);
            acc["date_of_birth_year"] = year(date);
        } else {
            acc[id] = el.value;
        }
        return acc;
    }, {});
    delete pack[""];
    return pack;
}