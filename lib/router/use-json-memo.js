"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJsonMemo = void 0;
const react_1 = require("react");
const useJsonMemo = (value) => {
    const json = value == null ? value : JSON.stringify(value);
    return (0, react_1.useMemo)(() => (json == null ? json : JSON.parse(json)), [json]);
};
exports.useJsonMemo = useJsonMemo;
