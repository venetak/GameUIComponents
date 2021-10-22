/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const targetValue = 75;
const animationTime = 100;

const templateNoAnimation = `<gameface-progress-bar></gameface-progress-bar>`;

const templateAnimation100ms = `<gameface-progress-bar data-animation-duration="${animationTime}"></gameface-progress-bar>`;

function setupProgressBar(template) {
  const el = document.createElement('div');
  el.className = 'progress-bar-wrapper';
  el.innerHTML = template;

  // Since we don't want to replace the whole content of the body using
  // innerHtml setter, we query only the current custom element and we replace
  // it with a new one; this is needed because the specs are executed in a random
  // order and sometimes the component might be left in a state that is not
  // ready for testing
  const currentElement = document.querySelector('.progress-bar-wrapper');

  if (currentElement) {
    currentElement.parentElement.removeChild(currentElement);
  }

  document.body.appendChild(el);

  return new Promise(resolve => {
    waitForStyles(resolve);
  });
}

describe('Progress Bar Tests', () => {
  afterAll(() => {
    const currentElement = document.querySelector('.progress-bar-wrapper');

    if (currentElement) {
      currentElement.parentElement.removeChild(currentElement);
    }
  });

  describe('Progress Bar Component', () => {
    beforeEach(function (done) {
      setupProgressBar(templateNoAnimation).then(done).catch(err => console.error(err));
    });

    it(`Should have rendered`, () => {
      assert(document.querySelector('gameface-progress-bar') !== null, `Progress Bar element is not rendered.`);
    });

    it(`Should have been set to ${targetValue}% width.`, () => {
      document.querySelector('gameface-progress-bar').setProgress(targetValue);
      assert(parseInt(document.querySelector('.progress-bar-filler').style.width) === targetValue, `Progress bar has not been set to ${targetValue}% width.`);
    });

    it(`Should have been set to 0% width when a value lower than 0 is passed.`, () => {
      document.querySelector('gameface-progress-bar').setProgress(-50);
      assert(parseInt(document.querySelector('.progress-bar-filler').style.width) === 0, `Progress bar has not been set to 0% width.`);
    });

    it(`Should have been set to 100% width when a value higher than the maximum is passed.`, () => {
      document.querySelector('gameface-progress-bar').setProgress(200);
      assert(parseInt(document.querySelector('.progress-bar-filler').style.width) === 100, `Progress bar has not been set to 100% width.`);
    });
  });

  describe('Progress Bar Component', () => {
    beforeEach(function (done) {
      setupProgressBar(templateAnimation100ms).then(done).catch(err => console.error(err));
    });

    it(`Should have an animation running.`, async () => {
      const progressBarFiller = document.querySelector('.progress-bar-filler');
      let intermediateWidthValue = 0;

      document.querySelector('gameface-progress-bar').setProgress(targetValue);

      setTimeout(() => {
        return createAsyncSpec(() => {
          intermediateWidthValue = parseInt(progressBarFiller.style.width);

          assert(intermediateWidthValue > 0 && intermediateWidthValue < targetValue, `Progress bar has not started an animation.`);
        });
      }, animationTime / 4); // Get the value and validate while still running the animation.
    });
  });
});

