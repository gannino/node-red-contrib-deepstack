const chai = require('chai');
const expect = chai.expect;
const rewire = require("rewire");

describe('Deepstack scene detection', function() {
    describe('#sceneDetection()', function() {
        var deepstackOjectDetection;
        var sceneDetection;

        beforeEach(function(){
            deepstackOjectDetection = rewire('../deepstack-scene-detection.js');
            sceneDetection = deepstackOjectDetection.__get__('sceneDetection');
        });
        
        it('should set duration from deepstack result', async function() {
            const duration = 10;
            let deepstackMock = {
                sceneDetection: function (original, server, confidence) {
                    return new Promise((resolve, reject) => {
                        resolve({duration: duration});
                    });
                }
            };

            deepstackOjectDetection.__set__("deepstack", deepstackMock);

            var outputs = await sceneDetection({payload: {}},{filters: []},{});
            expect(outputs[0].duration).to.equal(duration);
        });
        
        it('should set duration to 0 for missing duration', async function() {
            const duration = undefined;
            let deepstackMock = {
                sceneDetection: function (original, server, confidence) {
                    return new Promise((resolve, reject) => {
                        resolve({duration: duration});
                    });
                }
            };

            deepstackOjectDetection.__set__("deepstack", deepstackMock);

            var outputs = await sceneDetection({payload: {}},{filters: []},{});
            expect(outputs[0].duration).to.equal(0);
        });
        
        it('should handle floats', async function() {
            const duration = 0.123;
            let deepstackMock = {
                sceneDetection: function (original, server, confidence) {
                    return new Promise((resolve, reject) => {
                        resolve({duration: duration});
                    });
                }
            };

            deepstackOjectDetection.__set__("deepstack", deepstackMock);

            var outputs = await sceneDetection({payload: {}},{filters: []},{});
            expect(outputs[0].duration).to.equal(duration);
        });
    });
});