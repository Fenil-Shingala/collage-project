import { Injectable } from '@angular/core';
import { SharedServiceService } from '../../shared-service/shared-service.service';
import { HttpClient } from '@angular/common/http';
import { Orderdata } from 'src/app/interface/OrderData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuelServiceService {
  constructor(
    private sharedService: SharedServiceService,
    private http: HttpClient
  ) {}

  addOrderData(orderData: Orderdata): Observable<Orderdata> {
    return this.http.post<Orderdata>(
      `${this.sharedService.dataUrl}/data`,
      orderData
    );
  }

  getOrders(): Observable<Orderdata[]> {
    return this.http.get<Orderdata[]>(`${this.sharedService.dataUrl}/data`);
  }
}
