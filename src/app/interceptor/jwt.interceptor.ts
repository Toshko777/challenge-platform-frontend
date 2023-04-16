import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Get the JWT from local storage
    const token = localStorage.getItem('jwt');
    if (token) {
      // Clone the request and add the JWT as an Authorization header
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      // Pass the cloned request to the next interceptor in the chain
      return next.handle(authRequest);
    } else {
      // If there is no JWT, just pass the original request
      return next.handle(request);
    }
  }
}