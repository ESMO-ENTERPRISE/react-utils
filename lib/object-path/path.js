"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathSetImmutable = exports.pathSet = exports.pathGet = exports.getPathItems = void 0;
var PathItemType;
(function (PathItemType) {
    PathItemType[PathItemType["Object"] = 0] = "Object";
    PathItemType[PathItemType["Array"] = 1] = "Array";
})(PathItemType || (PathItemType = {}));
const ARRAY_KEY_REG = /\[\d+\]/g;
const isObject = (value) => typeof value === 'object';
const isArray = (value) => Array.isArray(value);
const deepClone = (source) => {
    if (source === null || typeof source !== 'object') {
        return source;
    }
    const clone = Array.isArray(source) ? [] : {};
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            clone[key] = deepClone(source[key]);
        }
    }
    return clone;
};
const getPathItems = (path) => {
    const pathItems = [];
    path.split('.').forEach((path) => {
        const objectKey = path.replace(ARRAY_KEY_REG, '');
        pathItems.push({
            type: PathItemType.Object,
            key: objectKey,
        });
        path.match(ARRAY_KEY_REG)?.forEach((arrayKey) => {
            pathItems.push({
                type: PathItemType.Array,
                key: arrayKey.replace(/\[|\]/g, ''),
            });
        });
    });
    return pathItems;
};
exports.getPathItems = getPathItems;
const pathGet = (object, path) => {
    let value = object;
    (0, exports.getPathItems)(path).forEach((pathItem) => {
        // access to the next level if is object or array
        value = isObject(value) || isArray(value) ? value[pathItem.key] : undefined;
    });
    return value;
};
exports.pathGet = pathGet;
const pathSet = (object, path, value) => {
    let current = object;
    const pathItems = (0, exports.getPathItems)(path);
    pathItems.forEach((pathItem, index) => {
        // set value if is the last path
        if (index === pathItems.length - 1) {
            current[pathItem.key] = value;
        }
        else {
            // create struct if not exists
            if (current[pathItem.key] === undefined) {
                current[pathItem.key] =
                    pathItems[index + 1].type === PathItemType.Array ? [] : {};
            }
            current = current[pathItem.key];
        }
    });
};
exports.pathSet = pathSet;
const pathSetImmutable = (object, path, value) => {
    const clonedObject = deepClone(object);
    (0, exports.pathSet)(clonedObject, path, value);
    return clonedObject;
};
exports.pathSetImmutable = pathSetImmutable;
