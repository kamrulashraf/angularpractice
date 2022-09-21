import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HearderComponent } from './hearder/hearder.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { BasicAttributeDirective } from './directive/basic-attribute.directive';
import { UnlessDirective } from './directive/unless.directive';
import { RecipeService } from './Services/recipe.service';
import { ShopplingListService } from './Services/shopping-list.service';
import { RecipeHeaderComponent } from './recipes/recipe-header/recipe-header.component';
import { RecipesEditComponent } from './recipes/recipes-edit/recipes-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { LoaderSpinnersComponent } from './loader-spinners/loader-spinners.component';
import { AuthInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';
import { AlertBoxComponent } from './shared/alert-box/alert-box.component';
import { AlertContainerDirective } from './alert-container.directive';



@NgModule({
  declarations: [
    AppComponent,
    HearderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    BasicAttributeDirective,
    UnlessDirective,
    RecipeHeaderComponent,
    RecipesEditComponent,
    SigninRedirectCallbackComponent,
    LoaderSpinnersComponent,
    AlertBoxComponent,
    AlertContainerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RecipeService,
    ShopplingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
