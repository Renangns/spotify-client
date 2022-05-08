import { Auth } from './../../models/auth';
import { createAction, props } from '@ngrx/store';

export const addAuth = createAction('[Callback Component] AddAuth', props<{auth: Auth}>());
