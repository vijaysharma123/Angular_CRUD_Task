import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetEmailService {

  constructor(
    private http: HttpClient
  ) { }

  get() {
    return this.http.get(`https://devfrontend.gscmaven.com/wmsweb/webapi/email/`);
  }

  save(body){
    return this.http.post(`https://devfrontend.gscmaven.com/wmsweb/webapi/email/`,body);
  }

  update(id,body){
    return this.http.put(`https://devfrontend.gscmaven.com/wmsweb/webapi/email/`+ id,body);

  }

  delete(id){
    return this.http.delete(`https://devfrontend.gscmaven.com/wmsweb/webapi/email/` + id);
  }

}
