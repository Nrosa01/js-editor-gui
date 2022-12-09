import * as objUtils from './objectUtils.js'

// Api object that framework will use to call functions
// Empty functions are added to support intellisense, the framework will replace them with actual functions
export let api = {
    serializeJsAsText: objUtils.serializeJsAsText,
    deserializeJsAsText: objUtils.deserializeJsAsText,
    makeReadOnly: objUtils.makeReadOnly,
    add: () => {},
    addItem: () => {},
    clear: () => {},
    loadConfig: () => {},
    getItems: () => {},
    getScale: () => {},
    setScale: () => {},
    saveToFile: () => {},
    loadFromFile: () => {}
}

export function addToApi(fieldName, fieldValue) {
    api[fieldName] = fieldValue
}