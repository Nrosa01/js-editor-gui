# Admitted Object

This app takes js modules. It must provide a default export. Only the default export is used. If the object uses other items from the module, it will fail.

# Special fields

If the module is an object, it supports the following fields:
- WIN_TITLE: The title of the window, this field must be on the root of the object. (if it's in a nested object, it will be ignored)
- <fieldName>$RO: The field is read only.
- HIDDEN: The field is hidden (it doesn't render, but it's still there).

# Functions

Functions are supported. They always receive the object as first parameter and an api object with functions as second parameter.

# Api

The api object has the following functions:
- ``serializeJsAsText(jsObject):`` Converts the jsObject to a string.
- ``deserializeJsAsText(jsObject):`` Converts the string to a jsObject.
- ``makeReadOnly(jsObject):`` Makes the object read only for the app by modifying its keys.
- ``add(jsObject):`` Adds the jsObject to the app. It will be rendered as a new window.

Example:

```js
// example.js

export default {
    WIN_TITLE: 'My Window',
    myField: 'Hello',
    myField$RO: 'Hello',
    testFunction: (obj, api) => { obj.HIDDEN.print(); },
    HIDDEN:
    {
        print: () => {
            console.log('Hello');
        }
    },
}
```

<center>

And it will be rendered as:

![](./readmefiles/examplejs.png)

</center>