import { Action, createReducer, on } from '@ngrx/store';
import {
  loadUsers,
  updateQuery,
  loadUsersSuccess,
  loadUsersFailure,
} from '../actions/user.action';

export interface UserState {
  users: any[];
  error: string | null;
  query: string;
}

export const initialUserState: UserState = {
  users: [],
  error: null,
  query: '',
};

const userReducer = createReducer(
  initialUserState,
  on(loadUsers, (state) => ({ ...state, error: null })),
  on(updateQuery, (state, { query }) => ({ ...state, query })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
