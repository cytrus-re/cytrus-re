const chalk = require('chalk');

const CONNECTORS = ['{','}','[',']'];

function joinBy (glue = '') {
  return (...strings) => !Array.isArray(strings)
    ? strings
    : strings.filter(s => s).join(glue);
};

function nLines (n, line = '-') {
  return Array(n).join(line)
};

function toString (content) {
  return JSON
    .stringify(content, null, '  ')
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      return trimmed.length && CONNECTORS.includes(trimmed)
        ? chalk.dim(line)
        : line;
    })
    .join('\n');
}

module.exports = { joinBy, nLines, toString };
