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