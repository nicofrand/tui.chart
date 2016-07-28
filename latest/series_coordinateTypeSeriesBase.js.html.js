tui.util.defineNamespace("fedoc.content", {});
fedoc.content["series_coordinateTypeSeriesBase.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview CoordinateTypeSeriesBase is base class for coordinate type series.\n * @author NHN Ent.\n *         FE Development Lab &lt;dl_javascript@nhnent.com>\n */\n\n\n'use strict';\n\nvar renderUtil = require('../helpers/renderUtil');\n\nvar CoordinateTypeSeriesBase = tui.util.defineClass(/** @lends CoordinateTypeSeriesBase.prototype */ {\n    /**\n     * Make series data.\n     * @returns {{\n     *      groupBounds: Array.&lt;Array.&lt;{left: number, top: number, radius: number}>>,\n     *      seriesDataModel: SeriesDataModel\n     * }} series data\n     * @private\n     * @override\n     */\n    _makeSeriesData: function() {\n        var bounds = this._makeBounds();\n\n        return {\n            groupBounds: bounds,\n            seriesDataModel: this._getSeriesDataModel()\n        };\n    },\n\n    /**\n     * showTooltip is mouseover event callback on series graph.\n     * @param {object} params parameters\n     *      @param {boolean} params.allowNegativeTooltip whether allow negative tooltip or not\n     * @param {{top:number, left: number, width: number, height: number}} bound graph bound information\n     * @param {number} groupIndex group index\n     * @param {number} index index\n     * @param {{left: number, top: number}} mousePosition mouse position\n     */\n    showTooltip: function(params, bound, groupIndex, index, mousePosition) {\n        this.fire('showTooltip', tui.util.extend({\n            indexes: {\n                groupIndex: groupIndex,\n                index: index\n            },\n            mousePosition: mousePosition\n        }, params));\n    },\n\n    /**\n     * hideTooltip is mouseout event callback on series graph.\n     */\n    hideTooltip: function() {\n        this.fire('hideTooltip');\n    },\n\n    /**\n     * Render raphael graph.\n     * @param {{width: number, height: number}} dimension dimension\n     * @param {object} seriesData series data\n     * @private\n     * @override\n     */\n    _renderGraph: function(dimension, seriesData) {\n        var showTooltip = tui.util.bind(this.showTooltip, this, {\n            chartType: this.chartType\n        });\n        var callbacks = {\n            showTooltip: showTooltip,\n            hideTooltip: tui.util.bind(this.hideTooltip, this)\n        };\n        var params = this._makeParamsForGraphRendering(dimension, seriesData);\n\n        this.graphRenderer.render(this.seriesContainer, params, callbacks);\n    },\n\n    /**\n     * Make html for label of series area.\n     * @param {{left: number, top: number}} basePosition - position\n     * @param {string} label - label of SeriesItem\n     * @param {number} index - index\n     * @returns {string}\n     * @private\n     */\n    _makeSeriesLabelsHtml: function(basePosition, label, index) {\n        var labelHeight = renderUtil.getRenderedLabelHeight(label, this.theme.label);\n        var labelWidth = renderUtil.getRenderedLabelWidth(label, this.theme.label);\n        var position = {\n            left: basePosition.left - (labelWidth / 2),\n            top: basePosition.top - (labelHeight / 2)\n        };\n\n        return this._makeSeriesLabelHtml(position, label, index);\n    },\n\n    /**\n     * Render series label.\n     * @param {HTMLElement} labelContainer - container for label area\n     * @private\n     */\n    _renderSeriesLabel: function(labelContainer) {\n        var self = this;\n        var seriesDataModel = this._getSeriesDataModel();\n        var html = seriesDataModel.map(function(seriesGroup, groupIndex) {\n            return seriesGroup.map(function(seriesItem, index) {\n                var bound = self.seriesData.groupBounds[groupIndex][index];\n\n                return seriesItem ? self._makeSeriesLabelsHtml(bound, seriesItem.label, index) : '';\n            }).join('');\n        }).join('');\n\n        labelContainer.innerHTML = html;\n    },\n\n    /**\n     * On click series.\n     * @param {{left: number, top: number}} position mouse position\n     */\n    onClickSeries: function(position) {\n        if (this.options.allowSelect) {\n            this._executeGraphRenderer(position, 'clickSeries');\n        }\n    },\n\n    /**\n     * On move series.\n     * @param {{left: number, top: number}} position mouse position\n     */\n    onMoveSeries: function(position) {\n        this._executeGraphRenderer(position, 'moveMouseOnSeries');\n    }\n});\n\nCoordinateTypeSeriesBase.mixin = function(func) {\n    tui.util.extend(func.prototype, CoordinateTypeSeriesBase.prototype);\n};\n\ntui.util.CustomEvents.mixin(CoordinateTypeSeriesBase);\n\nmodule.exports = CoordinateTypeSeriesBase;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"