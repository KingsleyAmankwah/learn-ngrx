import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authState } from './auth.reducer';

export const selectauthState = createFeatureSelector<authState>('auth');

export const selectAuthUser = createSelector(
  selectauthState,
  (state: authState) => state.user
);

export const selectAuthError = createSelector(
  selectauthState,
  (state: authState) => state.error
);

export const selectAuthLoading = createSelector(
  selectauthState,
  (state: authState) => state.loading
);
