import { createElement } from 'react';
import { useNavigation } from '.';
export function Link({ to, state, onClick, ...rest }) {
    const { navigate } = useNavigation();
    const onLinkClick = (event) => {
        event.preventDefault();
        onClick?.(event);
        navigate(to, state);
    };
    return createElement('a', { ...rest, onClick: onLinkClick });
}
