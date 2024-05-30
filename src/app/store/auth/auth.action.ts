import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { LoginPayload, RegisterPayload, User } from '../../types/user';
import { HttpErrorResponse } from '@angular/common/http';

// Create actions of related events using createAction function
export const login = createAction('[Auth] Login', props<{ user: User }>);
export const logout = createAction('[Auth Logout]');
export const register = createAction('[Auth] Register', props<{ user: User }>);

// create actions of related events using the createActionGroup function
export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ credentials: LoginPayload }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: HttpErrorResponse }>(),

    Logout: emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: HttpErrorResponse }>(),

    Register: props<{ newUser: RegisterPayload }>(),
    'Register Success': props<{ user: User }>(),
    'Register Failure': props<{ error: HttpErrorResponse }>(),
  },
});
