(function() {
  var Logger, pgkinfo, _;

  pgkinfo = require('pkginfo')(module, 'version');

  _ = require('underscore');

  module.exports = Logger = (function() {

    Logger.defaultConfig = {
      showMillis: false,
      showTimestamp: true,
      stringifyJSON: true,
      prefix: ""
    };

    function Logger(config) {
      if (config == null) config = {};
      this.config = _.defaults(config, Logger.defaultConfig);
    }

    Logger.prototype.padZeros = function(num, digits) {
      var zerosToAdd;
      num = String(num);
      zerosToAdd = digits - num.length;
      while (zerosToAdd > 0) {
        num = '0' + num;
        zerosToAdd = zerosToAdd - 1;
      }
      return num;
    };

    Logger.prototype.log = function(msg, level) {
      var date, output, timestamp;
      date = new Date;
      timestamp = date.getFullYear() + "-" + this.padZeros(date.getMonth() + 1, 2) + "-" + this.padZeros(date.getDate(), 2) + " " + this.padZeros(date.getHours(), 2) + ":" + this.padZeros(date.getMinutes(), 2) + ":" + this.padZeros(date.getSeconds(), 2);
      if (this.config.showMillis) {
        timestamp += "." + this.padZeros(date.getMilliseconds(), 3);
      }
      if (this.config.stringifyJSON) msg = JSON.stringify(msg);
      output = '';
      if (this.config.showTimestamp) output += '[' + timestamp + ']';
      if (this.config.prefix !== "") output += ' ' + this.config.prefix;
      output += ' (' + level + ') ';
      output += msg;
      return console.log(output);
    };

    Logger.prototype.error = function(msg) {
      return this.log(msg, 'error');
    };

    Logger.prototype.info = function(msg) {
      return this.log(msg, 'info');
    };

    Logger.prototype.warn = function(msg) {
      return this.log(msg, 'warning');
    };

    Logger.prototype.debug = function(msg) {
      return this.log(msg, 'debug');
    };

    return Logger;

  })();

}).call(this);