/*
    Copyright 2015 Jaycliff Arcilla
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
/*jslint browser: true, devel: true */
if (!String.prototype.trim) {
    (function (rtrim) {
        "use strict";
        String.prototype.trim = function () {
            return this.replace(rtrim, '');
        };
        // Make sure we trim BOM and NBSP
    }(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g));
}
(function (window) {
    "use strict";
    var classhole,
        hasClass,
        addClass,
        removeClass;
    if (window.hasOwnProperty('classhole') && typeof window.classhole === "object") {
        return;
    }
    classhole = {};
    if (typeof document.documentElement.classList !== "object") {
        (function () {
            var collection_of_regex = {};
            hasClass = function (element, cls) {
                cls = String(cls).trim();
                if (cls === '') {
                    throw new TypeError('The token provided must not be empty');
                }
                if (!collection_of_regex.hasOwnProperty(cls)) {
                    collection_of_regex[cls] = new RegExp('(?:^|\\s)' + cls + '(?!\\S)', 'g');
                }
                return collection_of_regex[cls].test(element.className);
            };
            addClass = function (element, cls) {
                cls = String(cls).trim();
                if (cls === '') {
                    throw new TypeError('The token provided must not be empty');
                }
                if (!hasClass(element, cls)) {
                    element.className += (' ' + cls);
                }
            };
            removeClass = function (element, cls) {
                cls = String(cls).trim();
                if (cls === '') {
                    throw new TypeError('The token provided must not be empty');
                }
                if (!collection_of_regex.hasOwnProperty(cls)) {
                    collection_of_regex[cls] = new RegExp('(?:^|\\s)' + cls + '(?!\\S)', 'g');
                }
                element.className = (element.className.replace(collection_of_regex[cls], '')).trim();
            };
        }());
    } else {
        hasClass = function (element, cls) {
            return element.classList.contains(cls);
        };
        addClass = function (element, cls) {
            element.classList.add(cls);
        };
        removeClass = function (element, cls) {
            element.classList.remove(cls);
        };
    }
    if (typeof Object.defineProperty === "function") {
        Object.defineProperty(classhole, 'hasClass', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: hasClass
        });
        Object.defineProperty(classhole, 'addClass', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: addClass
        });
        Object.defineProperty(classhole, 'removeClass', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: removeClass
        });
        Object.defineProperty(window, 'classhole', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: classhole
        });
        Object.defineProperty(window, 'hasClass', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: hasClass
        });
        Object.defineProperty(window, 'addClass', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: addClass
        });
        Object.defineProperty(window, 'removeClass', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: removeClass
        });
    } else {
        classhole.hasClass = hasClass;
        classhole.addClass = addClass;
        classhole.removeClass = removeClass;
        window.classhole = classhole;
        window.hasClass = hasClass;
        window.addClass = addClass;
        window.removeClass = removeClass;
    }
}(window));
