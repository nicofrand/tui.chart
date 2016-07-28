tui.util.defineNamespace("fedoc.content", {});
fedoc.content["charts_areaChart.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Area chart\n * @author NHN Ent.\n *         FE Development Lab &lt;dl_javascript@nhnent.com>\n */\n\n'use strict';\n\nvar ChartBase = require('./chartBase');\nvar lineTypeMixer = require('./lineTypeMixer');\nvar autoTickMixer = require('./autoTickMixer');\nvar zoomMixer = require('./zoomMixer');\nvar axisTypeMixer = require('./axisTypeMixer');\nvar addingDynamicDataMixer = require('./addingDynamicDataMixer');\nvar rawDataHandler = require('../helpers/rawDataHandler');\nvar Series = require('../series/areaChartSeries');\n\nvar AreaChart = tui.util.defineClass(ChartBase, /** @lends LineChart.prototype */ {\n    /**\n     * className\n     * @type {string}\n     */\n    className: 'tui-area-chart',\n\n    /**\n     * Series class\n     * @type {function}\n     */\n    Series: Series,\n\n    /**\n     * Area chart.\n     * @constructs AreaChart\n     * @extends ChartBase\n     * @param {Array.&lt;Array>} rawData raw data\n     * @param {object} theme chart theme\n     * @param {object} options chart options\n     * @mixes axisTypeMixer\n     * @mixes lineTypeMixer\n     */\n    init: function(rawData, theme, options) {\n        rawDataHandler.removeSeriesStack(rawData.series);\n        this._lineTypeInit(rawData, theme, options);\n        this._initForAutoTickInterval();\n        this._initForAddingData();\n    },\n\n    /**\n     * On change checked legend.\n     * @param {Array.&lt;?boolean> | {line: ?Array.&lt;boolean>, column: ?Array.&lt;boolean>}} checkedLegends checked legends\n     * @param {?object} rawData rawData\n     * @param {?object} boundsParams addition params for calculating bounds\n     * @override\n     */\n    onChangeCheckedLegends: function(checkedLegends, rawData, boundsParams) {\n        this._changeCheckedLegends(checkedLegends, rawData, boundsParams);\n    }\n});\n\ntui.util.extend(AreaChart.prototype,\n    axisTypeMixer, lineTypeMixer, autoTickMixer, zoomMixer, addingDynamicDataMixer);\n\nmodule.exports = AreaChart;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"