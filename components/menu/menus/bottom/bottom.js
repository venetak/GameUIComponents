import components from 'coherent-gameface-components';
import style from './bottom.css';
import GamefaceMenu from '../menu';

const KEYCODES = components.KEYCODES;

const KEY_MAPPING = {
    FORWARD: KEYCODES.RIGHT,
    BACK: KEYCODES.LEFT,
    OPEN_SUBMENU: KEYCODES.UP,
    CLOSE: KEYCODES.ESCAPE,
    SELECT: KEYCODES.ENTER,
};

class GamefaceBottomMenu extends GamefaceMenu {
    constructor() {
        super();

        this.keyMapping = KEY_MAPPING;
        components.importStyleTag('gameface-bottom-menu', style);
    }

    /**
     * Sets an inline style to properly position the element
     * Different menus have use different properties - top, left, right or bottom
     *
     * @param {HTMLElement} element - the element that needs to be positioned
     * @param {DOMRect} parentPosition - the bounding box of the parent element
    */
    setPosition(element, parentPosition) {
        element.style.left = '0px';
        element.style.bottom = parentPosition.height + 'px';
    }
}

components.defineCustomElement('gameface-bottom-menu', GamefaceBottomMenu);

export default GamefaceBottomMenu;