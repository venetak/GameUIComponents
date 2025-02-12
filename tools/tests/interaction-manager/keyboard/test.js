/* globals KEYS, _IM */
/* eslint-disable max-lines-per-function */
const simulateKeyDown = (key, repeat = false) => {
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: KEYS[key], repeat }));
};

const simulateKeyUp = (key) => {
    document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: KEYS[key] }));
};

const singleKey = ['A'];
const keyCombination = ['B', 'C'];

describe('Keyboard', () => {
    it('Should register key action', () => {
        interactionManager.keyboard.on({
            keys: singleKey,
            callback: () => {},
            type: 'press',
        });

        const keyAction = _IM.getKeys(singleKey);

        assert.isAbove(keyAction.length, 0);
    });

    it('Should remove key action', () => {
        interactionManager.keyboard.off(singleKey);

        const keyAction = _IM.getKeys(singleKey);

        assert.equal(keyAction.length, 0);
    });

    it('Should execute key action on key down', () => {
        let hasExecuted = false;
        interactionManager.keyboard.on({
            keys: singleKey,
            callback: () => {
                hasExecuted = true;
            },
            type: 'press',
        });

        singleKey.forEach((key) => {
            simulateKeyDown(key);
        });

        interactionManager.keyboard.off(singleKey);

        assert.isTrue(hasExecuted);
    });

    it('Should execute key action on key combination', () => {
        let hasExecuted = false;
        interactionManager.keyboard.on({
            keys: keyCombination,
            callback: () => {
                hasExecuted = true;
            },
            type: 'press',
        });

        keyCombination.forEach((key) => {
            simulateKeyDown(key);
        });

        interactionManager.keyboard.off(keyCombination);

        assert.isTrue(hasExecuted);
    });

    it('Should execute one time on key down with type press', () => {
        let counter = 0;

        interactionManager.keyboard.on({
            keys: singleKey,
            callback: () => {
                counter += 1;
            },
            type: 'press',
        });

        singleKey.forEach((key) => {
            simulateKeyDown(key);
        });

        interactionManager.keyboard.off(singleKey);

        assert.equal(counter, 1);
    });

    it('Should execute multiple times on key down with type hold', () => {
        let counter = 0;
        const count = 10;

        interactionManager.keyboard.on({
            keys: singleKey,
            callback: () => {
                counter += 1;
            },
            type: 'hold',
        });

        singleKey.forEach((key) => {
            for (let i = 0; i < count; i++) {
                simulateKeyDown(key, true);
            }
        });

        interactionManager.keyboard.off(singleKey);

        assert.equal(counter, count);
    });

    it('Should execute on key up with type lift', () => {
        let counter = 0;

        interactionManager.keyboard.on({
            keys: singleKey,
            callback: () => {
                counter += 1;
            },
            type: 'lift',
        });

        singleKey.forEach((key) => {
            simulateKeyUp(key);
        });

        interactionManager.keyboard.off(singleKey);

        assert.equal(counter, 1);
    });
});
