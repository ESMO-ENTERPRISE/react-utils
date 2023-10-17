import { createElement } from 'react';
import { useNavigate } from './use-navigate';
export function Link({ to, state, onClick, ...rest }) {
    const navigate = useNavigate({
        href: to,
        state: state,
        replace: true,
    });
    const onLinkClick = (event) => {
        event.preventDefault();
        onClick?.(event);
        navigate();
    };
    return createElement('a', { ...rest, onClick: onLinkClick });
}
