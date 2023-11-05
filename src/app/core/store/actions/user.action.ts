import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User] Load Users');
export const updateQuery = createAction(
  'Update Query',
  props<{ query: string }>()
);
export const loadUsersSuccess = createAction(
  'Load Users Success',
  props<{ users: any[] }>()
);
export const loadUsersFailure = createAction(
  'Load Users Failure',
  props<{ error: string }>()
);
