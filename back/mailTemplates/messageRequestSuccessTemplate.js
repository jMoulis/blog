const coreTemplate = require('./coreTemplate');

const bodyContent = ({ type }) => {
  switch (type) {
    case 'betaRequest':
      return `
        <p>Nous avons bien reçu votre demande pour devenir bêta testeur de la solution HEDGE-ONE et nous vous en remercions !</p>
        <p>Nous allons donc prendre contact avec vous le ${'data/heure'} comme vous le souhaitiez</p>
      `;
    case 'appointmentRequest':
      return ``;
    case 'contactRequest':
      return ``;
    default:
      return ``;
  }
};

const body = ({ firstname, type, ...rest }) => {
  // console.log(rest);
  return `<span>Bonjour ${firstname},</span><div>${bodyContent({
    type,
    ...rest,
  })}</div>
  `;
};

module.exports = response =>
  !response ? 'empty Message' : coreTemplate(`${body(response)}`);
