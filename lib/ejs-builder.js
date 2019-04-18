const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const pretty = require('pretty');

function EJSBuilder() {}

EJSBuilder.prototype.apply = compiler => {
  compiler.plugin('emit', (compilation, callback) => {
    const templates = fs
      .readdirSync(path.resolve(__dirname, '../src/views/pages'))
      .map(file => path.resolve(__dirname, '../src/views/pages', file));

    if (!fs.existsSync(path.resolve(__dirname, '../dist'))) {
      fs.mkdirSync(path.resolve(__dirname, '../dist'));
    }

    templates.forEach(template => {
      const fileName = path.basename(template).replace('.ejs', '.html');
      ejs.renderFile(template, (err, str) => {
        if (err) {
          return console.error(err);
        }
        return fs.writeFileSync(
          path.resolve(__dirname, '../dist', fileName),
          pretty(str, {
            ocd: true,
          })
        );
      });
    });

    callback();
  });
};

module.exports = EJSBuilder;
