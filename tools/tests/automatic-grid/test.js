const loadGrid = () => {
    const wrapper = document.createElement('div');

    const template = `<gameface-automatic-grid class="automatic-grid-component" columns="7" rows="5" draggable>
    <component-slot data-name="item" col="3" row="2" class="box">1</component-slot>
    <component-slot data-name="item" col="3" row="2" class="box">2</component-slot>
    <component-slot data-name="item" col="8" row="8" class="box">3</component-slot>
    <component-slot data-name="item" class="box">4</component-slot>
    <component-slot data-name="item" class="box">5</component-slot>
    <component-slot data-name="item" class="box">6</component-slot>
</gameface-automatic-grid>`;

    wrapper.innerHTML = template;

    document.body.appendChild(wrapper.children[0]);

    return new Promise((resolve) => {
        setTimeout(() => resolve(), 1000);
    });
};

const dragSim = (cell1, cell2) => {
    const step = 3000 / 60;
    
    const { x: startX, y: startY } = cell1.getBoundingClientRect();
    const { x: endX, y: endY } = cell2.getBoundingClientRect();

    const stepX = (endX - startX) / step;
    const stepY = (endY - startY) / step;

    const element = cell1.firstChild;

    element.dispatchEvent(new MouseEvent('mousedown', { clientX: startX, clientY: startY }));

    return new Promise((resolve) => {
        const moveItem = (x, y) => {
            x += (x.toFixed(1) !== endX.toFixed(1)) !== endX ? stepX : 0;
            y += (y.toFixed(1) !== endY.toFixed(1)) !== endY ? stepY : 0;

            document.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y }));

            if (x.toFixed(1) !== endX.toFixed(1) || y.toFixed(1) !== endY.toFixed(1)) {
                requestAnimationFrame(() => moveItem(x, y));
                return;
            }

            resolve();
        };

        requestAnimationFrame(() => moveItem(startX, startY));
    });
};

describe('Automatic grid component', () => {
    afterEach(() => {
        // Since we don't want to replace the whole content of the body using
        // innerHtml setter, we query only the current custom element and we replace
        // it with a new one; this is needed because the specs are executed in a random
        // order and sometimes the component might be left in a state that is not
        // ready for testing
        let automaticGrid = document.querySelector('gameface-automatic-grid');

        if (automaticGrid) {
            automaticGrid.parentElement.removeChild(automaticGrid);
        }
    });

    it('Should create the correct number of columns', async () => {
        await loadGrid();
        const columns = document.querySelector('.guic-row').childElementCount;

        assert.equal(columns, 7);
    });

    it('Should create the correct number of rows', async () => {
        await loadGrid();
        const rows = document.querySelectorAll('.guic-row').length;

        assert.equal(rows, 5);
    });

    it('Should position items in correct cell', async () => {
        await loadGrid();
        const cell = document.querySelectorAll('.automatic-grid-cell')[9];

        assert.notEqual(cell.childElementCount, 0);
    });

    it('Should move items when dragged to another cell', (done) => {
        loadGrid().then(() => {
            const cells = document.querySelectorAll('.automatic-grid-cell');

            const cell1 = cells[1];
            const cell2 = cells[cells.length - 1];

            assert.equal(cell1.childElementCount, 1);
            assert.equal(cell2.childElementCount, 0);

            dragSim(cell1, cell2).then(() => {
                document.querySelector('gameface-automatic-grid').dragEnd({ target: cell2 });

                assert.equal(cell1.childElementCount, 0);
                assert.equal(cell2.childElementCount, 1);

                done();
            });
        });
    });
});
