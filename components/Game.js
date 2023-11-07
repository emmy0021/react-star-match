"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _mathUtils = _interopRequireDefault(require("../math-utils"));
var _StarsDisplay = _interopRequireDefault(require("./StarsDisplay"));
var _PlayNumber = _interopRequireDefault(require("./PlayNumber"));
var _PlayAgain = _interopRequireDefault(require("./PlayAgain"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useGameState = timeLimit => {
  const [stars, setStars] = (0, _react.useState)(_mathUtils.default.random(1, 9));
  const [availableNums, setAvailableNums] = (0, _react.useState)(_mathUtils.default.range(1, 9));
  const [candidateNums, setCandidateNums] = (0, _react.useState)([]);
  const [secondsLeft, setSecondsLeft] = (0, _react.useState)(10);
  (0, _react.useEffect)(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  });
  const setGameState = newCandidateNums => {
    if (_mathUtils.default.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));
      setStars(_mathUtils.default.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };
  return {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState
  };
};
const Game = props => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState
  } = useGameState();
  const candidatesAreWrong = _mathUtils.default.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';
  const numberStatus = number => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };
  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || secondsLeft === 0) {
      return;
    }
    const newCandidateNums = currentStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);
    setGameState(newCandidateNums);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "game"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "help"
  }, "Pick 1 or more numbers that sum to the number of stars"), /*#__PURE__*/_react.default.createElement("div", {
    className: "body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "left"
  }, gameStatus !== 'active' ? /*#__PURE__*/_react.default.createElement(_PlayAgain.default, {
    onClick: props.startNewGame,
    gameStatus: gameStatus
  }) : /*#__PURE__*/_react.default.createElement(_StarsDisplay.default, {
    count: stars
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "right"
  }, _mathUtils.default.range(1, 9).map(number => /*#__PURE__*/_react.default.createElement(_PlayNumber.default, {
    key: number,
    status: numberStatus(number),
    number: number,
    onClick: onNumberClick
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "timer"
  }, "Time Remaining: ", secondsLeft));
};
var _default = exports.default = Game;