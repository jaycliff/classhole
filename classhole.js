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
var classhole = (function () {
    "use strict";
    var ch,
        collection_of_regex = {},
        hasClass,
        addClass,
        removeClass;
    // Whitespace: http://stackoverflow.com/questions/1731190/javascript-check-if-a-string-has-white-space
    window.collection_of_regex = collection_of_regex;
    function hasClass(element, cls) {
        cls = String(cls).trim();
        if (cls === '') {
            throw new TypeError('The token provided must not be empty');
        }
        if (!collection_of_regex.hasOwnProperty(cls)) {
            collection_of_regex[cls] = new RegExp('(?:^|\\s)' + cls + '(?!\\S)', 'g');
        }
        return collection_of_regex[cls].test(element.className);
    }
    function addClass(element, cls) {
        cls = String(cls).trim();
        if (cls === '') {
            throw new TypeError('The token provided must not be empty');
        }
        if (!hasClass(element, cls)) {
            element.className += (' ' + cls);
        }
    }
    function removeClass(element, cls) {
        cls = String(cls).trim();
        if (cls === '') {
            throw new TypeError('The token provided must not be empty');
        }
        if (!collection_of_regex.hasOwnProperty(cls)) {
            collection_of_regex[cls] = new RegExp('(?:^|\\s)' + cls + '(?!\\S)', 'g');
        }
        element.className = (element.className.replace(collection_of_regex[cls], '')).trim();
    }
    ch = {
        'addClass': addClass,
        'removeClass': removeClass,
        'hasClass': hasClass
    };
    if (typeof Object.freeze === "function") {
        Object.freeze(ch);
    }
    return ch;
}());
