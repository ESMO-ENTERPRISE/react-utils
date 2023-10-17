import { type SyntheticEvent } from 'react';
import { RouterAction } from "./types";
declare const useNavigate: (action?: RouterAction | number | string) => (event?: SyntheticEvent<Element, any>) => void;
export { useNavigate };
