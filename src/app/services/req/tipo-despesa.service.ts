import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl,httpOptions } from "../../shared/api";
import { MessageResponse } from '../../shared/models/Default/DefaultResponse';
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

  public AtualizarTipoDespesa(TipoDespesa : TipoDespesaInput) : Observable<TipoDespesaResponse>{
    return this.httpClient.put<TipoDespesaResponse>(apiUrl + 'tipoDespesas',TipoDespesa,this.httpOptionsAuth);
  }
  public CadastrarNovoTipoDespesa(TipoDespesa: TipoDespesaInput) : Observable<TipoDespesaResponse>{
    return this.httpClient.post<TipoDespesaResponse>(apiUrl + 'tipoDespesas',TipoDespesa,this.httpOptionsAuth);
  }

  public GetTodosOsTiposDeDespesa(idUser: string ) :Observable<TipoDespesaResponse[]>{
    return this.httpClient.get<TipoDespesaResponse[]>(apiUrl + `tipoDespesas/${idUser}`, this.httpOptionsAuth);
  }

  public DeleteTipoDespesa(idTipoDespesa: string) : Observable<MessageResponse>{
    return this.httpClient.delete<MessageResponse>(apiUrl+`tipoDespesas/${idTipoDespesa}`,this.httpOptionsAuth);
  }
}
