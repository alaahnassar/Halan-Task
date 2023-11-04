import { Component } from '@angular/core';
import { GithubService } from '../core/services/github.service';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
} from 'rxjs';

@Component({
  selector: 'app-githup-app',
  templateUrl: './githup-app.component.html',
  styleUrls: ['./githup-app.component.scss'],
})
export class GithupAppComponent {
  users: any[] = [];
  error!: string | null;
  searchControl = new FormControl();
  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.githubService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
        this.error = null;
      },
      (error) => {
        this.error = 'Error loading users. Please try again later.';
      }
    );

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query) {
            return this.githubService.searchUsers(query).pipe(
              catchError((error) => {
                this.error =
                  'Error search loading users. Please try again later.';
                return [];
              })
            );
          } else {
            return this.githubService.getAllUsers().pipe(
              catchError((error) => {
                this.error = 'Error loading users. Please try again later.';
                return [];
              })
            );
          }
        })
      )
      .subscribe((users) => {
        this.users = users;
        this.error = null;
      });
  }
}
