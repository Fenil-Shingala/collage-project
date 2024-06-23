import { Injectable } from '@angular/core';
import { SharedServiceService } from '../../shared-service/shared-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orderdata } from 'src/app/interface/OrderData';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  constructor(
    private sharedService: SharedServiceService,
    private http: HttpClient
  ) {}

  deleteOrder(id: number): Observable<Orderdata> {
    return this.http.delete<Orderdata>(
      `${this.sharedService.dataUrl}/data/${id}`
    );
  }

  updateLabel(updatedData: Orderdata, id: number): Observable<Orderdata> {
    return this.http.put<Orderdata>(
      `${this.sharedService.dataUrl}/data/${id}`,
      updatedData
    );
  }
}
