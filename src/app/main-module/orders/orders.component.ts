import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { Admin } from 'src/app/enum/admin';
import { Orderdata } from 'src/app/interface/OrderData';
import { User } from 'src/app/interface/User';
import { FuelServiceService } from 'src/app/services/api-service/fuel-service/fuel-service.service';
import { OrderServiceService } from 'src/app/services/api-service/order-service/order-service.service';
import { SharedServiceService } from 'src/app/services/shared-service/shared-service.service';

// interface DataItem {
//   name: string;
//   age: number;
//   address: string;
// }

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Orderdata> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Orderdata> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  searchValue = '';
  visible = false;
  pageSize = 10;
  total = 1;
  pageIndex = 1;
  currentUser?: User;
  listOfData: Orderdata[] = [];
  listOfDisplayData: Orderdata[] = [];
  admin = Admin;
  listOfColumns: ColumnItem[] = [
    {
      name: 'Date',
      sortOrder: null,
      sortFn: (a: Orderdata, b: Orderdata) => a.date.localeCompare(b.date),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false,
    },
    {
      name: 'Order Type',
      sortOrder: null,
      sortFn: (a: Orderdata, b: Orderdata) =>
        a.orderType.localeCompare(b.orderType),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false,
    },
    {
      name: 'Quantity',
      sortOrder: null,
      sortFn: (a: Orderdata, b: Orderdata) => a.quantity - b.quantity,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false,
    },
    {
      name: 'Price',
      sortOrder: null,
      sortFn: (a: Orderdata, b: Orderdata) => a.price - b.price,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false,
    },
    {
      name: 'Vehical No',
      sortOrder: null,
      sortFn: (a: Orderdata, b: Orderdata) =>
        a.vehicalNo?.localeCompare(b.vehicalNo),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false,
    },
    {
      name: 'Vehical type',
      sortOrder: null,
      sortFn: (a: Orderdata, b: Orderdata) =>
        a.vehicalType?.localeCompare(b.vehicalType),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false,
    },
    {
      name: 'Desrciption',
      sortOrder: null,
      sortFn: null,
      sortDirections: [],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false,
    },
  ];

  statusColumn: ColumnItem = {
    name: 'Status',
    sortOrder: null,
    sortFn: (a: Orderdata, b: Orderdata) => a.status.localeCompare(b.status),
    sortDirections: ['ascend', 'descend', null],
    listOfFilter: [
      { text: 'Pending', value: 'pending' },
      { text: 'Cancelled', value: 'cancelled' },
      { text: 'Confirm', value: 'confirm' },
    ],
    filterFn: (status: string[], item: Orderdata) =>
      status.some((name) => item.status.indexOf(name) !== -1),
    filterMultiple: true,
  };

  constructor(
    private sharedService: SharedServiceService,
    private fuelService: FuelServiceService,
    private modal: NzModalService,
    private orderService: OrderServiceService,
    public message: NzMessageService
  ) {
    this.currentUser = this.sharedService.getLoginUser() as User;
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.fuelService.getOrders().subscribe((data) => {
      if (this.currentUser?.email == this.admin.email) {
        this.listOfData = data;
      } else {
        this.listOfData = data.filter(
          (data) => data.userId === this.currentUser?.email
        );
      }
      this.listOfDisplayData = [...this.listOfData].reverse();
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: any) =>
        item.userName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !==
        -1
    );
  }
  confirmOrder(formData: Orderdata, id: number, cancelled?: boolean): void {
    const updatedData = {
      ...formData,
      status: 'success',
    } as Orderdata;
    this.orderService.updateLabel(updatedData, id).subscribe((data) => {
      this.message.success('Order confirm successfully');
      this.getAllOrders();
    });
  }
  cancelledOrder(formData: Orderdata, id: number, cancelled?: boolean): void {
    const updatedData = {
      ...formData,
      status: 'cancelled',
    } as Orderdata;
    this.orderService.updateLabel(updatedData, id).subscribe((data) => {
      this.message.success('Order confirm successfully');
      this.getAllOrders();
    });
  }

  showConfirm(data: Orderdata, id: number): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to confirm these items?</i>',
      nzContent: '<b>Completed order</b>',
      nzOnOk: () => this.confirmOrder(data, id),
    });
  }

  showCancelled(data: Orderdata, id: number): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to cancelled these items?</i>',
      nzContent: '<b>Cancelled order</b>',
      nzOnOk: () => this.cancelledOrder(data, id),
    });
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe((data) => {
      this.message.success('Order deleted successfully');
      this.getAllOrders();
    });
  }

  showDeleteConfirm(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Delete order</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteOrder(id),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }
}
