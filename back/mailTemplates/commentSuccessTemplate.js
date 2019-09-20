const coreTemplate = require('./coreTemplate');

const body = ({ firstName, topic, href }) => {
  return `
    <span>${firstName},</span>
    <p>Vous avez reçu une réponse à votre post "${topic}"</p>
    <div>Pour consulter, cliquez ici >> <a href=${href}>Lien vers le commentaire</a></div>
    `;
};

module.exports = response =>
  !response ? 'empty Message' : coreTemplate(`${body(response)}`);
