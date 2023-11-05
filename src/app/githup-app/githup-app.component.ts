import { Component } from '@angular/core';
import { GithubService } from '../core/services/github.service';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUsers, updateQuery } from '../core/store/actions/user.action';
import {
  selectUsers,
  selectError,
} from '../core/store/selectors/user.selector';

@Component({
  selector: 'app-githup-app',
  templateUrl: './githup-app.component.html',
  styleUrls: ['./githup-app.component.scss'],
})
export class GithupAppComponent {
  users$ = this.store.select(selectUsers); // Select the users observable
  error$ = this.store.select(selectError); // Select the error observable
  searchControl = new FormControl();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadUsers());

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.store.dispatch(updateQuery({ query }));
      });
  }
}

// users: any[] = [];
// error!: string | null;
// constructor(private githubService: GithubService) {}

// ngOnInit() {
//   // get all users
//   this.githubService.getAllUsers().subscribe({
//     next: (users) => {
//       this.users = users;
//       this.error = null;
//     },
//     error: (error) => {
//       this.error = 'Error loading users. Please try again later.';
//     },
//   });
//   // search if there is query
//   this.searchControl.valueChanges
//     .pipe(
//       debounceTime(300),
//       distinctUntilChanged(),
//       switchMap((query) => {
//         if (query) {
//           return this.githubService.searchUsers(query).pipe(
//             catchError((error) => {
//               this.error =
//                 'Error search loading users. Please try again later.';
//               return [];
//             })
//           );
//         } else {
//           return this.githubService.getAllUsers().pipe(
//             catchError((error) => {
//               this.error = 'Error loading users. Please try again later.';
//               return [];
//             })
//           );
//         }
//       })
//     )
//     .subscribe((users) => {
//       this.users = users;
//       this.error = null;
//     });
// }
