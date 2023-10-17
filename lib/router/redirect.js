"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redirect = void 0;
const react_1 = require("react");
const use_json_memo_1 = require("./use-json-memo");
const use_router_1 = require("./use-router");
const Redirect = (props) => {
    const { href, state } = (0, use_json_memo_1.useJsonMemo)(props);
    const router = (0, use_router_1.useRouter)();
    (0, react_1.useEffect)(() => router.go({ href, replace: true, state }), [router, href, state]);
    return null;
};
exports.Redirect = Redirect;
