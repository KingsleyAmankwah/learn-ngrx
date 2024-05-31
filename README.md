# Angular Project with NgRx State Management

## Overview

This week, I dived into NgRx for State management in Angular. Getting started, I learned the concepts in the NgRx Store and the usage of NgRx Effects.

## NgRx Store Concepts

NgRx Store has three main key concepts:

1. **Actions**
2. **Reducers**
3. **Selectors**

### Actions

Actions are payloads of information that send data from the app to the store. Before the action sends the data to the store, there is a change in the state of the application. It is the duty of the reducer to respond to those changes in the state.

### Reducers

Reducers are pure functions that take the current state and an action as arguments and return a new state. They specify how the state changes in response to actions sent to the store.

### Selectors

Selectors are pure functions used to select pieces of the state in the store. They help in retrieving specific data from the state, making it easier to manage and use the state data in the components.

## NgRx Effects

NgRx Effects isolate the components of the app from interacting directly with an API or external services. They handle side effects and provide a way to interact with external resources without directly tying them to the component logic.

## Getting Started with NgRx

1. **Install NgRx Store and Effects**

    ```bash
    npm install @ngrx/store @ngrx/effects
    ```

2. **Define Actions**

    ```typescript
    import { createAction, props } from '@ngrx/store';

    export const loadItems = createAction('[Item List] Load Items');
    export const loadItemsSuccess = createAction('[Item List] Load Items Success', props<{ items: any[] }>());
    export const loadItemsFailure = createAction('[Item List] Load Items Failure', props<{ error: any }>());
    ```

3. **Create Reducers**

    ```typescript
    import { createReducer, on } from '@ngrx/store';
    import { loadItems, loadItemsSuccess, loadItemsFailure } from './actions';

    export const initialState = {
        items: [],
        loading: false,
        error: null
    };

    const _itemsReducer = createReducer(
        initialState,
        on(loadItems, state => ({ ...state, loading: true })),
        on(loadItemsSuccess, (state, { items }) => ({ ...state, loading: false, items })),
        on(loadItemsFailure, (state, { error }) => ({ ...state, loading: false, error }))
    );

    export function itemsReducer(state, action) {
        return _itemsReducer(state, action);
    }
    ```

4. **Set Up Selectors**

    ```typescript
    import { createSelector, createFeatureSelector } from '@ngrx/store';

    const selectItemsState = createFeatureSelector<any>('items');

    export const selectAllItems = createSelector(
        selectItemsState,
        (state) => state.items
    );
    ```

5. **Define Effects**

    ```typescript
    import { Injectable } from '@angular/core';
    import { Actions, createEffect, ofType } from '@ngrx/effects';
    import { of } from 'rxjs';
    import { catchError, map, mergeMap } from 'rxjs/operators';
    import { loadItems, loadItemsSuccess, loadItemsFailure } from './actions';
    import { ItemService } from './item.service';

    @Injectable()
    export class ItemEffects {

        loadItems$ = createEffect(() =>
            this.actions$.pipe(
                ofType(loadItems),
                mergeMap(() => this.itemService.getAll()
                    .pipe(
                        map(items => loadItemsSuccess({ items })),
                        catchError(error => of(loadItemsFailure({ error })))
                    ))
            )
        );

        constructor(
            private actions$: Actions,
            private itemService: ItemService
        ) {}
    }
    ```

## Conclusion

Implementing NgRx for state management in Angular helps in maintaining a predictable state, making the application more robust and easier to debug. The concepts of Actions, Reducers, Selectors, and Effects play a vital role in managing the state efficiently.

For further reading and detailed documentation, visit the [NgRx Documentation](https://ngrx.io/docs).

