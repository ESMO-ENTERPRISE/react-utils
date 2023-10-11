"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const react_1 = require("react");
const _1 = require(".");
function Link({ to, state, onClick, ...rest }) {
    const { navigate } = (0, _1.useNavigation)();
    const onLinkClick = (event) => {
        event.preventDefault();
        onClick?.(event);
        navigate(to, state);
    };
    return (0, react_1.createElement)('a', { ...rest, onClick: onLinkClick });
}
exports.Link = Link;
