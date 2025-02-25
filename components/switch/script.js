/* eslint-disable linebreak-style */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


import { Components } from 'coherent-gameface-components';
const components = new Components();

import textInside from './templates/text-inside-template.html';
import textOutside from './templates/text-outside-template.html';
const CustomElementValidator = components.CustomElementValidator;

/**
 * Switch component, that allows you to switch between true and false
 */
class Switch extends CustomElementValidator {
    // eslint-disable-next-line require-jsdoc
    get value() {
        const value = this.getAttribute('value');
        if (this.isFormElement(this)) return value || 'on';
        return value;
    }

    // eslint-disable-next-line require-jsdoc
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.init = this.init.bind(this);
    }


    /**
     * Initialize the custom component.
     * Set template, attach event listeners, setup initial state etc.
     * @param {object} data
    */
    init(data) {
        this.setupTemplate(data, () => {
            // Render the template
            components.renderOnce(this);

            // Set the elements of the switch we'll be changing depending if it's checked or not
            this._switch = this.querySelector('.guic-switch-toggle');
            this._handle = this.querySelector('.guic-switch-toggle-handle');
            this._textChecked = this.querySelector('.guic-switch-toggle-true');
            this._textUnchecked = this.querySelector('.guic-switch-toggle-false');

            this.setup();
        });
    }

    /**
     * Called when the element is attached to the DOM
     */
    connectedCallback() {
        this.disabled = this.hasAttribute('disabled');
        this.checked = this.hasAttribute('checked');

        // The type of the switch. There are currently 3 possible - default, inset and text-inside
        this._type = this.getAttribute('type');

        // Helpers for easy readability
        this._isDefault = this._type !== 'inset' && this._type !== 'text-inside';
        this._isInset = this._type === 'inset';
        this._isTextInside = this._type === 'text-inside';

        // Set the template based if the text is inside or outside
        this.template = this._isTextInside ? textInside : textOutside;

        // Load the template
        components
            .loadResource(this)
            .then(this.init)
            .catch(err => console.error(err));
    }

    /**
     * Checks if the switch value is missing
     * @returns {boolean}
     */
    valueMissing() {
        if (this.isRequired() && !this.checked) return true;
        return false;
    }

    /**
     * Checks if the switch should be serialized when it is set inside a gameface form control element
     * @returns {boolean}
     */
    willSerialize() {
        if (!this.checked || this.nameMissing()) return false;
        return true;
    }

    /**
     * Sets up the switch based on the attributes it has and attaches the event listeners
     */
    setup() {
        if (this._isDefault) this._handle.classList.add('guic-switch-toggle-handle-default');
        if (this._isInset) this._switch.classList.add('guic-switch-toggle-inset');
        if (this.checked) this.toggleClasses();
        if (this.disabled) this.toggleDisabled();

        this.attachEventListeners();
    }

    // eslint-disable-next-line require-jsdoc
    attachEventListeners() {
        this.firstChild.addEventListener('mousedown', this.onClick);
    }

    /**
     * Changes the styles of the switch and if it's checked
     */
    onClick() {
        this.checked = !this.checked;
        this.checked ? this.setAttribute('checked', '') : this.removeAttribute('checked');
        this.dispatchEvent(new CustomEvent('switch_toggle', { detail: this.checked }));
        this.toggleClasses();
    }

    /**
     * Changes the classes of the switch elements
     */
    toggleClasses() {
        this._handle.classList.toggle('guic-switch-toggle-handle-checked');
        this._switch.classList.toggle('guic-switch-toggle-checked');

        if (this._isTextInside) {
            this._textChecked.classList.toggle('guic-switch-text-hidden');
            this._textUnchecked.classList.toggle('guic-switch-text-hidden');
        }
    }

    /**
     * Toggles the disabled state of the switch. Can be used externaly to enable or disabled the switch
     */
    toggleDisabled() {
        this.firstChild.classList.toggle('guic-switch-toggle-disabled');
    }
}
components.defineCustomElement('gameface-switch', Switch);
export default Switch;
