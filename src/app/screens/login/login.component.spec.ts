import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PoFieldModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoPageLoginModule } from '@po-ui/ng-templates';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let router: Router;
  let notificationMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of({ status: 'success' }))
    };

    notificationMock = {
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule.withRoutes([]), // Simulate the router without actual navigation
        PoPageModule,
        PoFieldModule,
        HttpClientModule,
        FormsModule,
        PoPageLoginModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: PoNotificationService, useValue: notificationMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login and navigate to home on successful login', () => {
    const loginInfo: any = { login: 'test', password: 'test' };
    spyOn(router, 'navigate'); // Spy on router.navigate

    component.login(loginInfo);

    expect(authServiceMock.login).toHaveBeenCalledWith(loginInfo);
    expect(router.navigate).toHaveBeenCalledWith(['home']);
    expect(localStorage.getItem('logistica_loggedin')).toBe('true');
  });

  it('should display error notification on login failure', () => {
    authServiceMock.login.and.returnValue(throwError({ error: 'Login failed' }));
    const loginInfo: any = { login: 'test', password: 'test' };

    component.login(loginInfo);

    expect(notificationMock.error).toHaveBeenCalledWith('Login failed');
  });
});
