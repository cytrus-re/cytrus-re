const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const moment = require('moment');
const stripAnsi = require('strip-ansi');

const namespaceCache = new Map();
const { version } = require('../package.json');
const { joinBy, nLines, toString } = require('./utils');

const GUTTER_DEFAULT = 9;
const NAMESPACE_TYPES = ['string','number','object'];
const LEVEL_VALUES = {
  0: 'debug',
  1: 'info',
  2: 'warn',
  3: 'error',
  4: 'fatal'
};

const { dim, blue, red, yellow, bold, reset } = chalk;

const faqtory = (namespace = '') => {
  if (NAMESPACE_TYPES.includes(typeof namespace) && namespaceCache.has(namespace)) {
    return namespaceCache.get(namespace);
  }

  function gutterize (prefix = '') {
    if (typeof prefix !== 'string')
      throw new TypeError('gutterize: expects prefix to be string; ' + typeof prefix + ' given.');
    const gutterSize = GUTTER_DEFAULT - stripAnsi(prefix).length + (typeof namespace === 'string'
          ? namespace.length + 3
          : 0
      );
    const gutter = Array(gutterSize >= 0 ? gutterSize : 0).fill(' ').join('');
    return prefix + gutter;
  }

  function getNamespacePrefix () {
    return typeof namespace !== undefined
      ? typeof namespace === 'string'
        ? namespace.length
          ? `[${namespace}]`
          : ''
        : `[${namespace.toString()}]`
      : ''
  }

  const loggers = [
    { handler: console.log }
  ];

  const zaq = { version, loggers };

  zaq.getNamespace = () => {
    return namespace;
  }

  function deprecated (name = '', replacement = null, replacementName = null) {
    return (...args) => {

      const deprecationWarning = joinBy(' ')(
        `zaq method`,
        red(name),
        'is deprecated and will be removed in future versions of zaq.'
      );
      zaq.warn(deprecationWarning);

      if (typeof replacement !== 'function') return;

      const replacementWarning = joinBy(' ')(
        dim('Using alternative method'),
        replacementName ? blue(replacementName) : replacement.name,
        dim('instead.')
      );
      zaq.warn(replacementWarning);

      replacement(...args);
    }
  }

  function getLevelValue (logLevel) {
    return Object.keys(LEVEL_VALUES)
      .find(key => LEVEL_VALUES[key] === logLevel);
  }

  zaq.log = (input, level = 'misc') => {
    zaq.loggers
      .filter(logger => typeof logger === 'object')
      .forEach(({ handler, options = {} }) => {
        let { timestamps, logLevel, acceptLevels, stripColors } = options;
        const timestamp = timestamps ? dim(moment().format('l LTS ')) : null;
        if (timestamps === true) input = timestamp + input.split('\n').join('\n' + timestamp);
        if (stripColors === true) input = stripAnsi(input);
        if (typeof logLevel === 'number' && getLevelValue(level) < logLevel) return;
        if (Array.isArray(acceptLevels) && !acceptLevels.includes(level)) return;
        if (typeof acceptLevels === 'string' && acceptLevels !== level) return;
        if (handler) handler(input);
      });
    return zaq;
  }

  zaq.use = (handler, options = {}) => {
    return zaq.loggers.push({ handler, options });
  }

  zaq.dispose = (index) => {
    if (typeof index !== 'number')
      throw new TypeError('zaq.dispose requires a valid handler index for removal.');
    return delete zaq.loggers[index];
  }

  zaq.unuse = deprecated('zaq.unuse', zaq.dispose, 'zaq.dispose');

  zaq.renderObject = (obj = null, color = 'cyan') => {
    if (typeof color !== 'string' || !color in chalk)
      throw new TypeError('zaq.renderObject requires color arg to be valid "chalk" style.');

    const NAMESPACE = chalk[color].dim(getNamespacePrefix());
    const LEAD_DECOR = ' >>>>';
    const REST_DECOR = ' ::::';
    const colorize = chalk[color];
    const prefix = gutterize(NAMESPACE + colorize(LEAD_DECOR)) + '  ';
    const rendered = typeof obj === 'string'
      ? obj
      : toString(obj);

    return '\n' + prefix + rendered
      .split('\n')
      .join('\n' + gutterize(NAMESPACE + colorize.dim(REST_DECOR)) + '  ');
    return output;
  };

  zaq.constructMessage = ({ style, prefix = '' }, { text, loggables }) => {
    const namespacePrefix = chalk.bold[style].dim(getNamespacePrefix());
    const givenPrefix = chalk.bold[style](prefix);
    const gutter = gutterize(`${namespacePrefix} ${givenPrefix}`);

    const message = gutter + chalk.bold(text);
    const details = typeof loggables !== 'undefined'
      ? Array.isArray(loggables)
        ? loggables.map(obj => zaq.renderObject(obj, style)).join('')
        : zaq.renderObject(loggables, style)
      : '';
    return message + details;
  }

  zaq.logMessage = ({ text, loggables }, { style, prefix, level }) => {
    const message = zaq.constructMessage({ style, prefix }, { text, loggables });
    return zaq.log(message, level);
  }

  zaq.createLogStyle = (spec = {}) => (text, ...loggables) => {
    return zaq.logMessage({ text, loggables }, spec);
  };

  zaq.extractTo = (keyToExtract, method) => {
    return (data) => {
      var message = (typeof data === 'object' && typeof data[keyToExtract] === 'string')
        ? data[keyToExtract]
        : `("${keyToExtract}" not found in data)`;

      return typeof method === 'function'
        ? method(message, data)
        : null;
    }
  };

  zaq.applyTo = (message, method) => {
    return (data) => {
      return typeof method === 'function'
        ? method(message, data)
        : null;
    }
  };

  zaq.ok = zaq.createLogStyle({
    style: 'green',
    prefix: '✓ OK:',
    level: 'info'
  });

  zaq.win = deprecated('zaq.win', zaq.ok, 'zaq.ok');

  zaq.err = zaq.createLogStyle({
    style: 'red',
    prefix: '✘ ERR:',
    level: 'error'
  });

  zaq.fatal = zaq.createLogStyle({
    style: 'red',
    prefix: '✖ FATAL:',
    level: 'fatal'
  });

  zaq.flag = zaq.createLogStyle({
    style: 'magenta',
    prefix: '⚑ FLAG:',
    level: 'info'
  });

  zaq.warn = zaq.createLogStyle({
    style: 'yellow',
    prefix: '⚠ WARN:',
    level: 'warn'
  });

  zaq.info = zaq.createLogStyle({
    style: 'blue',
    prefix: '→ INFO:',
    level: 'info'
  });

  zaq.time = zaq.createLogStyle({
    style: 'grey',
    prefix: '◔ TIME:',
    level: 'info'
  });

  zaq.debug = zaq.createLogStyle({
    style: 'cyan',
    prefix: '⌗ DEBUG:',
    level: 'debug'
  });

  zaq.space = (content, amount = 1, level) => {
    let pad = dim(nLines(amount, '\n'));
    return zaq.log(dim(pad) + reset(content) + dim(pad), level);
  }

  zaq.mini = (str) => str.toString().trim().substr(0, 100);

  zaq.divider = (text = '', options = {}) => {
    const { lineSymbol, centered, space, lineColor } = options;
    if (lineColor && typeof lineColor !== 'string' || !lineColor in chalk)
      throw new TypeError('zaq.divider: invalid lineColor option. Use a "chalk" color.');
    const { columns } = process.stdout;
    const namespacePrefix = getNamespacePrefix();
    const textWidth = text && text.length
      ? stripAnsi(text).length + (centered ? 2 : 1)
      : 0;
    const NAMESPACE = lineColor
      ? chalk.dim[lineColor](namespacePrefix)
      : chalk.dim(namespacePrefix);

    let lineCount = Math.floor((columns - textWidth - namespacePrefix.length) / (lineSymbol ? stripAnsi(lineSymbol).length : 1));
    lineCount = centered ? Math.ceil(lineCount / 2) : lineCount;
    lineCount = Math.max(0, lineCount);

    let filler = nLines(lineCount, lineSymbol);
    filler = lineColor ? chalk[lineColor](filler) : filler;

    const output = NAMESPACE + ' ' + (centered
      ? `${filler} ${text} ${filler}`
      : `${text} ${filler}`
    );
    return zaq.space(output, space, 'info');
  };

  zaq.weight = (...pathParts) => {
    const file = path.join(...pathParts);
    const basename = path.basename(file);
    let stats;
    try {
      stats = fs.statSync(file);
    } catch (e) {
      return zaq.warn(`File ${chalk.yellow.italic(basename)} not found, cannot be weighed.`);
    }
    let filesize = (stats.size / 1024).toFixed(2);
    zaq.info(`File ${blue.italic(basename)} is ${blue(filesize)} kb`);
  };
  namespaceCache.set(namespace, zaq);
  return zaq;
}

const defaultInstance = faqtory();
defaultInstance.as = faqtory;
module.exports = defaultInstance;
