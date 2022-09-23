import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from './Services/recipe.service';
import { ShopplingListService } from './Services/shopping-list.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';



@NgModule({
  providers:[
    RecipeService,
    ShopplingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
