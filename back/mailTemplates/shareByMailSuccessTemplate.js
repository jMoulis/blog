const coreTemplate = require('./coreTemplate');

const body = ({ href, from }) => {
  return `
    <span>Bonjour,</span> <p>${from} souhaite partager avec vous HedgeOne l’outil d’évaluation et gestion du risque face aux fluctuations du marché.</p>
    <div><a href="${href}">Consulter HedgeOne</a>
    `;
};

module.exports = response =>
  !response ? 'empty Message' : coreTemplate(`${body(response)}`);
