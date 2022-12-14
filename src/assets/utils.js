import * as objUtils from './objectUtils.js';

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
        child.onmouseover = onHover;
        child.onmouseout = onHoverOut;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
        elmnt.onmouseover = onHover;
        elmnt.onmouseout = onHoverOut;
    }

    function onHover(e) {
        elmnt.style.cursor = 'move';
    }

    function onHoverOut(e) {
        elmnt.style.cursor = 'default';
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
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        const parent = elmnt.parentElement;

        let scaleMultiplier = 1;
        // Parent might have a scale, so we need to take it into account
        if (parent.style.transform) {
            const scale = parent.style.transform.split('(')[1].split(')')[0].split(',')[0];
            scaleMultiplier = parseFloat(scale);
            scaleMultiplier = 1 / scaleMultiplier;
        }

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2 * scaleMultiplier) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1 * scaleMultiplier) + "px";

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
        // let minPos = parentPaddingLeft - elementMarginLeft + l;
        // let maxPos = parentWidth - parentPaddingRight - elementWidth - elementMarginRight + l - 1;
        // const currentLeft = parseInt(elmnt.style.left);
        // elmnt.style.left = Clamp(currentLeft, minPos, maxPos) + "px";

        // const minYPos = parentPaddingTop - elementMarginTop;
        // const maxYPos = parentHeight - parentPaddingBottom - elementHeight - elementMarginBottom;
        // const currentTop = parseInt(elmnt.style.top);
        // elmnt.style.top = Clamp(currentTop, minYPos, maxYPos) + "px";
    }

    function closeDragElement(e) {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

export function resizeElement(elmnt, anchor) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    let elements = document.querySelectorAll('.absolute');
    // otherwise, move the DIV from anywhere inside the DIV:
    anchor.onmousedown = dragMouseDown;
    anchor.onmouseover = onHover;
    anchor.onmouseout = onHoverOut;

    function onHover(e) {
        elmnt.style.cursor = 'se-resize';
    }

    function onHoverOut(e) {
        elmnt.style.cursor = 'default';
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
        const parent = elmnt.parentElement;

        let scaleMultiplier = 1;
        // Parent might have a scale, so we need to take it into account
        if (parent.style.transform) {
            const scale = parent.style.transform.split('(')[1].split(')')[0].split(',')[0];
            scaleMultiplier = parseFloat(scale);
            scaleMultiplier = 1 / scaleMultiplier;
        }

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the element's new width and height:
        elmnt.style.width = (elmnt.offsetWidth - pos1 * scaleMultiplier) + "px";
        elmnt.style.height = (elmnt.offsetHeight - pos2 * scaleMultiplier) + "px";
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

    let canvas = objUtils.deserializeJsAsText(localStorage.getItem("canvas"));
    if (canvas === null) canvas = { scale: 1 };

    let data = { jsItems, canvas };
    tryMakeDataValid(data);

    return data;
}

export function tryMakeDataValid(data) {
    // If it doesn contain the jsItems, then it is not valid
    if (!data.hasOwnProperty("jsItems")) {
        data.jsItems = [];
    }

    // If it doesn't contain canvas, then it is not valid
    if (!data.hasOwnProperty("canvas")) {
        data.canvas = { scale: 1 };
    }

    // If it doesn't contain scale, then it is not valid
    if (!data.canvas.hasOwnProperty("scale"))
        data.canvas.scale = 1;

    // Iterate each jsItem and add jsWindows$jsEditor to it (if it doesn't exist)
    for (let i = 0; i < data.jsItems.length; i++) {
        const jsItem = data.jsItems[i];
        if (!jsItem.hasOwnProperty("windows$jsEditor"))
            jsItem.windows$jsEditor = null;
    }

    return true
}

export function save(data) {
    localStorage.setItem("items", objUtils.serializeJsAsText(data.jsItems));
    localStorage.setItem("canvas", objUtils.serializeJsAsText(data.canvas));
}

export function saveConfigToFile(data, fileName) {
    const config = { jsItems: data.jsItems, canvas: data.canvas }
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

function checkIfValidJsEditorValue(obj) {
    // If the object contains a type$jsEditor property, it is a valid editor object
    return obj !== null && (obj.hasOwnProperty("type$jsEditor") || obj.hasOwnProperty("attributes$jsEditor"));
}

export function checkIfValidJsEditorObject(obj) {
    // If it's an object, check every field, if it's an array, check every item
    // Use recursion
    if (getTypeAsString(obj) === "Object") {
        for (let [key, value] of Object.entries(obj)) {
            if (!checkIfValidJsEditorValue(value))
                return false;
        }
    }
    else if (getTypeAsString(obj) === "Array") {
        for (let i = 0; i < obj.length; i++) {
            if (!checkIfValidJsEditorValue(obj[i]))
                return false;
        }
    }

    return true;
}

function levenshteinDistance(str1, str2) {
    let dp = new Array(str1.length + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(str2.length + 1);
    }

    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = i;
    }

    for (let i = 0; i < dp[0].length; i++) {
        dp[0][i] = i;
    }

    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[0].length; j++) {
            if (str1[i - 1] === str2[j - 1])
                dp[i][j] = dp[i - 1][j - 1];
            else
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
        }
    }

    return dp[dp.length - 1][dp[0].length - 1];
}

export function checkIfErrorCanBeIgnored(errorMsg) {
    const errorsToIgnore = ["ResizeObserver loop limit exceeded"]
    for (let i = 0; i < errorsToIgnore.length; i++) {
        if (levenshteinDistance(errorMsg, errorsToIgnore[i]) < 3)
            return true;
    }
}

export function convertToEditorObject(obj) {
    // Iterate object entries
    for (let [key, value] of Object.entries(obj)) {
        if (checkIfValidJsEditorValue(value)) {
            if (!value.hasOwnProperty("type$jsEditor"))
                value.type$jsEditor = getTypeAsString(value.value);

            let type = value.type$jsEditor;
            if (type === "Object" || type === "Array")
                obj[key].value = convertToEditorObject(value.value);
            continue;
        }

        // Switch statement
        switch (getTypeAsString(value)) {
            case "Number":
                obj[key] = { value: value, type$jsEditor: "Number" };
                break;
            case "String":
                obj[key] = { value: value, type$jsEditor: "String" };
                break;
            case "Boolean":
                obj[key] = { value: value, type$jsEditor: "Boolean" };
                break;
            case "Object":
                obj[key] = { value: convertToEditorObject(value), type$jsEditor: "Object" };
                break;
            case "Array":
                obj[key] = { value: convertToEditorObject(value), type$jsEditor: "Array" };
                break;
            case "Function":
                obj[key] = { value: value, type$jsEditor: "Function" };
                break;
            case "Null":
                obj[key] = { value: {}, type$jsEditor: "String" };
            default:
                break;
        }
    }

    return obj;
}

export function convertToPureValues(obj) {
    let newObj = objUtils.deepClone(obj);

    // Iterate object entries
    for (let [key, value] of Object.entries(newObj)) {
        // Switch statement
        switch (getTypeAsString(value.value)) {
            case "Object":
                newObj[key] = convertToPureValues(value.value);
                break;
            case "Array":
                newObj[key] = convertToPureValues(value.value);
                break;
            default:
                newObj[key] = value.value;
                break;
        }
    }

    return newObj;
}

export function checkObjectHidden(obj) {
    if (obj.hasOwnProperty("attributes$jsEditor")) {
        return obj.attributes$jsEditor.includes("HIDDEN")
    }
    else return false;
}

export function getAttribute(obj, attribute) {
    if (obj.hasOwnProperty("attributes$jsEditor")) {
        return obj.attributes$jsEditor.includes(attribute)
    }
    else return false;
}

export function checkLabelHidden(obj) {
    if (obj.hasOwnProperty("attributes$jsEditor")) {
        return obj.attributes$jsEditor.includes("HIDE_LABEL")
    }
    else return false;
}

export function getItemArrayName(obj, def) {
    // Check if obj is an object
    if (getTypeAsString(obj) !== "Object") return def + "";
    return processFieldName(obj[getFirstFieldName(obj)].value, def)
}

function addAttributeToJsEditorObject(obj, attribute) {
    // Check if it has the attributes property
    if (!obj.hasOwnProperty("attributes$jsEditor")) {
        obj.attributes$jsEditor = [];
    }

    // Check if it has the attribute
    if (!obj.attributes$jsEditor.includes(attribute)) {
        obj.attributes$jsEditor.push(attribute);
    }
}

function deleteAttributeFromJsEditorObject(obj, attribute) {
    // Check if it has the attributes property
    if (!obj.hasOwnProperty("attributes$jsEditor")) {
        obj.attributes$jsEditor = [];
    }

    // Check if it has the attribute
    if (obj.attributes$jsEditor.includes(attribute)) {
        obj.attributes$jsEditor.splice(obj.attributes$jsEditor.indexOf(attribute), 1);
    }
}

export function makeHidden(obj) {

    // Convert to editor object
    obj = convertToEditorObject({ obj }).obj;

    addAttributeToJsEditorObject(obj, "HIDDEN");

    return obj;
}

export function makeReadOnly(obj) {
    // Convert to editor object
    obj = convertToEditorObject({ obj }).obj;

    addAttributeToJsEditorObject(obj, "READ_ONLY");

    return obj;
}

export function addAttribute(obj, attribute) {
    // Convert to editor object
    obj = convertToEditorObject({ obj }).obj;

    addAttributeToJsEditorObject(obj, attribute);

    return obj;
}

export function removeAttribute(obj, attribute) {
    // Convert to editor object
    obj = convertToEditorObject({ obj }).obj;

    deleteAttributeFromJsEditorObject(obj, attribute);

    return obj;
}