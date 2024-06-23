import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserServiceService } from 'src/app/services/api-service/user-service/user-service.service';
import { SharedServiceService } from 'src/app/services/shared-service/shared-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClientModule } from '@angular/common/http';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  FacebookOutline,
  UserOutline,
  GoogleOutline,
  AppleOutline,
  MailOutline,
  LockOutline,
} from '@ant-design/icons-angular/icons';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/User';
import { of } from 'rxjs';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let sharedService: jasmine.SpyObj<SharedServiceService>;
  let userservice: jasmine.SpyObj<UserServiceService>;
  let messageService: jasmine.SpyObj<NzMessageService>;
  let router: Router;
  const mockUserData = [
    {
      firstName: 'Fenil',
      lastName: 'Shingala',
      email: 'fenil@gmail.com',
      password: 'Fenil@123',
      confirmPassword: 'Fenil@123',
      id: 1,
    },
    {
      firstName: 'd',
      lastName: 'd',
      email: 'd@gmail.com',
      password: 'Fenil@123',
      confirmPassword: 'Fenil@123',
      id: 2,
    },
  ];
  beforeEach(() => {
    const sharedServiceSpy = jasmine.createSpyObj(SharedServiceService, [
      'getLoginUser',
      'showErrorOnSubmit',
    ]);
    const userServiceSpy = jasmine.createSpyObj(UserServiceService, [
      'getUserData',
    ]);
    userServiceSpy.getUserData.and.returnValue(of([]));
    const messageServiceSpy = jasmine.createSpyObj(NzMessageService, [
      'success',
      'error',
    ]);
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzIconModule.forRoot([
          FacebookOutline,
          UserOutline,
          GoogleOutline,
          AppleOutline,
          MailOutline,
          LockOutline,
        ]),
      ],
      providers: [
        { provide: NzMessageService, useValue: messageServiceSpy },
        { provide: UserServiceService, useValue: userServiceSpy },
        { provide: SharedServiceService, useValue: sharedServiceSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(
      SharedServiceService
    ) as jasmine.SpyObj<SharedServiceService>;
    userservice = TestBed.inject(
      UserServiceService
    ) as jasmine.SpyObj<UserServiceService>;
    messageService = TestBed.inject(
      NzMessageService
    ) as jasmine.SpyObj<NzMessageService>;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to dashboard if sharedService returns data when page is intialized', () => {
    sharedService.getLoginUser.and.returnValue(mockUserData[0]);
    spyOn(router, 'navigate');
    spyOn(component, 'getUserData');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/main-module/dashboard']);
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should redirect to login if sharedService not returns data when page is intialized', () => {
    sharedService.getLoginUser.and.returnValue(null);
    spyOn(router, 'navigate');
    spyOn(component, 'getUserData');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/auth-module/login']);
    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should passwordVisible value false in starting', () => {
    expect(component.passwordVisible).toBeFalsy();
  });

  xit('should focus on email input after view init', () => {
    spyOn(component.emailInput.nativeElement, 'focus');
    component.ngAfterViewInit();
    expect(component.emailInput.nativeElement.focus).toHaveBeenCalled();
  });

  xit('should set allUserData property with data from userService', () => {
    userservice.getUserData.and.returnValue(of(mockUserData));
    component.getUserData();
    expect(component.allUserData).toEqual(mockUserData);
  });

  xit('should call showErrorOnSubmit from sharedService if any input is empty', () => {
    component.loginForm.setValue({
      email: '',
      password: 'password123',
    });
    component.submit();
    expect(sharedService.showErrorOnSubmit).toHaveBeenCalledWith(
      component.loginForm
    );
    expect(messageService.success).not.toHaveBeenCalled();
    expect(messageService.error).not.toHaveBeenCalled();
  });

  xit('should show error if credentials are wrong', () => {
    component.allUserData = mockUserData;
    component.loginForm.setValue({
      email: 'validemail@example.com',
      password: 'wrongpassword',
    });
    component.submit();
    expect(sharedService.showErrorOnSubmit).not.toHaveBeenCalled();
    expect(messageService.success).not.toHaveBeenCalled();
    expect(messageService.error).toHaveBeenCalledWith(
      'Your credentials are wrong'
    );
  });

  xit('should shoe success message and navigate to dashboard if credentials are correct', () => {
    spyOn(router, 'navigate');
    spyOn(localStorage, 'setItem');
    component.allUserData = mockUserData;
    component.loginForm.setValue({
      email: 'fenil@gmail.com',
      password: 'Fenil@123',
    });
    component.submit();
    expect(sharedService.showErrorOnSubmit).not.toHaveBeenCalled();
    expect(messageService.success).toHaveBeenCalledWith('Login Successfully');
    expect(messageService.error).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main-module/dashboard']);
    expect(localStorage.getItem('loginUser')).toEqual(
      JSON.stringify(mockUserData[0])
    );
  });
});
