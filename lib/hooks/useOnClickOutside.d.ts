import { RefObject } from 'react';
import { Handler } from './types';
export declare function useClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: Handler, mouseEvent?: 'mousedown' | 'mouseup'): void;
