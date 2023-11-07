"use strict";

var React = _interopRequireWildcard(require("react"));
require("@testing-library/jest-dom/extend-expect");
var _App = require("./App");
var _react2 = require("@testing-library/react");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
describe('App', () => {
  it('renders ansd increments counter', () => {
    const {
      getByText,
      getByTitle,
      asFragment
    } = (0, _react2.render)( /*#__PURE__*/React.createElement(_App.App, {
      initialData: {
        appName: 'TEST'
      }
    }));
    expect(getByText('TEST')).toMatchInlineSnapshot(`
      <h1>
        TEST
      </h1>
    `);
    const button = _react2.screen.getByTitle('increment');
    _react2.fireEvent.click(button);
    expect(getByTitle('increment')).toHaveTextContent('1');
    expect(asFragment()).toMatchSnapshot();
  });
});