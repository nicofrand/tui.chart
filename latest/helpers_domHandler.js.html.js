tui.util.defineNamespace("fedoc.content", {});
fedoc.content["helpers_domHandler.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview DOM Handler.\n * @author NHN Ent.\n *         FE Development Lab &lt;dl_javascript@nhnent.com>\n */\n\n'use strict';\n\nvar aps = Array.prototype.slice;\n\n/**\n * DOM Handler.\n * @module domHandler\n */\nvar domHandler = {\n    /**\n     * Create element.\n     * @memberOf module:domHandler\n     * @param {string} tag html tag\n     * @param {string} newClass class name\n     * @returns {HTMLElement} created element\n     */\n    create: function(tag, newClass) {\n        var el = document.createElement(tag);\n\n        if (newClass) {\n            this.addClass(el, newClass);\n        }\n\n        return el;\n    },\n\n    /**\n     * Get class names.\n     * @memberOf module:domHandler\n     * @param {HTMLElement} el target element\n     * @returns {Array} names\n     * @private\n     */\n    _getClassNames: function(el) {\n        var className, classNames;\n\n        if (el.classList) {\n            classNames = aps.call(el.classList);\n        } else {\n            className = el.className || '';\n            classNames = className &amp;&amp; tui.util.isString(className) ? className.split(' ') : [];\n        }\n\n        return classNames;\n    },\n\n    /**\n     * Add css class to target element.\n     * @memberOf module:domHandler\n     * @param {HTMLElement} el target element\n     * @param {string} newClass add class name\n     */\n    addClass: function(el, newClass) {\n        var classNames, index;\n\n        if (!el || !newClass) {\n            return;\n        }\n\n        classNames = this._getClassNames(el);\n        index = tui.util.inArray(newClass, classNames);\n\n        if (index > -1) {\n            return;\n        }\n\n        classNames.push(newClass);\n        el.className = classNames.join(' ');\n    },\n\n    /**\n     * Remove css class from target element.\n     * @memberOf module:domHandler\n     * @param {HTMLElement} el target element\n     * @param {string} rmClass remove class name\n     */\n    removeClass: function(el, rmClass) {\n        var classNames = this._getClassNames(el),\n            index = tui.util.inArray(rmClass, classNames);\n\n        if (index === -1) {\n            return;\n        }\n\n        classNames.splice(index, 1);\n        el.className = classNames.join(' ');\n    },\n\n    /**\n     * Whether class exist or not.\n     * @memberOf module:domHandler\n     * @param {HTMLElement} el target element\n     * @param {string} findClass target css class\n     * @returns {boolean} has class\n     */\n    hasClass: function(el, findClass) {\n        var classNames = this._getClassNames(el);\n        var index = tui.util.inArray(findClass, classNames);\n\n        return index > -1;\n    },\n\n    /**\n     * Find parent by class name.\n     * @memberOf module:domHandler\n     * @param {HTMLElement} el target element\n     * @param {string} className target css class\n     * @param {string} lastClass last css class\n     * @returns {HTMLElement} result element\n     */\n    findParentByClass: function(el, className, lastClass) {\n        var parent = el.parentNode,\n            result;\n\n        if (!parent) {\n            result = null;\n        } else if (this.hasClass(parent, className)) {\n            result = parent;\n        } else if (parent.nodeName === 'BODY' || this.hasClass(parent, lastClass)) {\n            result = null;\n        } else {\n            result = this.findParentByClass(parent, className, lastClass);\n        }\n\n        return result;\n    },\n\n    /**\n     * Append child element.\n     * @memberOf module:domHandler\n     * @param {HTMLElement} container container element\n     * @param {HTMLElement} children child element\n     */\n    append: function(container, children) {\n        if (!container || !children) {\n            return;\n        }\n        children = tui.util.isArray(children) ? children : [children];\n\n        tui.util.forEachArray(children, function(child) {\n            if (!child) {\n                return;\n            }\n            container.appendChild(child);\n        });\n    }\n};\n\nmodule.exports = domHandler;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"