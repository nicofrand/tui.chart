/**
 * @fileoverview Test for BubbleChart.
 * @author NHN.
 *         FE Development Lab <dl_javascript@nhn.com>
 */

import LineChart from '../../src/js/charts/lineChart';

describe('Test for lineChart', () => {
    let lineInstance;

    beforeEach(() => {
        spyOn(LineChart.prototype, '_createComponentManager').and.returnValue({
            register: jasmine.createSpy('register'),
            presetAnimationConfig: jasmine.createSpy('presetAnimationConfig')
        });

        lineInstance = new LineChart({
            categories: ['cate1', 'cate2', 'cate3'],
            series: {
                'chartType': []
            }
        }, {
            title: {
                fontSize: 14
            }
        }, {
            chartType: 'line',
            yAxis: [{
                title: 'Temperature (Celsius)'
            }, {
                title: 'Age Group2'
            }]
        });
    });

    describe('constructor()', () => {
        it('hasRightYAxis property must be set.', () => {
            expect(lineInstance.hasRightYAxis).toEqual(jasmine.any(Boolean));
        });

        it('When the second yAxis option is present, the rightYaxis component must be registered.', () => {
            const allCallForRegistComponent = lineInstance.componentManager.register.calls.allArgs();

            expect(allCallForRegistComponent.some(callArgs => callArgs[0] === 'rightYAxis')).toBe(true);
        });
    });

    describe('getScaleOption()', () => {
        it('The ScaleOption generated by getScaleOption() should contain rightYAxis.', () => {
            expect(lineInstance.getScaleOption()).toEqual({
                rightYAxis: jasmine.any(Object),
                yAxis: jasmine.any(Object)
            });
        });
    });
});
