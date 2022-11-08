import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class RequestInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req=req.clone({
            setHeaders:{
                'Content-Type':'application/json'
            }
        });
        return next.handle(req);
    }
}
