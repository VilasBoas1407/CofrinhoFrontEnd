import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../shared/api';
import { PlanejamentoDTO } from '../../shared/models/Planejamento/DTO/PlanejamentoDTO';
import { StorageService } from '../utils/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlanejamentoService {

  constructor(
    private httpClient: HttpClient,
    private StorageService : StorageService
  ) { }

  token = this.StorageService.getToken();

  httpOptionsAuth = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    }),
  };

  public PostPlanejamento(planejamento: PlanejamentoDTO) : Observable<Response>{
    return this.httpClient.post<Response>( apiUrl + 'planejamento', planejamento, this.httpOptionsAuth);
  }

  public GetPlanejamentos() : Observable<Response>{
    return this.httpClient.get<Response>( apiUrl + 'planejamento', this.httpOptionsAuth);
  }
}
