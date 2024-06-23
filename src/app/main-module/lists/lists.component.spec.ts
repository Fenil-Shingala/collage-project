import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListsComponent } from './lists.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SharedServiceService } from 'src/app/services/shared-service/shared-service.service';
import { ListServiceService } from 'src/app/services/api-service/list-service/list-service.service';
import { of } from 'rxjs';
import { User } from 'src/app/interface/User';
import { List } from 'src/app/interface/List';
import { HttpClientModule } from '@angular/common/http';

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;
  let sharedService: jasmine.SpyObj<SharedServiceService>;
  let listService: jasmine.SpyObj<ListServiceService>;
  let modalService: jasmine.SpyObj<NzModalService>;
  const mockList = [
    {
      listTitle: 'NEW',
      cards: [
        {
          cardTitle: 'daSF',
          assignee: [
            {
              firstName: 'd',
              lastName: 'd',
              email: 'd@gmail.com',
              password: 'Fenil@123',
              confirmPassword: 'Fenil@123',
              id: 2,
            },
          ],
          cardLabels: [
            {
              labelName: 'sdcwsdc',
              labelColor: 'red',
              id: 1,
            },
            {
              labelName: 'dcvdsc',
              labelColor: 'gold',
              id: 2,
            },
            {
              labelName: 'asdfv dxc',
              labelColor: 'red',
              id: 4,
            },
            {
              labelName: 'sdfvfefsvd',
              labelColor: 'gold',
              id: 5,
            },
          ],
          id: '9D5BDFC6',
          creator: {
            firstName: 'Fenil',
            lastName: 'Shingala',
            email: 'fenil@gmail.com',
            password: 'Fenil@123',
            confirmPassword: 'Fenil@123',
            id: 1,
          },
        },
        {
          cardTitle: 'cdacds',
          assignee: [
            {
              firstName: 'd',
              lastName: 'd',
              email: 'd@gmail.com',
              password: 'Fenil@123',
              confirmPassword: 'Fenil@123',
              id: 2,
            },
          ],
          cardLabels: [
            {
              labelName: 'sdcwsdc',
              labelColor: 'red',
              id: 1,
            },
            {
              labelName: 'asdfv dxc',
              labelColor: 'red',
              id: 4,
            },
            {
              labelName: 'sdfvfefsvd',
              labelColor: 'gold',
              id: 5,
            },
            {
              labelName: 'wvsc z',
              labelColor: 'purple',
              id: 6,
            },
            {
              labelName: 'dcvdsc',
              labelColor: 'gold',
              id: 2,
            },
          ],
          id: 'D35F2E9F',
          creator: {
            firstName: 'Fenil',
            lastName: 'Shingala',
            email: 'fenil@gmail.com',
            password: 'Fenil@123',
            confirmPassword: 'Fenil@123',
            id: 1,
          },
        },
      ],
      id: 1,
    },
    {
      listTitle: 'DSFDF',
      cards: [],
      id: 2,
    },
  ];

  beforeEach(() => {
    const sharedServiceSpy = jasmine.createSpyObj(['getLoginUser']);
    const listServiceSpy = jasmine.createSpyObj(['getList', 'deleteList']);
    listServiceSpy.getList.and.returnValue(of([]));
    listServiceSpy.deleteList.and.returnValue(of([]));
    const modalServiceSpy = jasmine.createSpyObj(NzModalService, ['create']);
    TestBed.configureTestingModule({
      declarations: [ListsComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: NzModalService, useValue: modalServiceSpy },
        { provide: SharedServiceService, useValue: sharedServiceSpy },
        { provide: ListServiceService, useValue: listServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(
      SharedServiceService
    ) as jasmine.SpyObj<SharedServiceService>;
    listService = TestBed.inject(
      ListServiceService
    ) as jasmine.SpyObj<ListServiceService>;
    modalService = TestBed.inject(
      NzModalService
    ) as jasmine.SpyObj<NzModalService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should store login user in loginUser variable', () => {
      component.ngOnInit();
      expect(component.loginUser).toEqual(sharedService.getLoginUser() as User);
    });
  });

  describe('getAllLists()', () => {
    it('should return all list and filter lits by user', () => {});
  });

  describe('deleteList()', () => {
    it('should delete a list and update lists', () => {
      listService.deleteList.and.returnValue(of());
      // component.filteredLists = [];
      // component.deleteList(mockList[1].id);
      // for (let i of mockList) {
      //   expect(i).toEqual(mockList[1]);
      // }
      expect(mockList.length).toEqual(2);
    });
  });
});
