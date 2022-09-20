import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signin-redirect-callback',
  template: '<div></div>',
})
export class SigninRedirectCallbackComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.finishLogin()
    .then(_ => {
      this.router.navigate(['/'], { replaceUrl: true });
    })
  }

}
