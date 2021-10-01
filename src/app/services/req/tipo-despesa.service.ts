import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl,httpOptions } from "../../shared/api";
import TipoDespesaInput from '../../shared/models/TipoDespesa/Input/TipoDespesaInput';
import TipoDespesaResponse from '../../shared/models/TipoDespesa/Response/TipoDespesaResponse';
import { StorageService } from '../utils/storage.service';

@Injectable({
  providedIn: 'root'
})


export class TipoDespesaService {

  constructor(
    private httpClient: HttpClient,
    private StorageService : StorageService
    ) { }

  token = this.StorageService.get("token");

  httpOptionsAuth = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    }),
  };

  public CadastrarNovoTipoDespesa(TipoDespesa: TipoDespesaInput) : Observable<TipoDespesaResponse>{
    console.log(this.token)
    return this.httpClient.post<TipoDespesaInput>(
      apiUrl + 'tipoDespesa',
      TipoDespesa,
      this.httpOptionsAuth
    )
  }
}
