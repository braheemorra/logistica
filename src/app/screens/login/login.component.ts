import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoPageLogin } from '@po-ui/ng-templates';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitting: boolean = false;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private notification: PoNotificationService,
  ) {
  }

  ngOnInit(): void {}

  login(loginInfo: PoPageLogin) {
    this.isSubmitting = true;
    this.authService.login(loginInfo).subscribe(
      (resp: any) => {
        if (resp.status === "success") {
          localStorage.setItem('logistica_loggedin', 'true');
          this.router.navigate(['home']);
        }
      }, (error: any) => {
        this.notification.error(error.error);
      }
    ).add(() => this.isSubmitting = false)
  }
}
