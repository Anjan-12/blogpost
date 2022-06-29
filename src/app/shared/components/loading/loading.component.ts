import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {
  subscriptionState = true;
  isLoading = false;
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.loading$.pipe(
      takeWhile(() => this.subscriptionState)
    ).subscribe(
      (loaderData: boolean) => {
        this.isLoading = loaderData;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptionState = false;
  }

}
