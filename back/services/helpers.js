function isEmptyObject(object) {
  if (!object) return true;
  return Object.keys(object).length === 0;
}

function splitUppercaseString(string) {
  return string.split(/(?=[A-Z])/).join(' ');
}
module.exports = {
  isEmptyObject,
  splitUppercaseString,
};
