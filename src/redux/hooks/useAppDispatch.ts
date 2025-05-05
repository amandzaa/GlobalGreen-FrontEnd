import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

/**
 * Typed version of the useDispatch hook
 * Use this instead of plain useDispatch to get proper TypeScript type checking
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;