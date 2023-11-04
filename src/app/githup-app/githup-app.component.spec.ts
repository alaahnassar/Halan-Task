import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithupAppComponent } from './githup-app.component';

describe('GithupAppComponent', () => {
  let component: GithupAppComponent;
  let fixture: ComponentFixture<GithupAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GithupAppComponent]
    });
    fixture = TestBed.createComponent(GithupAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
