import {calcSize} from './main.js';

// size picker elements
const sizePickerTitle = document.querySelector('.size-picker .size-title');
const sizePickerOptions = document.querySelectorAll('.size-picker .option');

// current size selected
var current = 0;

//bind listeners to these elements
sizePickerTitle.addEventListener('click', toggleMenuDisplay);
sizePickerOptions.forEach(option => option.addEventListener('click', handleOptionSelected));

//  toggles title
function toggleClass(elem, className) {
    if (elem.className.indexOf(className) !== -1) {
        elem.className = elem.className.replace(className, '');
    } else {
        elem.className = elem.className.replace(/\s+/g, ' ') + ' ' + className;
    }
    return elem;
}
// drops/hides dropdown
function toggleMenuDisplay(e) {
    const dropdown = e.currentTarget.parentNode;
    const menu = dropdown.querySelector('.menu');
    toggleClass(menu, 'hide');
}
// checks which option was selected
function handleOptionSelected(e) {
    toggleClass(e.target.parentNode, 'hide');

    const newValue = e.target.textContent + ' ';
    const titleElem = document.querySelector('.size-picker .size-title');

    titleElem.textContent = newValue;
    current = setCurrentSize(e.target.id);
    //trigger custom event
    document.querySelector('.size-picker .size-title').dispatchEvent(new Event('change'));
}

// sets current size value
function setCurrentSize(id) {
    current = parseInt(id.charAt(id.length - 1));
    calcSize(current);
}

// returns current size
export default function getSize() {
    return current;
}