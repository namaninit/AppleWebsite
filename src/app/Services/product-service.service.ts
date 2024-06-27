import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
isBuyButtonDialogClosedSubject = new BehaviorSubject<boolean>(false);
  constructor() { }
}
