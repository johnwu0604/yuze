import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RecordRtcService {
  private url = 'http://localhost:5000/customer';
  constructor(private http: Http) {
  }

  saveVideo(data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.url, data)
          // .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    }
}

