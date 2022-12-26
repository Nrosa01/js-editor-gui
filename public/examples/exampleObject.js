///
/// Example object for the JS Editor
///

/// As you can see, special fields are objects that contains the value, the type and the attributes (if any)
/// Type can be inferred from the value, but you can specify it if you want to use a custom editor. For example
/// Dropdown type can have any internal value, but the program won't know that as it doesn't check all the fields, it only checks if
/// it has a type$jsEditor field.
export default {
    WIN_TITLE:
    {
        type$jsEditor: "String",
        value: "JS Editor Test",
        attributes$jsEditor: ["HIDDEN"], // You should hide WIN_TITLE unless you want to change the window title from the inspector
    },
    attack: 5,
    vulnerability:
    {
        value: 0.25,
        type$jsEditor: "Dropdown",
        options: ["Really Resistant",  "Resistant", "Neutral", "Effective", "Super Effective"],
        values: [0.25, 0.5, 1, 2, 4]
    },
    critic: true,
    simpleArray: [1, 2, 3, 4, 5],
    nested: {
        field1: "field1",
        numeberArray: [1, 2, 3, 4, 5],
        stringArray: ["1", "2", "3", "4", "5"],
        objectArray: [{ "1": "1" }, { "2": "2" }, { "3": "3" }, { "4": "4" }, { "5": "5" }],
    },
    toggleExpand: function (obj, api) {
        if (!obj.nested.attributes$jsEditor)
            obj.nested.attributes$jsEditor = [];

        console.log(obj.nested);
        if (obj.nested.attributes$jsEditor.includes("EXPANDED"))
            api.removeAttribute(obj.nested, "EXPANDED")
        else
            api.addAttribute(obj.nested, "EXPANDED")

        console.log(obj.nested)
        api.updateView();
    },
    toggleExpand2: function (obj, api) {
        if (!obj.simpleArray.attributes$jsEditor)
            obj.simpleArray.attributes$jsEditor = [];

        console.log(obj.simpleArray);
        if (obj.simpleArray.attributes$jsEditor.includes("EXPANDED"))
            api.removeAttribute(obj.simpleArray, "EXPANDED")
        else
            api.addAttribute(obj.simpleArray, "EXPANDED")

        console.log(obj.simpleArray)
        api.updateView();
    }
}