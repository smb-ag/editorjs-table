/**
 * Checks the item is not missed or messed
 * @param {object|string[]|Element[]|HTMLElement|string} elem - element
 * @returns {boolean} true if element is correct
 * @private
 */
function _isNotMissed(elem) {
  return (!(elem === undefined || elem === null));
}

/**
 * Create DOM element with set parameters
 * @param {string} tagName - Html tag of the element to be created
 * @param {string[]} cssClasses - Css classes that must be applied to an element
 * @param {object} attrs - Attributes that must be applied to the element
 * @param {Element[]} children - child elements of creating element
 * @returns {HTMLElement} the new element
 */
export function create(tagName, cssClasses = null, attrs = null, children = null) {
  const elem = document.createElement(tagName);

  if (_isNotMissed(cssClasses)) {
    for (let i = 0; i < cssClasses.length; i++) {
      if (_isNotMissed(cssClasses[i])) {
        elem.classList.add(cssClasses[i]);
      }
    }
  }
  if (_isNotMissed(attrs)) {
    for (let key in attrs) {
      elem.setAttribute(key, attrs[key]);
    }
  }
  if (_isNotMissed(children)) {
    for (let i = 0; i < children.length; i++) {
      if (_isNotMissed(children[i])) {
        elem.appendChild(children[i]);
      }
    }
  }
  return elem;
}

/**
 * Get item position relative to document
 * @param {HTMLElement} elem - item
 * @returns {{x1: number, y1: number, x2: number, y2: number}} coordinates of the upper left (x1,y1) and lower right(x2,y2) corners
 */
export function getCoords(elem) {
  const rect = elem.getBoundingClientRect();

  return {
    y1: Math.floor(rect.top + window.pageYOffset),
    x1: Math.floor(rect.left + window.pageXOffset),
    x2: Math.floor(rect.right + window.pageXOffset),
    y2: Math.floor(rect.bottom + window.pageYOffset)
  };
}

/**
 * Recognizes which side of the container  is closer to (x,y)
 * @param {{x1: number, y1: number, x2: number, y2: number}} coords - coords of container
 * @param x - x coord
 * @param y - y coord
 * @return {string}
 */
export function getSideByCoords(coords, x, y) {
  let side;
  const sizeArea = 10;

  // a point is close to the boundary if the distance between them is less than the allowed distance.
  // +1px on each side due to fractional pixels
  if (x - coords.x1 >= -1 && x - coords.x1 <= sizeArea + 1) {
    side = 'left';
  }
  if (coords.x2 - x >= -1 && coords.x2 - x <= sizeArea + 1) {
    side = 'right';
  }
  if (y - coords.y1 >= -1 && y - coords.y1 <= sizeArea + 1) {
    side = 'top';
  }
  if (coords.y2 - y >= -1 && coords.y2 - y <= sizeArea + 1) {
    side = 'bottom';
  }

  return side;
}

/**
 * get top, right, bottom, left rect offset
 * @param  HTMLElement
 * @param  HTMLElement
 * @return {json}
 */
export function getRectOffset(element1, element2) {
  if (!element1 || !element2) {
    return { topOffset: 0, leftOffset: 0, rightOffset: 0, bottomOffset: 0 };
  }

  const e1 = element1.getBoundingClientRect();
  const e2 = element2.getBoundingClientRect();

  const topOffset = e2.top - e1.top;
  const leftOffset = e2.left - e1.left;
  const rightOffset = e2.right - e1.right;
  const bottomOffset = e2.bottom - e1.bottom;

  return { topOffset, leftOffset, rightOffset, bottomOffset };
}

/**
 * get current table tag from svg button
 * @param event - HTMLElementEvent
 * @return {string}
 */
export function getCurTableFromButton(event) {
  const list = event.target.parentElement.parentElement.parentElement.parentElement.childNodes;

  let table = null;

  for (let i = 0; i < list.length; i++) {
    if (list[i].nodeName === 'TABLE') {
      table = list[i];
      break;
    }
  }

  return table;
}

/**
 * debounce function
 * @param func - function to exec
 * @param wait - m-sec to wait
 * @return {string}
 */
export function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
