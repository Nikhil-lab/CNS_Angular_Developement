import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IData, Structure_Data } from './interfaces/data';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';


let API_URL=environment.apiUrl;
let STRUCTURE_API_URL=environment.structureApi;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(){ 
   return this.http.get<IData>(API_URL);
   }

   getDataByID(parameter:string){
    return this.http.get<Structure_Data>(STRUCTURE_API_URL+parameter);
   }

   //.catch(this.errorHandler);
  //  errorHandler(error:HttpErrorResponse){
  //    return Observable.throw(error.message|| "ID not found");
  //    )
  //  }



}
