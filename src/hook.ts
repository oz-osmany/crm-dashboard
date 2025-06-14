import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';

// ✅ Para despachar acciones (incluyendo thunks asíncronos)
export const useAppDispatch = () => useDispatch<AppDispatch>();

// ✅ Para acceder al estado con autocompletado y tipos correctos
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
