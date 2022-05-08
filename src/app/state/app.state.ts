import { Auth } from './../models/auth';

export interface AppState {
  auth: ReadonlyArray<Auth>;
}
