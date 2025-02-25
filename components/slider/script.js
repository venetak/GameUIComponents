/* eslint-disable linebreak-style */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Components } from 'coherent-gameface-components';
const components = new Components();
import verticalTemplate from './templates/vertical.html';
import horizontalTemplate from './templates/horizontal.html';
import { orientationUnitsNames } from './orientationUnitsNames';

const BaseComponent = components.BaseComponent;

/**
 * Slider component; can be independently or as a building block of another
 * component - for example a scrollbar. This is a custom slider control, do not
 * confuse with the standard input type slider HTML element.
*/
class Slider extends BaseComponent {
    /**
     * Set the position of the slider's handler.
     * @param {number} value - the new value in percents.
    */
    set handlePosition(value) {
        this._handlePosition = value;
        // The names of the units vary depending on the orientation
        // of the slider - width for horizontal, height for vertical etc.
        this.handle.style[this.units.position] = value + '%';
    }

    /**
     * Get the current position of the slider's handle in percents.
     * @returns {number} - the value of the position.
    */
    get handlePosition() {
        return this._handlePosition;
    }

    /**
     * Get the current position of the slider's handle in pixels.
     * @returns {number} - the value of the position.
    */
    get handlePositionPx() {
        const sliderSize = this.slider.getBoundingClientRect()[this.units.size];
        return this.handlePosition / 100 * sliderSize;
    }

    // eslint-disable-next-line require-jsdoc
    constructor() {
        super();


        this.onSlideUp = (e) => { this.onSlideWithArrorws(-1); };
        this.onSlideDown = (e) => { this.onSlideWithArrorws(1); };
        this.onClick = this.onClick.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.init = this.init.bind(this);
    }


    /**
     * Initialize the custom component.
     * Set template, attach event listeners, setup initial state etc.
     * @param {object} data
    */
    init(data) {
        this.setupTemplate(data, () => {
            // render the template
            components.renderOnce(this);
            // do the initial setup - add event listeners, assign members
            this.setup();
        });
    }


    /**
     * Called when the element was attached to the DOM.
    */
    connectedCallback() {
        // the amount of units that the slider will be updated
        this.step = this.getAttribute('step') || 10;
        // the initial position of the handle
        this._handlePosition = 0;

        // vertical or horizontal
        this.orientation = this.getAttribute('orientation') || 'vertical';
        // use the template for the current slider orientation
        this.template = (this.orientation === 'vertical') ? verticalTemplate : horizontalTemplate;
        /**
         * The names of the units are different for the two slider types.
         * ['clientY', 'height', 'heightPX', 'top', 'scrollHeight] for vertical and
         * ['clientX', 'width', 'widthPX', 'left', 'scrollWidth] for horizontal
        */
        this.units = orientationUnitsNames.get(this.orientation);

        // Load the template
        components.loadResource(this)
            .then(this.init)
            .catch(err => console.error(err));
    }

    /**
     * Set the slider and handle members and add event listeners.
    */
    setup() {
        this.slider = this.getElementsByClassName(`guic-slider-${this.orientation}-slider`)[0];
        this.handle = this.getElementsByClassName(`guic-slider-${this.orientation}-handle`)[0];

        this.attachEventListeners();
    }

    // eslint-disable-next-line require-jsdoc
    disconnectedCallback() {
        this.removeEventListeners();
    }
    /**
     * Gets the size of an element in px.
     * Uses the computed styles which return the size in pixels as a string.
     * @param {HTMLElement} element
     * @returns {number} - the size in pixels.
    */
    _getPxSizeWithoutUnits(element) {
        let unitsName = this.units.sizePX;
        if (!navigator.userAgent.includes('Cohtml')) unitsName = unitsName.substring(0, unitsName.length - 2);

        const size = getComputedStyle(element)[unitsName];
        return Number(size.substring(0, size.length - 2));
    }

    /**
     * Update the size of the slider thumb.
     * @param {HTMLElement} scrollableContainer
    */
    resize(scrollableContainer) {
        components.waitForFrames(() => {
            // get the size of the whole slider element
            const sliderWrapperSize = this._getPxSizeWithoutUnits(this.querySelector(`.guic-${this.orientation}-slider-wrapper`));
            // get the size of the up or down buttons in px
            const controlsSize = this._getPxSizeWithoutUnits(this.querySelector(`.guic-slider-${this.orientation}-arrow`));
            // get the combined size of the up and down buttons in % of the sliderWrapperSize
            const controlsSizePercent = controlsSize * 2 / sliderWrapperSize * 100;

            // get the size of the slider area
            const sliderSize = this.slider[this.units.offset];
            // get the size of the handle in percents relative to the current scroll(Height/Width)
            const handleSizePercent = (sliderSize / scrollableContainer[this.units.scroll]) * 100;
            // get the size of the handle in px; exclude the controlsSizePercent from the whole size
            const handleSize = (sliderSize / (100 - controlsSizePercent)) * handleSizePercent;
            // set the new size of the handle
            this.handle.style[this.units.size] = handleSize + 'px';

            this.scrollTo(this.handlePositionPx);
        });
    }

    /**
     * Remove event listeners.
     */
    removeEventListeners() {
        // document listeners
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    /**
     * Add event listeners to handle user interaction.
    */
    attachEventListeners() {
        // local listeners
        this.slider.addEventListener('click', this.onClick);
        this.slider.addEventListener('wheel', this.onWheel);
        this.handle.addEventListener('mousedown', this.onMouseDown);
        this.querySelector('.up').addEventListener('mousedown', this.onSlideUp);
        this.querySelector('.down').addEventListener('mousedown', this.onSlideDown);

        // document listeners
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    /**
     * Executed on mousedown. Moves the handle towards the position of the mouse
     * with one step.
     * @param {MouseEvent} event
    */
    onMouseDown(event) {
        // set a flag to help the detection of drag
        this.mousedown = true;
        // get the bounding rectangles of the slider area and the handle
        const handleRect = this.handle.getBoundingClientRect();
        const sliderRect = this.slider.getBoundingClientRect();

        // get the current position of the slider (top or left)
        const sliderY = sliderRect[this.units.position];
        // get the handle position within the slider's coordinates
        const handleY = handleRect[this.units.position] - sliderY;
        const mouseY = event[this.units.mouseAxisCoords] - sliderY;

        // set the difference between the mouse click and the handle position
        // used for better looking drag
        this.delta = mouseY - handleY;
    }

    /**
     * Called on mouseup.
     * Resets the mousedown, dragging and slidingWithArrows properties
     * and clears intervals.
    */
    onMouseUp() {
        this.mousedown = false;
        this.dragging = false;

        if (this.slidingWithArrows) {
            this.slidingWithArrows = false;
            clearInterval(this.interval);
        }
    }

    /**
     * Called on mousemove.
     * Detects dragging and scrolls to the current position of the mouse.
     * @param {MouseEvent} event
    */
    onMouseMove(event) {
        if (!this.mousedown) return;
        this.dragging = true;
        const sliderRect = this.slider.getBoundingClientRect();
        // get the mouse position within the slider coordinates
        const mouseY = event[this.units.mouseAxisCoords] - sliderRect[this.units.position];
        this.scrollTo(mouseY - this.delta);
    }

    /**
     * Called when the arrow controls are used for sliding.
     * Starts an interval and updates the slider position until mouseup occurs.
     * @param {number} direction - 1 for down, -1 for up
    */
    onSlideWithArrorws(direction) {
        this.slidingWithArrows = true;
        this.interval = setInterval(() => this.scrollTo(this.getNextScrollPosition(direction, this.step)), 10);
    }

    /**
     * Scrolls the a given position.
     * @param {number} position
    */
    scrollTo(position) {
        const handleRect = this.handle.getBoundingClientRect();
        const sliderRect = this.slider.getBoundingClientRect();

        const handleSizePercent = (handleRect[this.units.size] / sliderRect[this.units.size]) * 100;
        // new position in %
        let newPosPercents = (position / sliderRect[this.units.size]) * 100;

        // the slider range in percents is [0 - 100 - handleSizePercent]
        // if the new position is outside of this range - snap the handle and
        // scroll to the top or to the bottom
        if (newPosPercents < 0) newPosPercents = 0;
        if (newPosPercents + handleSizePercent > 100) newPosPercents = 100 - handleSizePercent;
        this.handlePosition = newPosPercents;

        // dispatch an event in case something needs to be done on scroll
        this.dispatchEvent(new CustomEvent('slider-scroll', { detail: { handlePosition: newPosPercents } }));
    }

    /**
     * Called on wheel event of the mouse.
     * Scrolls the slider in the position of which the wheel is rotated
     * @param {WheelEvent} event
    */
    onWheel(event) {
        const direction = (event.deltaY < 0) ? -1 : 1;
        this.scrollTo(this.getNextScrollPosition(direction, this.step));
    }

    /**
     * Called on click of the mouse.
     * Updated the handle's position with one step towards the position of the
     * mouse click.
     * @param {MouseEvent} event
    */
    onClick(event) {
        if (event.target.classList.contains('handle')) return;
        let direction = -1;
        if (this.handle.getBoundingClientRect()[this.units.position] < event[this.units.mouseAxisCoords]) direction = 1;
        this.scrollTo(this.getNextScrollPosition(direction, this.step));
    }

    /**
     * Gets the next value of the scroll.
     * @param {number} direction
     * @param {number} step
     * @returns {number} - the new scroll position
    */
    getNextScrollPosition(direction, step = this.step) {
        // get the current scroll postition in px
        const scrollTop = this.handlePosition * this.slider.getBoundingClientRect()[this.units.size] / 100;
        return scrollTop + (direction * step);
    }
}

components.defineCustomElement('gameface-slider', Slider);
export default Slider;
