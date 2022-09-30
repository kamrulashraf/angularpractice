import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HearderComponent } from './hearder/hearder.component';
import { BasicAttributeDirective } from './directive/basic-attribute.directive';
import { UnlessDirective } from './directive/unless.directive';
import { HttpClientModule } from '@angular/common/http';
import { SigninRedirectCallbackComponent } from './auththentication/signin-redirect-callback/signin-redirect-callback.component';
import { LoaderSpinnersComponent } from './loader-spinners/loader-spinners.component';
import { AlertContainerDirective } from './alert-container.directive';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingModule } from './shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { recipeReducer } from './recipes/store/recipe.reducer';
import { EffectsModule } from '@ngrx/effects';
import { recipeEffect } from './recipes/store/recipe.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    HearderComponent,
    BasicAttributeDirective,
    UnlessDirective,
    SigninRedirectCallbackComponent,
    LoaderSpinnersComponent,
    AlertContainerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([recipeEffect]),
    StoreDevtoolsModule.instrument({logOnly: environment.production})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
