import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class LaunchService {
    constructor(private _http: HttpClient) { }

    LaunchData(filters: any = {}): Observable<any> {
        let baseUrl = `https://api.spaceXdata.com/v3/launches?limit=100`;
        if (filters.launchedYear) {
            baseUrl = `${baseUrl}&launch_year=${filters.launchedYear}`;
        }
        if (filters.isLaunched === true || filters.isLaunched === false) {
            baseUrl = baseUrl + `&launch_success=${filters.isLaunched}`;
        }
        if (filters.isLanded === true || filters.isLanded === false) {
            baseUrl = baseUrl + `&land_success=${filters.isLanded}`;
        }
        return this._http.get(baseUrl);
    }

}