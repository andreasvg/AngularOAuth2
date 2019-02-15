import { NgModule } from '@angular/core';
import { ProjectService } from './project.service';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor.service';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        ProjectService,
        AccountService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
})
export class CoreModule { }
