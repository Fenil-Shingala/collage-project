import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from 'src/app/interface/User';
import { MechanicServiceService } from 'src/app/services/api-service/mechanic-service/mechanic-service.service';
import { SharedServiceService } from 'src/app/services/shared-service/shared-service.service';
import { noSpace } from 'src/app/validators/noSpace.validators';

@Component({
  selector: 'app-mechanic',
  templateUrl: './mechanic.component.html',
  styleUrls: ['./mechanic.component.scss'],
})
export class MechanicComponent {
  currentUser?: User;
  currunetDate = new Date();
  vehicalType = ['Car', 'Truck', 'Bike'];
  mechanicForm = this.mechanicFormBuilder.group({
    vehicalNo: ['', Validators.required],
    vehicalType: ['', [Validators.required, Validators.email]],
    issue: ['', [Validators.required, noSpace.noSpaceValidator]],
  });

  constructor(
    private mechanicFormBuilder: FormBuilder,
    private sharedService: SharedServiceService,
    private mechanicService: MechanicServiceService,
    public message: NzMessageService,
    private route: Router
  ) {
    this.currentUser = this.sharedService.getLoginUser() as User;
  }

  submit(): void {
    if (
      !(
        this.mechanicForm.controls.vehicalNo.value?.trim() &&
        this.mechanicForm.controls.vehicalType.value?.trim() &&
        this.mechanicForm.controls.issue.value?.trim()
      )
    ) {
      this.message.error('Please filled all the inputs');
      return;
    }
    const updateData = {
      ...this.mechanicForm.value,
      userId: this.currentUser?.email,
      userName: this.currentUser?.firstName + ' ' + this.currentUser?.lastName,
      status: 'pending',
      orderType: 'Mechanic',
      date: formatDate(
        this.currunetDate,
        'yyyy-MM-dd HH:mm',
        'en-US'
      ).toString(),
    } as any;

    this.mechanicService.addUserData(updateData).subscribe((data) => {
      this.route.navigate(['main-module/dashboard']);
      this.message.success('Order Successfully');
    });
  }
}
