import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LaunchService } from '../launch.service';

@Component({
  selector: 'app-launch-data',
  templateUrl: './launch-data.component.html',
  styleUrls: ['./launch-data.component.css']
})
export class LaunchDataComponent implements OnInit {
  launchYears: number[] = [];
  launchDetails: any[] = [];
  filters;
  isLoading: boolean = false;
  errMsg: string;
  btnValues: boolean[] = [true, false];

  constructor(private _launchService: LaunchService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.filters = {
      launchedYear: null,
      launch: null,
      landing: null
    }
    for (let i = 2006; i <= 2020; i++) {
      this.launchYears.push(i);
    }
    this._route.queryParams
      .subscribe((params) => {
        this.filters = {
          launchedYear: params['launchedYear'],
          isLaunched: this.getBooleanValue(params['launch']),
          isLanded: this.getBooleanValue(params['landed'])
        }
        this.fetchLaunchData();
      });
  }

  onLaunch(event, prop) {
    this.isLoading = true;
    if (this.filters[prop] === event) {
      this.filters[prop] = '';
    } else {
      this.filters[prop] = event;
    }
    this.fetchLaunchData();
  }

  fetchLaunchData() {
    this.isLoading = true;
    this._launchService.LaunchData(this.filters).subscribe((data) => {
      this.launchDetails = [];
      data.forEach((item) => {
        this.launchDetails.push({
          flight_no: item.flight_number,
          mission_name: item.mission_name,
          missionIds: item.mission_id,
          launch_year: item.launch_year,
          launch_success: item.launch_success,
          land_suceess: item.rocket.first_stage.cores[0].land_success ? item.rocket.first_stage.cores[0].land_success : false,
          img: item.links.mission_patch_small
        })
      })
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      this.errMsg = 'Unable to load data';
    });
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