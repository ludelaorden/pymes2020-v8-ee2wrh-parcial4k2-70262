import { Injectable } from '@angular/core';
import {
 HttpClient,
 HttpHeaders,
 HttpErrorResponse,
 HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Contrato } from "../models/contrato";

@Injectable({
 providedIn: "root"
})
export class ContratosService {

  url: string;

  constructor(private httpClient: HttpClient) 
  {
    this.url = "https://pavii.ddns.net/api/contratos";
  }
  
  get() {
    return this.httpClient.get(this.url);
 }
  getById(Id: number) {
    return this.httpClient.get(this.url + Id);
 }
  post(obj:Contrato) {
    return this.httpClient.post(this.url, obj);
 }
  put(Id: number, obj:Contrato) {
    return this.httpClient.put(this.url + Id, obj);
 }

}