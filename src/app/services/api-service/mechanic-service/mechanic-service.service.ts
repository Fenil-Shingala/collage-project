import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orderdata } from 'src/app/interface/OrderData';
import { SharedServiceService } from '../../shared-service/shared-service.service';

@Injectable({
  providedIn: 'root',
})
export class MechanicServiceService {
  constructor(
    private http: HttpClient,
    private sharedService: SharedServiceService
  ) {}

  addUserData(orderData: Orderdata): Observable<Orderdata> {
    return this.http.post<Orderdata>(
      `${this.sharedService.dataUrl}/data`,
      orderData
    );
  }
}
