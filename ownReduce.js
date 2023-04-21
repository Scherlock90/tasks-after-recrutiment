function reduceCallback(callback, initValue) {
    let initialValue = initValue;

    // @ts-ignore comment 
    const array = this;

    for (const item of array) {
        if(typeof initialValue === 'object' && Object.keys(initialValue).length === 0) {
            initialValue = item
        } else if(typeof initialValue === 'array' && initialValue.length === 0) {
            callback(initialValue, initialValue)
        }  else {
            initialValue = callback(item, initialValue)
        }
    }

    return initialValue;
};

Array.prototype.ownReduce = reduceCallback
//inital number
const result = [4, 2, 3].ownReduce((acc, currentValue) => acc + currentValue, 0)
//inital objects
const objectResult = [{ a: 1 }, { a: 2 }, { a: 3 }]
    .ownReduce((acc, currentValue) => ({ a: acc.a + currentValue.a }), {a: 0})
const emptyObjectResult = [{ a: 3 }, { a: 3 }, { a: 3 }]
    .ownReduce((acc, currentValue) => ({ a: acc.a + currentValue.a }), {})
//inital array
const emptyArrayResult = [{ a: 4 }, { a: 4 }, { a: 4 }]
    .ownReduce((acc, currentValue) => ({ a: acc.a + currentValue.a }), [])
const notEmptyArrayResult = [{ a: 4 }, { a: 4 }, { a: 4 }]
    .ownReduce((acc, currentValue) => [...acc, currentValue], [])

//Results
console.info(result, 'own reduce result')
console.info(objectResult, 'own reduce objectResult')
console.info(emptyObjectResult, 'own reduce emptyObjectResult')
console.info(notEmptyArrayResult, 'own reduce notEmptyArrayResult')

//real reduce results
const notEmptyArrayResultReduce = [{ a: 4 }, { a: 4 }, { a: 4 }]
    .reduce((acc, currentValue) => [...acc, currentValue], [])

console.info(notEmptyArrayResultReduce, 'own reduce notEmptyArrayResultReduce')
