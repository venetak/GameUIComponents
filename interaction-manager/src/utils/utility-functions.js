/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Coherent Labs AD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Converts radians to degrees
 * @param {number} rad
 * @returns {number}
 */
export function toDeg(rad) {
    return (rad * 180) / Math.PI;
}

/**
 * Clamps a value in a range
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Creates a random 5 character hash
 * @returns {string}
 */
export function createHash() {
    return (Math.random() + 1).toString(36).substring(7);
}
