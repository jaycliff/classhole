/*
    Copyright 2014 Jaycliff Arcilla
    
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
(function (global) {
    "use strict";
    var hasClass,
        addClass,
        removeClass;
    if (!document.documentElement.classList) {
        (function () {
            var collection_of_regex = {};
            hasClass = function (element, cls) {
                if (!collection_of_regex.hasOwnProperty(cls)) {
                    collection_of_regex[cls] = new RegExp('(?:^|\\s)' + cls + '(?!\\S)', 'g');
                }
                return collection_of_regex[cls].test(element.className);
            };
            addClass = function (element, cls) {
                if (!hasClass(element, cls)) {
                    element.className += (' ' + cls);
                }
            };
            removeClass = function (element, cls) {
                if (!collection_of_regex.hasOwnProperty(cls)) {
                    collection_of_regex[cls] = new RegExp('(?:^|\\s)' + cls + '(?!\\S)', 'g');
                }
                element.className = element.className.replace(collection_of_regex[cls], '');
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
        Object.defineProperty(global, 'hasClass', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: hasClass
        });
        Object.defineProperty(global, 'addClass', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: addClass
        });
        Object.defineProperty(global, 'removeClass', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: removeClass
        });
    } else {
        global.hasClass = hasClass;
        global.addClass = addClass;
        global.removeClass = removeClass;
    }
}(window));
