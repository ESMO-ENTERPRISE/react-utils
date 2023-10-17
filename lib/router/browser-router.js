"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserRouter = void 0;
const react_1 = require("react");
const create_router_1 = require("./create-router");
const router_context_1 = require("./router-context");
const BrowserRouter = ({ children }) => {
    const router = (0, react_1.useMemo)(() => (0, create_router_1.createRouter)({ decodeUrl: (url) => url, window }), []);
    // return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
    return (0, react_1.createElement)(router_context_1.RouterContext.Provider, { value: router }, [children]);
};
exports.BrowserRouter = BrowserRouter;
