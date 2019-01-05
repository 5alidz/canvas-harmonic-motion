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
})({"utils/oscillator.js":[function(require,module,exports) {
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
},{}],"utils/normalDist.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(index, length) {
  var mean = length / 2;

  if (index === mean) {
    return mean;
  }

  if (index > mean) {
    return length - index;
  }

  if (index < mean) {
    return index;
  }
};

exports.default = _default;
},{}],"worker.js":[function(require,module,exports) {
"use strict";

var _oscillator3 = _interopRequireDefault(require("./utils/oscillator.js"));

var _normalDist = _interopRequireDefault(require("./utils/normalDist.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var preCalculateA = function preCalculateA(mult, range) {
  var _oscillator = (0, _oscillator3.default)(1, 0),
      amp = _oscillator.amp,
      angle = _oscillator.angle;

  var arr = function arr(n) {
    return _toConsumableArray(Array(n).keys());
  };

  var all = arr(6).map(function (_) {
    return arr(20);
  });
  range *= mult === 1 ? mult : mult / 2;
  var frames = arr(range);
  var calculatedFrames = frames.map(function (frame) {
    var _singleCalc = all.map(function (_squares, i) {
      return _squares.map(function (square) {
        if (i === 0) {
          var c = (amp + 12) * Math.sin(angle + square * 3);
          return parseFloat(c.toFixed(2));
        }

        if (i === 1) {
          var _ = (0, _normalDist.default)(square, 20);

          var _c = amp * _ * 2 * Math.sin(angle + square * 3);

          return parseFloat(_c.toFixed(2));
        }

        if (i === 2) {
          var _2 = (0, _normalDist.default)(square, 20);

          var _c2 = amp * _2 * Math.sin(angle + _2);

          return parseFloat(_c2.toFixed(2));
        }

        if (i === 3) {
          var _3 = (0, _normalDist.default)(square, 20);

          var _c3 = amp * _3 * Math.sin(angle + square + 0.3);

          return parseFloat(_c3.toFixed(2));
        }

        if (i === 4) {
          var _c4 = (amp + square / 2) * Math.sin(angle + square);

          return parseFloat(_c4.toFixed(2));
        }

        if (i === 5) {
          var _c5 = amp * 10 * Math.sin(angle + square);

          return parseFloat(_c5.toFixed(2));
        }

        return square;
      });
    });

    angle += 0.08 * mult;
    return _singleCalc;
  });
  return calculatedFrames;
};

var preCalculateB = function preCalculateB(r, range, speed) {
  var fix = function fix(n) {
    return parseFloat(n.toFixed(2));
  };

  var getAngle = function getAngle(angle, j) {
    return angle + j * 100;
  };

  var offset = function offset(x, y) {
    return (x + y) / 2;
  };

  var gridify = function gridify(shape, cb) {
    return shape.map(function (x) {
      return shape.map(function (y, j) {
        return cb(x, y, j);
      });
    });
  };

  var _arr = function _arr(n) {
    return _toConsumableArray(Array(n).keys());
  };

  var rows = _toConsumableArray(Array(Math.floor(100 / r))).map(function (el, index) {
    return (index + 1) * 40 - r;
  }); // grid config.


  var grid = gridify(rows, function (x, y, j) {
    return function (angle) {
      var calcAngle = function calcAngle(j, x, y) {
        return getAngle(angle, j) + offset(x, y);
      };

      var _x = x + r * Math.cos(fix(calcAngle(j, x, y)));

      var _y = y + r * Math.sin(fix(calcAngle(j, x, y)));

      return {
        x: fix(_x),
        y: fix(_y)
      };
    };
  });

  var frames = _arr(range);

  var _oscillator2 = (0, _oscillator3.default)(1, 0.0),
      angle = _oscillator2.angle;

  var _frames = [];
  frames.map(function (frame) {
    var arr = [];
    rows.map(function (x, i) {
      rows.map(function (y, j) {
        var obj = {};
        var _x = grid[i][j](angle).x;
        var _y = grid[i][j](angle).y;
        obj.x = _x;
        obj.y = _y;

        if (i + 1 < rows.length && j + 1 < rows.length) {
          // cross right lines
          var pxr = grid[i + 1][j + 1](angle).x;
          var pyr = grid[i + 1][j + 1](angle).y;
          obj.pxr = pxr;
          obj.pyr = pyr;
        }

        if (j - 1 >= 0 && i + 1 < rows.length) {
          // cross left lines
          var pxl = grid[i + 1][j - 1](angle).x;
          var pyl = grid[i + 1][j - 1](angle).y;
          obj.pxl = pxl;
          obj.pyl = pyl;
        }

        if (j + 1 < rows.length) {
          // vertical lines
          var pxv = grid[i][j + 1](angle).x;
          var pyv = grid[i][j + 1](angle).y;
          obj.pxv = pxv;
          obj.pyv = pyv;
        }

        if (i + 1 <= rows.length - 1) {
          // horizontal lines
          var pxh = grid[i + 1][j](angle).x;
          var pyh = grid[i + 1][j](angle).y;
          obj.pxh = pxh;
          obj.pyh = pyh;
        }

        obj.rMech = {
          x: x,
          y: y,
          _x: _x,
          _y: _y,
          offset: fix(offset(x, y)),
          angle: fix(getAngle(angle, j))
        };
        arr.push(obj);
      });
    });
    angle += speed;

    _frames.push(arr);
  });
  return _frames;
};

onmessage = function onmessage(e) {
  if (e.data['a']) {
    var precalc = preCalculateA(e.data['a'].mult, e.data['a'].range);
    postMessage({
      'a': precalc
    });
  }

  if (e.data['b']) {
    var _precalc = preCalculateB(e.data['b'].r, e.data['b'].range, e.data['b'].speed);

    postMessage({
      'b': _precalc
    });
  }
};
},{"./utils/oscillator.js":"utils/oscillator.js","./utils/normalDist.js":"utils/normalDist.js"}],"../../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54792" + '/');

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
},{}]},{},["../../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","worker.js"], null)
//# sourceMappingURL=/worker.ab30da2c.map