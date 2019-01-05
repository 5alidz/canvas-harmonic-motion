// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"utils/createCanvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(opts) {
  var canvas = document.createElement('canvas');
  var container = document.getElementById('canvas-container');
  canvas.width = opts.width;
  canvas.height = opts.height;
  canvas.style = 'box-shadow: 1px 2px 10px 0px rgba(0,0,0,0.2)';
  container.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  return {
    canvas: canvas,
    ctx: ctx
  };
};

exports.default = _default;
},{}],"utils/background.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(color, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, window.innerWidth, 500);
};

exports.default = _default;
},{}],"utils/createElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default(type) {
  var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var element = document.createElement(type);
  Object.entries(attr).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    element.setAttribute(key, value);
  });

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  children.forEach(function (child) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
};

exports.default = _default;
},{}],"utils/rect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(opts, ctx) {
  var x = opts.x,
      y = opts.y,
      w = opts.w,
      h = opts.h,
      c = opts.c;
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
};

exports.default = _default;
},{}],"utils/squares.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rect = _interopRequireDefault(require("./rect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = function _default(opts, callback, ctx) {
  var count = opts.count,
      x = opts.x,
      y = opts.y,
      w = opts.w,
      h = opts.h,
      c = opts.c;

  var _ = _toConsumableArray(Array(count)).map(function (el, i) {
    return i;
  });

  return _.map(function (index) {
    (0, _rect.default)({
      x: x + index * w,
      y: callback ? callback(index, _.length) + y : y,
      w: w,
      h: h,
      c: c
    }, ctx);
  });
};

exports.default = _default;
},{"./rect.js":"utils/rect.js"}],"demos/demo-a-perf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.renderUiA = void 0;

var _squares = _interopRequireDefault(require("../utils/squares.js"));

var _createElement = _interopRequireDefault(require("../utils/createElement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var renderUiA = function renderUiA() {
  var domTarget = document.getElementById('wrapper');
  domTarget.innerHTML = '';
  var speedButton = (0, _createElement.default)('button', {
    'class': 'btn normal-btn normal'
  }, '2X SPEED');
  var resetButton = (0, _createElement.default)('button', {
    'class': 'btn normal-btn normal'
  }, 'RESET');
  var wrapper = (0, _createElement.default)('div', {}, speedButton, resetButton);
  domTarget.appendChild(wrapper);
  return [resetButton, speedButton];
};

exports.renderUiA = renderUiA;

var _default = function _default(ctx, precalc, range) {
  var _index = 0;
  var pre = precalc; // setup

  var initial = {
    count: 20,
    x: -100,
    y: -140,
    w: 10,
    h: 10,
    c: 'rgb(250, 30, 50)'
  };
  var y = initial.y;

  var conf2 = _objectSpread({}, initial, {
    y: y + 50,
    c: 'rgb(250,30,80)'
  });

  var conf3 = _objectSpread({}, initial, {
    y: y + 100,
    c: 'rgb(250,30,100)'
  });

  var conf4 = _objectSpread({}, initial, {
    y: y + 150,
    c: 'rgb(200,30,100)'
  });

  var conf5 = _objectSpread({}, initial, {
    y: y + 200,
    c: 'rgb(100,30,200)'
  });

  var conf6 = _objectSpread({}, initial, {
    y: y + 250,
    c: 'rgb(100,30,250)' // side-effect

  });

  return function () {
    ctx.save();
    ctx.translate(Math.floor(window.innerWidth / 2), 250);
    (0, _squares.default)(initial, function (index) {
      return pre[_index][0][index];
    }, ctx);
    (0, _squares.default)(conf2, function (index) {
      return pre[_index][1][index];
    }, ctx);
    (0, _squares.default)(conf3, function (index) {
      return pre[_index][2][index];
    }, ctx);
    (0, _squares.default)(conf4, function (index) {
      return pre[_index][3][index];
    }, ctx);
    (0, _squares.default)(conf5, function (index) {
      return pre[_index][4][index];
    }, ctx);
    (0, _squares.default)(conf6, function (index) {
      return pre[_index][5][index];
    }, ctx);
    _index += 1;
    if (_index >= range) _index = _index % range;
    ctx.restore();
  };
};

exports.default = _default;
},{"../utils/squares.js":"utils/squares.js","../utils/createElement.js":"utils/createElement.js"}],"utils/circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(x, y, r, ctx) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
};

exports.default = _default;
},{}],"utils/miniEngine.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _circle = _interopRequireDefault(require("./circle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blackCircle = function blackCircle(x, y, r, ctx) {
  ctx.save();
  ctx.fillStyle = '#333';
  (0, _circle.default)(x, y, r, ctx);
  ctx.fill();
  ctx.restore();
};

var _default = function _default(x, y, r, offset, angle, ctx) {
  var _r = r / 3;

  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  (0, _circle.default)(x, y, r, ctx);
  blackCircle(x + r * Math.cos(angle + offset), y + r * Math.sin(angle + offset), _r * 0.7, ctx);
  ctx.restore();
};

exports.default = _default;
},{"./circle.js":"utils/circle.js"}],"utils/oscillator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(amp, angle) {
  return {
    amp: amp,
    angle: angle
  };
};

exports.default = _default;
},{}],"utils/line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(x1, y1, x2, y2, ctx) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

exports.default = _default;
},{}],"demos/demo-b-perf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _miniEngine = _interopRequireDefault(require("../utils/miniEngine.js"));

var _oscillator = _interopRequireDefault(require("../utils/oscillator.js"));

var _line = _interopRequireDefault(require("../utils/line.js"));

var _createElement = _interopRequireDefault(require("../utils/createElement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init_ui = function init_ui() {
  var domTarget = document.getElementById('wrapper');
  domTarget.innerHTML = '';
  var revealButton = (0, _createElement.default)('button', {
    'class': 'btn normal-btn normal'
  }, 'Reveal Mechanism');
  domTarget.appendChild(revealButton);
  return function (cb) {
    revealButton.onclick = function () {
      cb(revealButton);
    };
  };
};

var greyline = function greyline(x, y, x1, y1, ctx) {
  ctx.save();
  ctx.strokeStyle = '#aaa';
  (0, _line.default)(x, y, x1, y1, ctx);
  ctx.restore();
};

var _default = function _default(ctx, precalc) {
  // config.
  var revealMechanism = false;
  var revealOnclick = init_ui();
  var r = 15; // radius of each circle.

  var range = 500; // total of 125 saved frames.

  revealOnclick(function (button) {
    if (!revealMechanism) button.innerHTML = 'Hide Mechanism';
    if (revealMechanism) button.innerHTML = 'Reveal Mechanism';
    revealMechanism = !revealMechanism;
  });
  var _index = 0;
  return function () {
    ctx.save();
    ctx.translate(window.innerWidth / 2 - 120, 120);

    precalc[_index].map(function (point) {
      var x = point.x,
          y = point.y;

      if (point.pxr && point.pyr) {
        var pxr = point.pxr,
            pyr = point.pyr;
        greyline(x, y, pxr, pyr, ctx);
      }

      if (point.pxl && point.pyl) {
        var pxl = point.pxl,
            pyl = point.pyl;
        greyline(x, y, pxl, pyl, ctx);
      }

      if (point.pxv && point.pyv) {
        var pxv = point.pxv,
            pyv = point.pyv;
        (0, _line.default)(x, y, pxv, pyv, ctx);
      }

      if (point.pxh && point.pyh) {
        var pxh = point.pxh,
            pyh = point.pyh;
        (0, _line.default)(x, y, pxh, pyh, ctx);
      }

      if (revealMechanism) {
        var rm = point.rMech;
        greyline(rm.x, rm.y, x, y, ctx);
        (0, _miniEngine.default)(rm.x, rm.y, r, rm.offset, rm.angle, ctx);
      }
    });

    ctx.restore();
    _index += 1;

    if (_index >= range) {
      _index = _index % range;
    }
  };
};

exports.default = _default;
},{"../utils/miniEngine.js":"utils/miniEngine.js","../utils/oscillator.js":"utils/oscillator.js","../utils/line.js":"utils/line.js","../utils/createElement.js":"utils/createElement.js"}],"sketch.js":[function(require,module,exports) {
"use strict";

var _createCanvas2 = _interopRequireDefault(require("./utils/createCanvas.js"));

var _background = _interopRequireDefault(require("./utils/background.js"));

var _createElement = _interopRequireDefault(require("./utils/createElement.js"));

var _demoAPerf = _interopRequireWildcard(require("./demos/demo-a-perf.js"));

var _demoBPerf = _interopRequireWildcard(require("./demos/demo-b-perf.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//import demoE from './demos/demo-e.js'
//import demoG from './demos/demo-g.js'
var worker = new Worker("/worker.ab30da2c.js");

var _createCanvas = (0, _createCanvas2.default)({
  width: window.innerWidth,
  height: 500
}),
    ctx = _createCanvas.ctx;

var demos = [_demoAPerf.default, _demoBPerf.default
/*demoG*/
];
var demo;
var frames = [];
var currentDemo = 0;
var preDemoA = {
  'a': {
    mult: 1,
    range: 80
  }
};
var preDemoB = {
  'b': {
    r: 15,
    range: 500,
    speed: 0.05
  }
};
worker.postMessage(preDemoA);

worker.onmessage = function (e) {
  if (e.data['a']) {
    var _renderUiA = (0, _demoAPerf.renderUiA)(),
        _renderUiA2 = _slicedToArray(_renderUiA, 2),
        resetButton = _renderUiA2[0],
        speedButton = _renderUiA2[1];

    resetButton.onclick = function () {
      preDemoA['a'].mult = 1;
      worker.postMessage(preDemoA);
    };

    speedButton.onclick = function () {
      preDemoA['a'].mult += 1;
      worker.postMessage(preDemoA);
    };

    frames = e.data['a'];
    demo = demos[0](ctx, frames, preDemoA['a'].range);
  }

  if (e.data['b']) {
    frames = e.data['b'];
    demo = demos[1](ctx, frames);
  }
};

var wrapper = document.getElementById('wrapper-demos');
var next = (0, _createElement.default)('button', {
  'class': "btn normal-btn ".concat(currentDemo === demos.length - 1 ? 'disabled-btn' : '')
}, 'Next');
var prev = (0, _createElement.default)('button', {
  'class': 'btn normal-btn disabled-btn'
}, 'Previous');

prev.onclick = function () {
  worker.postMessage(preDemoA);
  if (currentDemo === 0) return;

  if (currentDemo <= 1) {
    currentDemo -= 1;
    prev.style.color = '#aaa';
    return;
  }

  next.style.color = '#222';
  prev.style.color = '#222';
  currentDemo -= 1;
};

next.onclick = function () {
  worker.postMessage(preDemoB);
  if (currentDemo === demos.length - 1) return;

  if (currentDemo >= demos.length - 2) {
    currentDemo += 1;
    next.style.color = '#aaa';
    return;
  }

  next.style.color = '#222';
  prev.style.color = '#222';
  currentDemo += 1;
};

wrapper.appendChild(prev);
wrapper.appendChild(next);

var draw = function draw() {
  (0, _background.default)('#eee', ctx);

  if (demo) {
    demo();
  }

  window.requestAnimationFrame(draw);
};

draw();
},{"./utils/createCanvas.js":"utils/createCanvas.js","./utils/background.js":"utils/background.js","./utils/createElement.js":"utils/createElement.js","./demos/demo-a-perf.js":"demos/demo-a-perf.js","./demos/demo-b-perf.js":"demos/demo-b-perf.js","./worker.js":[["worker.ab30da2c.js","worker.js"],"worker.ab30da2c.map","worker.js"]}],"../../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56210" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","sketch.js"], null)
//# sourceMappingURL=/sketch.702e4367.map