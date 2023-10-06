import { createElement } from 'react'
import { useEsmoNavigation } from '.'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string, state?: any }
type OnClickEvent = React.MouseEvent<HTMLAnchorElement>

export function Link({ to, state, onClick, ...rest }: Props) {
  const { navigate } = useEsmoNavigation();
  const onLinkClick = (event: OnClickEvent) => {
    event.preventDefault();
    onClick?.(event);
    navigate(to, state);
  }
  
  return createElement('a', { ...rest, onClick: onLinkClick });
}