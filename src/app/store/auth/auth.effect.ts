import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { authActions } from './auth.action';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

export const login = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)
  ) =>
    action$.pipe(
      ofType(authActions.login),
      exhaustMap((action) =>
        authService.login(action.credentials).pipe(
          tap(({ token, refresh }) => {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('refresh', refresh);
            router.navigate(['/dashboard']);
          }),
          map((user) => authActions.loginSuccess({ user })),
          catchError((error) => of(authActions.loginFailure({ error })))
        )
      )
    ),

  { functional: true }
);

export const register = createEffect(
  (
    action$ = inject(Actions),
    authSerVice = inject(AuthService),
    router = inject(Router)
  ) =>
    action$.pipe(
      ofType(authActions.register),
      exhaustMap((action) =>
        authSerVice.register(action.newUser).pipe(
          tap(({ token, refresh }) => {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('refresh', refresh);
            router.navigate(['/dashboard']);
          }),
          map((user) => authActions.registerSuccess({ user })),
          catchError((error) => of(authActions.registerFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const logout = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)
  ) =>
    action$.pipe(
      ofType(authActions.logout),
      exhaustMap(() =>
        authService.logout().pipe(
          tap(() => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('refresh');
            router.navigate(['home']);
          }),
          map(() => authActions.logoutSuccess()),
          catchError((error) => of(authActions.logoutFailure({ error })))
        )
      )
    ),
  { functional: true }
);
