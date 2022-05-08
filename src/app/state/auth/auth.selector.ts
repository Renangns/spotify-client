import { Auth } from './../../models/auth';
import { createFeatureSelector } from "@ngrx/store";

export const selectAuth = createFeatureSelector<Readonly<Auth>>('auth');
