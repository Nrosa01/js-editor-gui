```js
export default
    {
        string: {
            type$jsEditor: "String",
            value: "Hello World",
            attributes$jsEditor: ["HIDDEN"],
        },
        number: {
            type$jsEditor: "Number",
            value: 5,
            attributes$jsEditor: ["READ_ONLY"],
        },
        dropdown: {
            type$jsEditor: "Dropdown",
            options: ["Option 1", "Option 2", "Option 3"],
            values: [1, 2, 3],
            value: 2,
        },
    }

// When converted to pure values, the object will look like this:

export default
    {
        string: "Hello World",
        number: 5,
        dropdown: 2,
    }

// The attributes are removed, and the type is removed. So if you convert a dropdown to pure values, it will take the current value.
```