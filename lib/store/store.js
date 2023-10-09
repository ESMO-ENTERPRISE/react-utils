"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEsmoStore = void 0;
const zustand_1 = require("zustand");
const types_1 = require("./types");
const storeDefinition = (0, zustand_1.create)((set) => ({
    data: types_1.INITIAL_DATA,
    setData: (arg) => set(() => ({
        data: arg
    }))
}));
exports.useEsmoStore = storeDefinition;
