/**
 * Grouping an array of objects by a property
 *
 * @param {array} data
 * @param {string} key
 */
export const groupArrayByKey = (data, key) => {
  return data.reduce((previous, current) => {
    previous[current[key]] = previous[current[key]] || [];

    previous[current[key]].push(current);

    return previous;
  }, Object.create(null));
}
