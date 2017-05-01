webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gsap = __webpack_require__(8);

var customEase = __webpack_require__(5);

document.addEventListener('DOMContentLoaded', ready);

// initialize

function ready() {
    toggle = $('.toggle');
    holder = $('#holder')[0];
    experiment = $('#experiment')[0];
    bio = $('#bio')[0];
    slider = $('#slider')[0];
    header = $('header')[0];

    // listeners
    toggle[0].addEventListener('click', toggleExperiments);
    toggle[1].addEventListener('click', toggleExperiments);

    setupHeadline();
    resizeUpdate();
}

var clickTimer = false,
    restartTimer = void 0,
    letters = void 0,
    primary = '#d5ece7',
    primary_dark = '#7208fd',
    primary_darker = '#4f3a6b',
    text_primary = 'white',
    //'#888',
text_light = 'white',
    state = 'bio',
    duration = 0.4,
    toggle = void 0,
    header = void 0,
    holder = void 0,
    bio = void 0,
    experiment = void 0,
    slider = void 0,
    swoop = customEase(0.52, 0.85, 0.93, 0.51);

var states = {
    experiment: {
        text: text_light,
        bg: primary_darker,
        holderBg: primary,
        headerText: primary
    },
    bio: {
        text: text_primary,
        bg: primary,
        holderBg: '#6122b3',
        headerText: primary_dark
    }
};

var $ = document.querySelectorAll.bind(window.document);

// handlers


function toggleExperiments() {
    event.preventDefault();

    var targetHeight = void 0,
        slide = void 0;

    if (state !== 'experiment') {
        state = 'experiment';
        targetHeight = experiment.getBoundingClientRect().height;
        slide = -getComputedStyle(bio).height.slice(0, -2) - 20;
    } else {
        state = 'bio';
        targetHeight = bio.getBoundingClientRect().height - 20;
        slide = 0;
    }

    var _states$state = states[state],
        holderBg = _states$state.holderBg,
        bg = _states$state.bg,
        text = _states$state.text,
        headerText = _states$state.headerText;


    holder.classList.toggle('mds1');

    _gsap.TweenMax.to(holder, duration, {
        backgroundColor: holderBg,
        color: text,
        height: targetHeight,
        opacity: 1,
        ease: swoop
    });

    _gsap.TweenMax.to(header, duration, {
        ease: swoop,
        color: headerText
    });

    _gsap.TweenMax.to(document.body, duration, {
        backgroundColor: bg,
        ease: swoop
    });

    _gsap.TweenMax.to(slider, duration, {
        y: slide,
        ease: swoop
    });
}

// utilities

function resizeUpdate() {
    holder.style.height = getComputedStyle(bio).height;
    _gsap.TweenMax.set(slider, {
        y: state === 'bio' ? 0 : -getComputedStyle(bio).height.slice(0, -2) - 20
    });
}

function setupHeadline() {
    var headline = document.getElementById('greeting');

    splitText(headline);
    addWiggles(headline);
    letters = document.getElementsByClassName('headline-letter');
    setTimeout(function () {
        return shake([letters[0], letters[3], letters[7], letters[14]], 15, 0.08);
    }, 1000);
}

function splitText(el) {
    var text = el.textContent || el.innerText;
    var words = [];
    var word = document.createElement('span');
    el.textContent = '';
    text = text.split('');

    text.forEach(function (letter) {
        var temp = document.createElement('small');
        temp.textContent = letter;
        temp.classList.add('headline-letter');
        if (letter === ' ') {
            temp.classList.add('headline-space');
            word = document.createElement('span');
            word.classList.add('headline-word');
        }
        word.append(temp);
        words.push(word);
        var pos = temp.getBoundingClientRect();
    });

    words.forEach(function (word) {
        return el.append(word);
    });
}

function addWiggles(parent) {
    function handler() {
        if (clickTimer) return;
        if (event.target.nodeName === 'SMALL') {
            var dir = setDirection(event);
            shake(event.target, 5, 0.1, false, dir);
        }
    }
    parent.addEventListener('mousemove', handler);
    parent.addEventListener('touchmove', handler);
}

function setDirection(event) {
    return {
        x: (event.offsetX - event.target.clientWidth / 2) / event.target.clientWidth,
        y: (event.offsetY - event.target.clientHeight / 2) / event.target.clientHeight
    };
}

function resetLetters() {
    clickTimer = true;
    var letters = [].slice.call(document.getElementsByClassName('headline-letter'));

    _gsap.TweenMax.staggerTo(letters, 0.8, {
        ease: _gsap.Elastic.easeOut.config(1, 0.4),
        x: 0,
        y: 0,
        rotation: 0
    }, 0.07);

    setTimeout(function () {
        return clickTimer = false;
    }, 1500);
}

function shake(el, shakes, speed) {
    var revert = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var dir = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : { x: 0, y: 0 };
    var delay = arguments[5];

    clearTimeout(restartTimer);
    restartTimer = setTimeout(resetLetters, 2000);

    if (el instanceof HTMLCollection || el instanceof Array) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = el[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var child = _step.value;

                shake(child, shakes, speed, revert, dir, delay);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return;
    }

    var tl = new _gsap.TimelineLite({ delay: delay });
    _gsap.TweenMax.set(el, {
        x: '+=0'
    });
    var transforms = el._gsTransform;

    var initProps = {
        x: transforms.x,
        y: transforms.y,
        rotation: transforms.rotation
    };

    for (var i = 0; i < shakes; i++) {
        tl.to(el, speed, {
            x: initProps.x + R(-4, 4) - dir.x * 20,
            y: initProps.y + R(-2, 2) - dir.y * 20,
            rotation: initProps.rotation + R(-20, 10)
        });
    }

    if (revert) tl.to(el, speed, {
        x: initProps.x,
        y: initProps.y,
        scale: initProps.scale,
        rotation: initProps.rotation
    });

    return tl;
}

function R(max, min) {
    return Math.random() * (max - min) + min;
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

__webpack_require__(2);

/***/ })
],[3]);