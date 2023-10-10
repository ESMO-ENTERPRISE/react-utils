import { createElement } from 'react';
import { useEsmoNavigation } from '.';
export function Link({ to, state, onClick, ...rest }) {
    const { navigate } = useEsmoNavigation();
    const onLinkClick = (event) => {
        event.preventDefault();
        onClick?.(event);
        navigate(to, state);
    };
    return createElement('a', { ...rest, onClick: onLinkClick });
}
