import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

//interseptor qui va calculer la durée de vie d'une requête
//on peut utiliser cet intercepteur pour l'amélioration des durées de traitement des requêtes

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('c est le Duration Interceptor');
    const dateIn = Date.now();
    console.log('Request created At : ', dateIn);
    return next.handle().pipe(
      tap(() => {
        const dateOut = Date.now();
        console.log('Request ended At : ', dateOut);
        console.log(`Request Duration : ${dateOut-dateIn} ms`);
      }),
    );
  }
}
