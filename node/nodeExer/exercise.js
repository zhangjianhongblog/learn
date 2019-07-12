class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError'
    }
}
class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super('No property: ' + property);
        this.name = 'PropertyRequiredError';
        this.property = property;
    }
}
function readUser(json) {
    let user = JSON.parse(json);

    if (!user.age) {
        throw new PropertyRequiredError('age');
    }

    if (!user.name) {
        throw new PropertyRequiredError('name');
    }

    return user;
}

try{
    let user = readUser('{"age":35}');
} catch(e) {
    if (e instanceof ValidationError) {
        console.log('Invalid data: ' , e.message);
        console.log(e.name);
        console.log(e.property);
    } else if (e instanceof SyntaxError) {
        console.log("JSON Syntax Error: " + e.message);
    } else {
        throw e;
    }
}