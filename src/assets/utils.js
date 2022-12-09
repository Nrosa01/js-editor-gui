import * as objUtils from './objectUtils.js';
export let sharedData = {};
sharedData.serializeJsAsText = objUtils.serializeJsAsText;
sharedData.deserializeJsAsText = objUtils.deserializeJsAsText;
sharedData.makeReadOnly = objUtils.makeReadOnly;

export function getTypeAsString(type) {
    return Object.prototype.toString.call(type).slice(8, -1);
}

export function captilazeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function processFieldName(fieldName, defaultValue) {
    // Capitalize first letter
    const capitalized = captilazeFirstLetter(fieldName);

    let result = "";
    for (let i = 0; i < capitalized.length; i++) {
        const char = capitalized.charAt(i);
        if (i > 0 && char === char.toUpperCase() && capitalized.charAt(i - 1) !== capitalized.charAt(i - 1).toUpperCase()) {
            result += " ";
        }
        result += char;
    }

    // If the text contains $, we want to take the text from the start to the $ and add it to the result withouth the $
    if (result.includes('$')) {
        const indexOf$ = result.indexOf('$');
        const textBefore$ = result.substring(0, indexOf$);
        return textBefore$;
    }

    if (result === "")
        return defaultValue + "" ?? "";

    return result;
}

export function getAttributes(text) {
    const indexOf$ = text.indexOf('$');
    const attribus = text.substring(indexOf$ + 1);
    return attribus.split('$');
}

export function getFirstFieldName(object) {
    return Object.keys(object)[0];
}

export function getFirstFieldValue(object) {
    return object[getFirstFieldName(object)];
}

export function Clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function moveToTop(element, others) {
    for (let i = 0; i < others.length; i++) {
        let el = others[i];
        if (el != element) {
            // If both elements have the same z-index, then make the dragged element on top
            if (element.style.zIndex === el.style.zIndex)
                element.style.zIndex = parseInt(element.style.zIndex) + 1;

            // Swap z-index only if the dragged element is not top of the other one
            if (parseInt(element.style.zIndex) < parseInt(el.style.zIndex)) {
                element.style.zIndex = parseInt(el.style.zIndex) + 1;
            }
        }
    }

    // We don't want z index to be too high, so we order them 
    // For example if we have 3 elements, then we want the z-index to be 1, 2, 3
    let keys = Object.keys(others);

    let othersSorted = keys.map(function (key) {
        return others[key];
    }).sort(function (a, b) {
        return parseInt(a.style.zIndex) - parseInt(b.style.zIndex);
    });

    for (let i = 0; i < othersSorted.length; i++) {
        othersSorted[i].style.zIndex = i + 1;
    }
}

export function dragElement(elmnt, child) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    let elements = document.querySelectorAll('.absolute');
    if (child) {
        // if present, the header is where you move the DIV from:
        child.onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

        // If this element overlaps with another one that has position absolute, then swap their z-index
        // select all elements with class absolute
        elements = document.querySelectorAll('.absolute');
        moveToTop(elmnt, elements);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        const parent = elmnt.parentElement;

        // Check if the element is out of the parent, compute parent style
        const parentStyle = window.getComputedStyle(parent);
        const parentWidth = parseInt(parentStyle.width);
        const parentHeight = parseInt(parentStyle.height);
        const parentPaddingLeft = parseInt(parentStyle.paddingLeft);
        const parentPaddingTop = parseInt(parentStyle.paddingTop);
        const parentPaddingRight = parseInt(parentStyle.paddingRight);
        const parentPaddingBottom = parseInt(parentStyle.paddingBottom);

        // Compute element style
        const elementStyle = window.getComputedStyle(elmnt);
        const elementWidth = parseInt(elementStyle.width);
        const elementHeight = parseInt(elementStyle.height);
        const elementMarginLeft = parseInt(elementStyle.marginLeft);
        const elementMarginTop = parseInt(elementStyle.marginTop);
        const elementMarginRight = parseInt(elementStyle.marginRight);
        const elementMarginBottom = parseInt(elementStyle.marginBottom);

        const l = parent.offsetLeft;

        // Make sure element is smallwer or equal to parent
        if (elementWidth > parentWidth) {
            elmnt.style.width = parentWidth + "px";
        }
        if (elementHeight > parentHeight) {
            elmnt.style.height = parentHeight + "px";
        }

        // Clamp the element to the parent
        let minPos = parentPaddingLeft - elementMarginLeft + l;
        let maxPos = parentWidth - parentPaddingRight - elementWidth - elementMarginRight + l - 1;
        const currentLeft = parseInt(elmnt.style.left);
        elmnt.style.left = Clamp(currentLeft, minPos, maxPos) + "px";

        const minYPos = parentPaddingTop - elementMarginTop;
        const maxYPos = parentHeight - parentPaddingBottom - elementHeight - elementMarginBottom;
        const currentTop = parseInt(elmnt.style.top);
        elmnt.style.top = Clamp(currentTop, minYPos, maxYPos) + "px";
    }

    function closeDragElement(e) {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export function valuesToDefault(obj) {
    // Iterate object entries
    for (let [key, value] of Object.entries(obj)) {
        // Switch statement
        switch (getTypeAsString(value)) {
            case "Number":
                obj[key] = 0;
                break;
            case "String":
                obj[key] = "";
                break;
            case "Boolean":
                obj[key] = false;
                break;
            case "Object":
                valuesToDefault(value);
                break;
            case "Array":
                const firstItem = value[0];
                valuesToDefault(firstItem);
                obj[key] = [];
                obj[key].push(firstItem);
                break;
            case "Function":
                obj[key] = value;
                break;
            default:
                break;
        }
    }
}

export function load() {
    let jsItems = objUtils.deserializeJsAsText(localStorage.getItem("items"));
    if (jsItems === null) jsItems = [];

    let htmlItemsData = objUtils.deserializeJsAsText(localStorage.getItem("htmlItemsData"));
    if (htmlItemsData === null) htmlItemsData = [];

    let scale = localStorage.getItem("scale");
    if (scale === null) scale = 1;
    else scale = parseFloat(scale);

    let htmlItems = [];

    return { jsItems, htmlItemsData, htmlItems, scale };
}

export function save(data) {
    localStorage.setItem("items", objUtils.serializeJsAsText(data.jsItems));
    localStorage.setItem("htmlItemsData", objUtils.serializeJsAsText(data.htmlItemsData));
    localStorage.setItem("scale", data.scale);
}

export function saveConfigToFile(data, fileName) {
    const config = { jsItems: data.jsItems, htmlItemsData: data.htmlItemsData }
    saveToFile(fileName, objUtils.serializeJsAsText(config));
}

export function loadConfigFromFile() {
    let file = loadFile(".json").then((file) => {
        let data = objUtils.deserializeJsAsText(file);
        return data;
    });

    return file;
}

export function importUTF8StringAsJSObject(str) {
    return import(/* @vite-ignore */ "data:text/javascript;utf-8," + str);
}

export async function loadFile(fileTypes) {
    // Creates a new input element, sets its type to file, and simulates a click on it
    let input = document.createElement('input');

    input.type = 'file';
    input.accept = fileTypes;
    input.click();

    return new Promise((resolve, reject) => {
        // When the user selects a file, the change event is triggered
        input.onchange = () => {
            // Get the selected file
            let file = input.files[0];
            // Create a new file reader
            let reader = new FileReader();
            // When the reader loads, resolve the promise with the result
            reader.onload = () => {
                // The fileloaded is a json file, so parse it into an object
                let fileLoaded = reader.result;
                // Delete the input element
                input.remove();
                resolve(fileLoaded);
            }
            // When the reader errors, reject the promise with the error
            reader.onerror = reject;
            // Read the file as a text file
            reader.readAsText(file);
        };
    });
}

function saveToFile(fileName, data) {
    // It creates a <a> element and clicks it, then removes it
    let file = new Blob([data], { type: 'application/json' });
    let a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
        , 0);
}