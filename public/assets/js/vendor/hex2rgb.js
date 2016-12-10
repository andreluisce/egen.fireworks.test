/*******
 * Adapted by André Evangelista from https://codepen.io/pankajparashar/pen/oFzIg
 * This library converts HEX colours to RGB
 * 
 */

function Hex2RGB(hex, opacity) {
    hex = hex.replace('#', '');
    hex = hex.replace('0x', '');
    if (hex.length > 6) {
        throw new Error("Invalid type of colour. Please use hex colours in the format wuth 3 or 6 values 'FFFFFF'")
    }
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
}