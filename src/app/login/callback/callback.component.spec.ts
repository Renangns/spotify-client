import { CookieModule, CookieService } from 'ngx-cookie';
import { addAuth } from './../../state/auth/auth.action';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { HomeComponent } from './../../home/home.component';
import { Auth } from './../../models/auth';
import { CallbackComponent } from './callback.component';
import { AuthService } from 'src/app/shared/services/auth.service';

const authObject = {
  access_token:
    'BQD-pvQjHEAggck1_c9J-g3n_-IexB_E1jV1TTZrUOmcS4ToBK…YwqIjpjtcG4r6cj5PMgTyEERDISBbLLneATwrxKd9HKjygjsw',
  token_type: 'Bearer',
  expires_in: 3600,
  state: '',
};

const queryUrl = `access_token=${authObject.access_token}&token_type=${authObject.token_type}&expires_in=${authObject.expires_in}`;

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;
  let mockStore: MockStore<{ auth: Auth }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            fragment: of(queryUrl),
          },
        },
      ],
      declarations: [CallbackComponent],
      imports: [
        CookieModule.withOptions(),
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
