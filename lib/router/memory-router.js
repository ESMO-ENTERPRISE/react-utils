"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryRouter = void 0;
const react_1 = require("react");
const create_lite_window_1 = require("./create-lite-window");
const create_router_1 = require("./create-router");
const use_json_memo_1 = require("./use-json-memo");
const router_context_1 = require("./router-context");
const MemoryRouter = ({ children, ...props }) => {
    const { initialUrl = '/', initialState = null } = (0, use_json_memo_1.useJsonMemo)(props);
    const router = (0, react_1.useMemo)(() => (0, create_router_1.createRouter)({
        decodeUrl: (url) => url,
        window: (0, create_lite_window_1.createLiteWindow)(initialUrl, initialState),
    }), [initialUrl, initialState]);
    // return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
    return (0, react_1.createElement)(router_context_1.RouterContext.Provider, { value: router }, [children]);
};
exports.MemoryRouter = MemoryRouter;
