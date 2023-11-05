import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User] Load Users');
export const updateQuery = createAction(
  '[User] Update Query',
  props<{ query: string }>()
);
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: any[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);
