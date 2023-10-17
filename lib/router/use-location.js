"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocation = void 0;
const react_1 = require("react");
const use_router_1 = require("./use-router");
const useLocation = () => {
    const router = (0, use_router_1.useRouter)();
    const [location, setLocation] = (0, react_1.useState)(router.location);
    (0, react_1.useEffect)(() => {
        setLocation(() => router.location);
        return router.subscribe(() => setLocation(router.location));
    }, [router]);
    return location;
};
exports.useLocation = useLocation;
