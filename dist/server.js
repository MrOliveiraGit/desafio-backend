"use strict";

var _App = _interopRequireDefault(require("./config/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = 8080;
const HOST = '0.0.0.0';

_App.default.listen(PORT, HOST);