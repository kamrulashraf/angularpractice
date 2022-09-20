import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { Constants } from '../constant.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager!: UserManager;
  private _user! : User;
  private get idpSettings() : UserManagerSettings {
    return {
      authority: Constants.idpAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}/signin-callback`,
      scope: "openid profile email angularapi",
      response_type: "code",
      post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback`
    }
  }
  private _loginChangedSubject = new Subject<boolean>();
  public loginChanged = this._loginChangedSubject.asObservable();

  constructor() { 
    this._userManager = new UserManager(this.idpSettings);
  }

  public login(){
    return this._userManager.signinRedirect();
  }

  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
    .then( (user) => {
      if(this._user !== user){
        this._loginChangedSubject.next(this.checkUser(<User>user));
      }
      this._user = <User> user;
      return this.checkUser(<User>user);
    })
  }

  // pubilc isAuthenticated(): boolean {
  //   return this._user!=undefined && this._user != null && !this._user.expired;  
  // }

  private checkUser = (user : User): boolean => {
    return !!user && !user.expired;
  }

  public finishLogin() : Promise<User> {
    return this._userManager.signinRedirectCallback()
    .then(user => {
      this._user = <User> user;
      this._loginChangedSubject.next(this.checkUser(user));
      return user;
    })
  }

  public logout = () => {
    this._userManager.signoutRedirect();
  }

  // public getAccessToken() : Promise<string> {
  //   return this._userManager.getUser()
  //     .then( user => {
  //       // return (<User> user)?.access_token;
  //       return this.checkUser(<User>user) ? (<User>user)?.access_token : '';
  //     });
  // }

  public getAccessToken(){
     if(this.checkUser(this._user)){
      return this._user.access_token;
     } else{
      return null;
     }
  }

  
  
}
