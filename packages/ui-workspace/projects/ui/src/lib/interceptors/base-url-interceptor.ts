import { HttpInterceptorFn } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';

export const API_CONFIG = new InjectionToken<{ apiUrl: string }>('RM_API_CONFIG');

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiConfig = inject(API_CONFIG);
  const apiReq = req.clone({url: `${apiConfig.apiUrl}${req.url}`})
  return next(apiReq);
};

