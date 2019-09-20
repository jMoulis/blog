const globalStyle = `
  <style>
    * {
      font-family: Arial, Helvetica, sans-serif;
    }
  </style>`;

const head = `
  <head>
    <meta charset="utf-8" />
    ${globalStyle}
  </head>`;

module.exports = body => `
  <!DOCTYPE html>
    <html lang="fr">
      ${head}
      <body>
        <main>${body}</main>
        <footer>
          <p>A très vite,</p>
          <p>L'Equipe HEDGE-ONE</p>
        </footer>  
      </body>
    </html>`;
