const loadAccordionMenu = ({ multiple, expanded, disabled }) => {
    const isMultiple = multiple ? 'multiple' : '';
    const isExpanded = expanded ? 'expanded' : '';
    const isDisabled = disabled ? 'disabled' : '';

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<gameface-accordion-menu ${isMultiple}>
                            <gameface-accordion-panel slot="accordion-panel" ${isDisabled} ${isExpanded}>
                                <gameface-accordion-header>Disabled Open</gameface-accordion-header>
                                <gameface-accordion-content>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, in! At nesciunt earum ea deserunt architecto animi quod
                                    neque dicta asperiores. Error aliquid facilis hic in culpa quisquam temporibus aliquam.</gameface-accordion-content>
                            </gameface-accordion-panel>
                            <gameface-accordion-panel slot="accordion-panel">
                                <gameface-accordion-header>Short Text</gameface-accordion-header>
                                <gameface-accordion-content>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, in! At nesciunt earum ea deserunt architecto animi quod
                                    neque dicta asperiores. Error aliquid facilis hic in culpa quisquam temporibus aliquam.</gameface-accordion-content>
                            </gameface-accordion-panel>
                        </gameface-accordion-menu>`;

    document.body.appendChild(wrapper.children[0]);

    return new Promise((resolve) => {
        waitForStyles(resolve, 4);
    });
};

const waitForTransitionEnd = () => {
    const accordionMenu = document.querySelector('gameface-accordion-menu');

    return new Promise((resolve) => {
        accordionMenu.addEventListener('transitionend', resolve);
    });
};

// eslint-disable-next-line max-lines-per-function
describe('Accordion Menu component', () => {
    afterEach(() => cleanTestPage('gameface-accordion-menu'));

    it('Should render', async () => {
        await loadAccordionMenu({});
        const accordionMenu = document.querySelector('gameface-accordion-menu');
        assert.exists(accordionMenu);
    });

    it('Panel should be disabled when the disabled attribute is present', async () => {
        await loadAccordionMenu({ disabled: true });
        const firstPanel = document.querySelector('gameface-accordion-panel');
        assert.isTrue(firstPanel.classList.contains('guic-accordion-panel-disabled'));
    });

    it('Panel should be expanded when the expanded attribute is present', async () => {
        await loadAccordionMenu({ expanded: true });
        const firstPanelContent = document.querySelector('gameface-accordion-content');
        assert.isAbove(firstPanelContent.scrollHeight, 0);
    });

    it('Clicking on a closed panel should expand it', async () => {
        await loadAccordionMenu({});
        const header = document.querySelector('gameface-accordion-header');
        click(header, { bubbles: true });
        await waitForTransitionEnd();
        const height = parseFloat(header.nextElementSibling.style.height);
        assert.isAbove(height, 0);
    });

    it('Clicking on an expanded panel should shrink it', async () => {
        await loadAccordionMenu({ expanded: true });
        const header = document.querySelector('gameface-accordion-header');
        click(header, { bubbles: true });
        await waitForTransitionEnd();
        const height = parseFloat(header.nextElementSibling.style.height);
        assert.equal(height, 0);
    });

    it('Expanding a panel should close any other expanded', async () => {
        await loadAccordionMenu({ expanded: true });
        const content = document.querySelector('gameface-accordion-content');
        const secondHeader = document.querySelectorAll('gameface-accordion-header')[1];
        click(secondHeader, { bubbles: true });
        await waitForTransitionEnd();
        const height = parseFloat(content.style.height);
        assert.equal(height, 0);
    });

    it('Expanding a panel should not close any other expanded when the multiple attribute is used', async () => {
        await loadAccordionMenu({ expanded: true, multiple: true });
        const content = document.querySelector('gameface-accordion-content');
        const secondHeader = document.querySelectorAll('gameface-accordion-header')[1];
        click(secondHeader, { bubbles: true });
        await waitForTransitionEnd();
        const height = parseFloat(content.style.height);
        assert.isAbove(height, 0);
    });

    it('Clicking on a disabled panel shouldn\'t expand it', async () => {
        await loadAccordionMenu({ disabled: true });
        const header = document.querySelector('gameface-accordion-header');
        click(header, { bubbles: true });
        const height = header.nextElementSibling.offsetHeight;
        assert.equal(height, 0);
    });
});

/* eslint-disable max-lines-per-function */
/* global engine */
/* global setupDataBindingTest */
if (engine?.isAttached) {
    describe('Accordion Menu Component (Gameface Data Binding Test)', () => {
        const templateName = 'accordionMenu';

        const template = `
        <div data-bind-for="array:{{${templateName}.array}}">
            <gameface-accordion-menu>
                <gameface-accordion-panel slot="accordion-panel">
                    <gameface-accordion-header>Header Panel 1</gameface-accordion-header>
                    <gameface-accordion-content>Content 1</gameface-accordion-content>
                </gameface-accordion-panel>
                <gameface-accordion-panel slot="accordion-panel">
                    <gameface-accordion-header>Header Panel 2</gameface-accordion-header>
                    <gameface-accordion-content>Content 2</gameface-accordion-content>
                </gameface-accordion-panel>
            </gameface-accordion-menu>
        </div>`;

        const createAccordionMenu = (template) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'test-wrapper';
            wrapper.innerHTML = template;

            document.body.appendChild(wrapper);

            return new Promise((resolve) => {
                waitForStyles(resolve, 4);
            });
        };

        afterAll(() => cleanTestPage('.test-wrapper'));

        beforeEach(async () => {
            await setupDataBindingTest(templateName, template, createAccordionMenu);
        });

        it(`Should have populated 2 elements`, () => {
            const expectedCount = 2;
            const accordionMenuCount = document.querySelectorAll('gameface-accordion-menu').length;
            assert.equal(accordionMenuCount, expectedCount, `Accordion Menus found: ${accordionMenuCount}, should have been ${expectedCount}.`);
        });
    });
}
