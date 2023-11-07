"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverRenderer = serverRenderer;
var React = _interopRequireWildcard(require("react"));
var ReactDOMServer = _interopRequireWildcard(require("react-dom/server"));
var _App = require("components/App");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
async function serverRenderer() {
  const initialData = {
    appName: 'Reactful'
  };
  const pageData = {
    title: `Hello ${initialData.appName}`
  };
  return Promise.resolve({
    initialData,
    initialMarkup: ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(_App.App, {
      initialData: initialData
    })),
    pageData
  });
}