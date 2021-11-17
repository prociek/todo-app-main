// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"images/icon-sun.svg":[function(require,module,exports) {
module.exports = "/icon-sun.e8063967.svg";
},{}],"images/icon-moon.svg":[function(require,module,exports) {
module.exports = "/icon-moon.4401c989.svg";
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _iconSun = _interopRequireDefault(require("./images/icon-sun.svg"));

var _iconMoon = _interopRequireDefault(require("./images/icon-moon.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  /* GRABING ALL ELEMENTS INTO VARIABLES */
  var toggleModeBtn = document.querySelector(".header__button");
  var todoList = document.querySelector(".todo-list");
  var initialItem = document.querySelector(".todo-list__item");
  /* needed to clone node to not create complet element from scratch */

  var todoForm = document.querySelector(".todo-form");
  var itemsCountEl = document.getElementById("amount");
  var clearCompletedBtn = document.getElementById("clear-completed");
  var selectBtns = document.querySelectorAll(".btn-select");
  var filterAll = document.getElementById("select-all");
  var filterActive = document.getElementById("select-active");
  var filterCompleted = document.getElementById("select-completed");
  /* State */

  var todoListArray = [{
    description: "Hello",
    isCompleted: false,
    id: "0"
  }, {
    description: "Hello World",
    isCompleted: true,
    id: "1"
  }];
  var appliedFilter = "all";
  /* FUNCTIONS */

  /* Toggle Dark/Light mode */

  function toggleMode() {
    if (!document.documentElement.hasAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleModeBtn.querySelector(".header__icon").setAttribute("src", _iconSun.default);
    } else {
      document.documentElement.removeAttribute("data-theme");
      toggleModeBtn.querySelector(".header__icon").setAttribute("src", _iconMoon.default);
    }
  }
  /* Toggle completed Class*/


  function toggleCompletedClass(el) {
    if (el.classList.contains("completed")) {
      el.classList.remove("completed");
      el.classList.remove("checked");
    } else {
      el.classList.add("completed");
      el.classList.add("checked");
    }
  }
  /* Determine before element for place dragging element*/


  function getElementBefore(container, y) {
    var elements = _toConsumableArray(container.querySelectorAll(".todo-list__item"));

    var elBefore = [];
    elements.forEach(function (el) {
      var offset = y - el.getBoundingClientRect().y - el.getBoundingClientRect().height / 2;

      if (offset < 0) {
        elBefore.push(el);
      }
    });

    if (elBefore.length > 0) {
      return elBefore[0];
    }
  }
  /* Create list item element */


  function createItem(el) {
    var item = initialItem.cloneNode(true);
    item.querySelector(".todo-list__text").textContent = el.description;
    item.setAttribute("data-id", "".concat(el.id));

    if (el.isCompleted) {
      toggleCompletedClass(item);
    }
    /* Dragging functionality */


    item.addEventListener("dragstart", function (e) {
      e.target.classList.add("dragging");
    });
    item.addEventListener("dragend", function (e) {
      var container = e.target.parentElement;
      var elBefore = getElementBefore(container, e.clientY);
      /* Place dragging element before founded todo */

      if (elBefore !== undefined) {
        container.insertBefore(e.target, elBefore);
        /* When no element before place dragging element at the end of list */
      } else {
        container.appendChild(e.target);
      }
    });
    return item;
  }
  /* Create list items */


  function createListItems(itemsArray) {
    var fragment = new DocumentFragment();
    itemsArray.forEach(function (el) {
      fragment.appendChild(createItem(el));
    });
    return fragment;
  }
  /* Add Todo */


  function addTodo(e) {
    e.preventDefault();
    if (e.target.children[1].value === "") return;
    var item = {
      description: e.target[1].value,
      isCompleted: false,
      id: new Date().toString()
    };
    todoListArray.push(item);
    /* updating state */

    todoList.appendChild(createItem(item));
    updateCount();
    applayFilter();
    e.target.children[1].value = "";
    saveState();
  }
  /* Toggle completed */


  function toggleCompleted(e) {
    var current = e.target.closest(".todo-list__item");
    var allTodos = document.querySelectorAll(".todo-list__item");
    Array.from(allTodos).forEach(function (el) {
      if (el === current) {
        toggleCompletedClass(current);
        var itemIndex = todoListArray.findIndex(function (todo) {
          return todo.id === current.dataset.id;
        });
        todoListArray[itemIndex].isCompleted = !todoListArray[itemIndex].isCompleted;
        applayFilter();
      }
    });
    updateCount();
    saveState();
  }
  /* Handle Click on item Complete btn and remove btn */


  function handleItemClick(e) {
    if (e.target.closest(".todo-list__btn-check")) {
      /* toggle Completed btn */
      toggleCompleted(e);
    } else if (e.target.closest(".todo-list__btn-remove")) {
      /* remove item */
      var allTodos = document.querySelectorAll(".todo-list__item");
      var current = e.target.closest(".todo-list__item");
      Array.from(allTodos).forEach(function (el) {
        if (el === current) {
          e.target.closest(".todo-list__item").remove();
          todoListArray = todoListArray.filter(function (todo) {
            return todo.id !== current.dataset.id;
          });
        }
      });
      updateCount();
      saveState();
    }
  }
  /* Update items left count */


  function updateCount() {
    var countItems = todoListArray.reduce(function (count, current) {
      return count + (current.isCompleted ? 0 : 1);
    }, 0);
    itemsCountEl.textContent = countItems;
  }
  /* Clear completed functionality */


  function handleClearCompleted() {
    Array.from(document.querySelectorAll(".todo-list__item.completed")).forEach(function (el) {
      return el.remove();
    });
    todoListArray = todoListArray.filter(function (todo) {
      return !todo.isCompleted;
    });
    saveState();
  }
  /* Applay filter */


  function applayFilter() {
    var todos = Array.from(document.querySelectorAll(".todo-list__item"));

    if (appliedFilter === "active") {
      todos.forEach(function (el) {
        if (el.classList.contains("completed")) el.style.display = "none";else el.style.display = "flex";
      });
    } else if (appliedFilter === "completed") {
      todos.forEach(function (el) {
        if (el.classList.contains("completed")) el.style.display = "flex";else el.style.display = "none";
      });
    } else {
      todos.forEach(function (el) {
        el.style.display = "flex";
      });
    }
  }
  /* Handle filter */


  function handleFilter(e) {
    /* Remove active class from all buttons */
    Array.from(selectBtns).forEach(function (btn) {
      return btn.classList.remove("active");
    });
    /* Add class active to clicked button */

    e.target.classList.add("active");

    if (e.target.id === "select-active") {
      appliedFilter = "active";
      applayFilter();
    } else if (e.target.id === "select-completed") {
      appliedFilter = "completed";
      applayFilter();
    } else {
      appliedFilter = "all";
      applayFilter();
    }
  }
  /* Save state in Loncal Storage */


  function saveState() {
    localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
    localStorage.setItem("appliedFilter", JSON.stringify(appliedFilter));
  }
  /* Populate state */


  function populateState() {
    var itemsArray = localStorage.getItem("todoListArray");

    if (itemsArray) {
      todoListArray = JSON.parse(itemsArray);
    }
  }
  /* Initialization */


  window.onload = function () {
    populateState();
    todoList.replaceChild(createListItems(todoListArray), initialItem);
    /* replace initial item with state items */

    updateCount();
  };
  /* EVENT LISTENERS */

  /* Toggle Dark/Light mode */


  toggleModeBtn.addEventListener("click", toggleMode);
  /* Add a todo */

  todoForm.addEventListener("submit", addTodo);
  /* Switch todo completed */

  todoList.addEventListener("click", handleItemClick);
  /* Clear Completed Todos */

  clearCompletedBtn.addEventListener("click", handleClearCompleted);
  /* Applay filte */

  filterAll.addEventListener("click", handleFilter);
  filterActive.addEventListener("click", handleFilter);
  filterCompleted.addEventListener("click", handleFilter);
  /* Dragging todos */
})();
},{"./images/icon-sun.svg":"images/icon-sun.svg","./images/icon-moon.svg":"images/icon-moon.svg"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60409" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map