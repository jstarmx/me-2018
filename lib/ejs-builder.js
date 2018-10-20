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
      let dirName = path.basename(template).replace('.ejs', '');
      if (dirName === 'index') {
        dirName = '';
      }
      if (
        dirName &&
        !fs.existsSync(path.resolve(__dirname, '../dist', dirName))
      ) {
        fs.mkdirSync(path.resolve(__dirname, '../dist', dirName));
      }
      ejs.renderFile(template, (err, str) => {
        fs.writeFileSync(
          path.resolve(__dirname, '../dist', dirName, 'index.html'),
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
