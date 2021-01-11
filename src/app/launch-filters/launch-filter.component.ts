import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-launch-filters',
  templateUrl: './launch-filter.component.html',
  styleUrls: ['./launch-filter.component.css']
})
export class LaunchFilterComponent implements OnInit {
  launchYears: number[] = [];
  filters: any = {};
  btnValues: boolean[] = [true, false];

  constructor(private _route: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.filters.launchedYear = + this._activatedRoute.snapshot.queryParamMap.get('launchedYear') || null;
    this.filters.isLaunched = this.getBooleanValue(this._activatedRoute.snapshot.queryParamMap.get('launch'));
    this.filters.isLanded = this.getBooleanValue(this._activatedRoute.snapshot.queryParamMap.get('landed'));
    for (let i = 2006; i <= 2020; i++) {
      this.launchYears.push(i);
    }
  }

  onLaunch(value, prop) {
    this.filters[prop] = (this.filters[prop] === value ? null : value);
    this._route.navigate(['/spacex'], {
      queryParams: { launchedYear: this.filters.launchedYear, launch: this.filters.isLaunched, landed: this.filters.isLanded }
    })
  }

  getBooleanValue(param: string) {
    let value: boolean = null;
    if (param === 'true') {
      value = true;
    }
    if (param === 'false') {
      value = false;
    }
    return value;
  }
}