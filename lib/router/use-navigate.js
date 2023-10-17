"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNavigate = void 0;
const react_1 = require("react");
const get_router_action_1 = require("./get-router-action");
const use_json_memo_1 = require("./use-json-memo");
const use_router_1 = require("./use-router");
const useNavigate = (action) => {
    const stableAction = (0, use_json_memo_1.useJsonMemo)(action);
    const router = (0, use_router_1.useRouter)();
    return (0, react_1.useCallback)((event) => {
        if (event?.isDefaultPrevented()) {
            return;
        }
        event?.preventDefault();
        router.go({ href: event?.currentTarget.getAttribute('href') || undefined, ...(0, get_router_action_1.getRouterAction)(stableAction) });
    }, [router, stableAction]);
};
exports.useNavigate = useNavigate;
