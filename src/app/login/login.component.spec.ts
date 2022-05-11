import { environment } from './../../environments/environment';
import { SafeUrlModule } from './../pipe/safe-url/safe-url.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SafeUrlModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return login url', () => {
    const [url, queryParams] = component.login().split('?');

    expect(url).toBe('https://accounts.spotify.com/authorize');
    expect(queryParams).toBe(
      `response_type=token&client_id=${encodeURIComponent(
        environment.spotify_client_id
      )}&scope=user-read-private%20user-read-email&redirect_uri=${encodeURIComponent(
        environment.spotify_redirect_url
      )}`
    );
  });

  it('should render login button', () => {
    const btn = fixture.nativeElement.querySelector('a');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toBe('Login');
  });
});
