import { createReducer, on } from '@ngrx/store';

import { addAuth } from './auth.action';

export const initialState = {};

export const authReducer = createReducer(
  initialState,
  on(addAuth, (state, {auth}) => auth),
);
