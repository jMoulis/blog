const moment = require('moment');
const { splitUppercaseString } = require('../services/helpers');
const coreTemplate = require('./coreTemplate');

const headerTemplate = type =>
  `<h3>Hey bim une nouvelle demande de ${type}</h3>`;

const body = tBody =>
  `<table style="border-collapse: collpase"><tbody>${tBody}</tbody></table></body>`;

const rowTemplate = (key, value) => {
  const firstTdCss =
    'text-transform: capitalize; font-weight: bold; text-align: start; padding: 2px';
  const td = 'padding: 2px; display: flex; flex-direction: column';
  return `
      <tr>
        <td style="${firstTdCss}">${key}</td>
        <td style="${td}">${value}</td>
      </tr>`;
};

const buildMessage = response => {
  if (!response) return 'empty Message';
  const templateMessage = Object.entries(response._doc).reduce((res, item) => {
    const key = item[0];
    const keySplitWithUppercase = splitUppercaseString(key);
    const value = item[1];
    if (key === 'dates' && Array.isArray(value)) {
      const dates = value.map(date => date.fullDate);
      // create a specific dates template
      // 1st row with dates as label and subsequent row with only date value
      const dateTemplate = dates.reduce((acc, date, index) => {
        if (index === 0) {
          return `${acc}${rowTemplate(keySplitWithUppercase, date)}`;
        }
        return `${acc}${rowTemplate('', date)}`;
      }, '');
      return `${res}${dateTemplate}`;
    }
    if (key === 'createdAt') {
      const createdAt = moment(value).format('DD/MM/YYYY');
      return `${res}${rowTemplate(keySplitWithUppercase, createdAt)}`;
    }
    if (key !== '_id' && key !== '__v' && key !== 'cgv') {
      return `${res}${rowTemplate(keySplitWithUppercase, value)}`;
    }
    return res;
  }, '');

  return coreTemplate(
    `${headerTemplate(splitUppercaseString(response.type))} ${body(
      templateMessage,
    )}`,
  );
};

module.exports = buildMessage;
