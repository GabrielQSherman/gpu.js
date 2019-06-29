const { assert, skip, test, module: describe, only } = require('qunit');
const { GPU } = require('../../../../../../src');

describe('feature: to-string single precision constants HTMLImage');

function testArgument(mode, done) {
  const image = new Image();
  image.src = 'data:image/jpeg;base64,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';
  image.onload = () => {
    const gpu = new GPU({mode});
    const originalKernel = gpu.createKernel(function (a) {
      const pixel = a[0][0];
      return pixel.b * 255;
    }, {
      output: [1],
      precision: 'single',
      argumentTypes: ['HTMLImage'],
    });
    const canvas = originalKernel.canvas;
    const context = originalKernel.context;
    assert.deepEqual(originalKernel(image)[0], 253);
    const kernelString = originalKernel.toString(image);
    const newKernel = new Function('return ' + kernelString)()({context, canvas});
    assert.deepEqual(newKernel(image)[0], 253);
    gpu.destroy();
    done();
  }
}

(GPU.isSinglePrecisionSupported && GPU.isWebGLSupported ? test : skip)('webgl', t => {
  testArgument('webgl', t.async());
});

(GPU.isSinglePrecisionSupported && GPU.isWebGL2Supported ? test : skip)('webgl2', t => {
  testArgument('webgl2', t.async());
});

