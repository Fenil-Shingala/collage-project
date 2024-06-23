import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { SharedServiceService } from 'src/app/services/shared-service/shared-service.service';
import { UserServiceService } from 'src/app/services/api-service/user-service/user-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { KeyOutline } from '@ant-design/icons-angular/icons';
import { User } from 'src/app/interface/User';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
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
      declarations: [ChangePasswordComponent],
      imports: [
        NzFormModule,
        NzInputModule,
        FormsModule,
        ReactiveFormsModule,
        NzIconModule.forRoot([KeyOutline]),
      ],
      providers: [
        { provide: NzMessageService, useValue: messageServiceSpy },
        { provide: UserServiceService, useValue: userServiceSpy },
        { provide: SharedServiceService, useValue: sharedServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit()', () => {
    it('should focus on password input after view init', () => {
      spyOn(component.passwordInput.nativeElement, 'focus');
      component.ngAfterViewInit();
      expect(component.passwordInput.nativeElement.focus).toHaveBeenCalled();
    });
  });

  describe('getLatestLoginUser', () => {
    it('should be return the latest login user data', () => {
      userservice.getUserData.and.returnValue(of(mockUserData));
      component.getLatestLoginUser();
      expect(component.loginUser).toEqual(sharedService.getLoginUser() as User);
    });
  });
});
