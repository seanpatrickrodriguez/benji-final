import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$: Observable<boolean> = this._loading.asObservable();
  private loadingCount = 0;

  constructor() {}

  show(): void {
    this.loadingCount++;
    if (this.loadingCount === 1) {
      this._loading.next(true);
    }
  }

  hide(): void {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    if (this.loadingCount === 0) {
      this._loading.next(false);
    }
  }
}
