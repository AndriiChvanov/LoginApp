import { getDate, getMonth, getYear, format } from "date-fns";

/**
 *
 * @param {String} date
 */
export function parse(date) {
    const temp = date.split(".");
    date = new Date(temp[2], temp[1], temp[0]);
    return date;
}

export function year(date) {
    return getYear(date);
}

export function month(date) {
    return getMonth(date);
}

export function day(date) {
    return getDate(date);
}