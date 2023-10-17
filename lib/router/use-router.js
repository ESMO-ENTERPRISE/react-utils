"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouter = void 0;
const react_1 = require("react");
const router_context_1 = require("./router-context");
const useRouter = () => {
    const router = (0, react_1.useContext)(router_context_1.RouterContext);
    if (!router) {
        throw new Error('Router parent is required.');
    }
    return router;
};
exports.useRouter = useRouter;
