import React, {createElement} from 'react'
import {useNavigate} from './use-navigate'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string, state?: any }
type OnClickEvent = React.MouseEvent<HTMLAnchorElement>

export function Link({to, state, onClick, ...rest}: Props) {
    const navigate = useNavigate(
        {
            href: to,
            state: state,
            replace: true,
        }
    );
    const onLinkClick = (event: OnClickEvent) => {
        event.preventDefault();
        onClick?.(event);
        navigate();
    }

    return createElement('a', {...rest, onClick: onLinkClick});
}