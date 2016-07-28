tui.util.defineNamespace("fedoc.content", {});
fedoc.content["dataModels_seriesItem.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview SeriesItem is a element of SeriesGroup.items.\n * SeriesItem has processed terminal data like value, ratio, etc.\n * @author NHN Ent.\n *         FE Development Lab &lt;dl_javascript@nhnent.com>\n */\n\n'use strict';\n\nvar chartConst = require('../const');\nvar renderUtil = require('../helpers/renderUtil');\nvar calculator = require('../helpers/calculator');\n\nvar SeriesItem = tui.util.defineClass(/** @lends SeriesItem.prototype */{\n    /**\n     * SeriesItem is a element of SeriesGroup.items.\n     * SeriesItem has processed terminal data like value, ratio, etc.\n     * @constructs SeriesItem\n     * @param {number} value - value\n     * @param {?string} stack - stack\n     * @param {?Array.&lt;function>} formatFunctions - format functions\n     * @param {string} chartType - type of chart\n     */\n    init: function(value, stack, formatFunctions, chartType) {\n        /**\n         * type of chart\n         * @type {string}\n         */\n        this.chartType = chartType;\n\n        /**\n         * for group stack option.\n         * @type {string}\n         */\n        this.stack = stack || chartConst.DEFAULT_STACK;\n\n        /**\n         * format functions\n         * @type {Array.&lt;function>}\n         */\n        this.formatFunctions = formatFunctions;\n\n        /**\n         * whether range item or not\n         * @type {boolean}\n         */\n        this.isRange = false;\n\n        /**\n         * value of item\n         * @type {number}\n         */\n        this.value = null;\n\n        /**\n         * label\n         * @type {string}\n         */\n        this.label = null;\n\n        /**\n         * ratio of value about distance of limit\n         * @type {number}\n         */\n        this.ratio = null;\n\n        /**\n         * end value of item.\n         * @type {number}\n         */\n        this.end = null;\n\n        /**\n         * end label\n         * @type {number}\n         */\n        this.endLabel = null;\n\n        /**\n         * ratio of end value\n         * @type {number}\n         */\n        this.endRatio = null;\n\n        /**\n         * start value of item.\n         * @type {number}\n         */\n        this.start = null;\n\n        /**\n         * start label\n         * @type {number}\n         */\n        this.startLabel = null;\n\n        /**\n         * ratio of start value\n         * @type {number}\n         */\n        this.startRatio = null;\n\n        /**\n         * distance of start ratio and end ratio\n         * @type {null}\n         */\n        this.ratioDistance = null;\n\n        this._initValues(value);\n    },\n\n    /**\n     * Initialize values of item.\n     * @param {number} value - value\n     * @private\n     */\n    _initValues: function(value) {\n        var values = this._createValues(value);\n        var areaType = 'makingSeriesLabel';\n        var hasStart = values.length > 1;\n\n        this.value = this.end = values[0];\n        this.label = renderUtil.formatValue(this.value, this.formatFunctions, this.chartType, areaType);\n        this.endLabel = this.label;\n\n        if (hasStart) {\n            this.addStart(values[1], true);\n            this._updateFormattedValueforRange();\n            this.isRange = true;\n        }\n    },\n\n    /**\n     * Crete sorted values.\n     * @param {Array.&lt;number>|number} value value\n     * @returns {Array.&lt;number>}\n     * @private\n     */\n    _createValues: function(value) {\n        var values = tui.util.map([].concat(value), parseFloat);\n\n        values = values.sort(function(a, b) {\n            if (a &lt; 0 &amp;&amp; b &lt; 0) {\n                return a - b;\n            }\n\n            return b - a;\n        });\n\n        return values;\n    },\n\n    /**\n     * Add start.\n     * @param {number} value - value\n     * @private\n     */\n    addStart: function(value) {\n        if (!tui.util.isNull(this.start)) {\n            return;\n        }\n\n        this.start = value;\n        this.startLabel = renderUtil.formatValue(value, this.formatFunctions, this.chartType, 'series');\n    },\n\n    /**\n     * Update formatted value for range.\n     * @private\n     */\n    _updateFormattedValueforRange: function() {\n        this.label = this.startLabel + ' ~ ' + this.endLabel;\n    },\n\n    /**\n     * Add ratio.\n     * @param {number} divNumber - number for division\n     * @param {?number} subNumber - number for subtraction\n     * @param {?number} baseRatio - base ratio\n     */\n    addRatio: function(divNumber, subNumber, baseRatio) {\n        divNumber = divNumber || 1;\n        baseRatio = baseRatio || 1;\n        subNumber = subNumber || 0;\n\n        this.ratio = this.endRatio = calculator.calculateRatio(this.value, divNumber, subNumber, baseRatio);\n\n        if (!tui.util.isNull(this.start)) {\n            this.startRatio = calculator.calculateRatio(this.start, divNumber, subNumber, baseRatio);\n            this.ratioDistance = Math.abs(this.endRatio - this.startRatio);\n        }\n    },\n\n    /**\n     * Pick value map.\n     * @returns {{value: number, start: ?number, end: ?number}}\n     */\n    pickValueMap: function() {\n        return {\n            value: this.value,\n            start: this.start,\n            end: this.end\n        };\n    }\n});\n\nmodule.exports = SeriesItem;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"