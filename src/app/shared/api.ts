import {  HttpHeaders } from "@angular/common/http";

export const apiUrl = "https://localhost:44330/api/";

export const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
};
