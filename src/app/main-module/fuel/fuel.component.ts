import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Orderdata } from 'src/app/interface/OrderData';
import { User } from 'src/app/interface/User';
import { FuelServiceService } from 'src/app/services/api-service/fuel-service/fuel-service.service';
import { SharedServiceService } from 'src/app/services/shared-service/shared-service.service';
import { noSpace } from 'src/app/validators/noSpace.validators';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.scss'],
})
export class FuelComponent {
  petrolLoader = false;
  dieselLoader = false;
  gasLoader = false;
  petrolPrice = 96;
  dieselPrice = 92;
  gasPrice = 78;
  totalPrice = 0;
  currentUser: User | undefined;
  currunetDate = new Date();

  fuelForm = this.fuelFormBuilder.group({
    orderType: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.email]],
    price: ['', [Validators.required, noSpace.noSpaceValidator]],
  });

  constructor(
    private fuelService: FuelServiceService,
    private sharedService: SharedServiceService,
    private fuelFormBuilder: FormBuilder,
    private route: Router,
    public message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.sharedService.getLoginUser() as User;
  }

  loadButton(value: number): void {
    if (value === 1) {
      this.petrolLoader = true;
      setTimeout(() => {
        this.petrolLoader = false;
        this.fuelForm.get('orderType')?.setValue('Petrol');
      }, 300);
    } else if (value === 2) {
      this.dieselLoader = true;
      setTimeout(() => {
        this.dieselLoader = false;
        this.fuelForm.get('orderType')?.setValue('Diesel');
      }, 300);
    } else {
      this.gasLoader = true;
      setTimeout(() => {
        this.gasLoader = false;
        this.fuelForm.get('orderType')?.setValue('Gas');
      }, 300);
    }
  }

  submit(): void {
    if (!this.fuelForm.controls.quantity.value) {
      this.message.error('Please filled all the inputs');
      return;
    }
    const updatedForm = {
      ...this.fuelForm.value,
      userId: this.currentUser?.email,
      userName: this.currentUser?.firstName + ' ' + this.currentUser?.lastName,
      status: 'pending',
      date: formatDate(
        this.currunetDate,
        'yyyy-MM-dd HH:mm',
        'en-US'
      ).toString(),
    };

    this.fuelService.addOrderData(updatedForm as any).subscribe((data) => {
      this.route.navigate(['main-module/dashboard']);
      this.message.success('Order Successfully');
    });
  }

  resetForm(): void {
    this.totalPrice = 0;
    this.fuelForm.reset();
  }

  changePrice(data: any): void {
    this.totalPrice = (
      data.value *
      (this.fuelForm.controls.orderType.value === 'Petrol'
        ? this.petrolPrice
        : this.fuelForm.controls.orderType.value === 'Diesel'
        ? this.dieselPrice
        : this.gasPrice)
    ).toFixed(2) as any;
    this.fuelForm.get('price')?.setValue(this.totalPrice.toString());
  }
}
