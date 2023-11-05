// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GithubService } from '../../services/github.service';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  updateQuery,
} from '../actions/user.action';

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private githubService: GithubService) {}

  loadUsers$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadUsers),
      exhaustMap(() =>
        this.githubService.getAllUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) =>
            of(
              loadUsersFailure({
                error: 'Error loading users. Please try again later.',
              })
            )
          )
        )
      )
    )
  );

  searchUsers$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateQuery),
      switchMap((action) =>
        this.githubService.searchUsers(action.query).pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) =>
            of(
              loadUsersFailure({
                error: 'Error search loading users. Please try again later.',
              })
            )
          )
        )
      )
    )
  );
}
