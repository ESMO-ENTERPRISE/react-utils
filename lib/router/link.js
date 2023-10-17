"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const react_1 = require("react");
const use_navigate_1 = require("./use-navigate");
function Link({ to, state, onClick, ...rest }) {
    const navigate = (0, use_navigate_1.useNavigate)({
        href: to,
        state: state,
        replace: true,
    });
    const onLinkClick = (event) => {
        event.preventDefault();
        onClick?.(event);
        navigate();
    };
    return (0, react_1.createElement)('a', { ...rest, onClick: onLinkClick });
}
exports.Link = Link;
