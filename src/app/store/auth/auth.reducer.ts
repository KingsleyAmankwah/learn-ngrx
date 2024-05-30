import { createReducer, on } from '@ngrx/store';
import { User } from '../../types/user';
import { authActions } from './auth.action';

export interface authState {
  user: User | null;
  error: String | null;
  loading: boolean;
}

export const intialAuthState: authState = {
  user: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  intialAuthState,
  on(authActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(authActions.loginFailure, (state, {error}) => ({...state, error: error.message, loading: false})),
  on(authActions.loginSuccess, (state, {user}) =>({...state, user, error:null, loading:false})),

  on(authActions.register, state => ({ ...state, loading: true, error: null })),
  on(authActions.registerFailure, (state, { error }) => ({ ...state, error: error.message, loading: false })),
  on(authActions.registerSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),

  on(authActions.logout, state => ({ ...state, loading: true, error: null })),
  on(authActions.logoutSuccess, state => ({ ...state, user: null, loading: false, error: null })),
  on(authActions.logoutFailure, (state, {error}) => ({...state, error: error.message, loading:false}))
);
