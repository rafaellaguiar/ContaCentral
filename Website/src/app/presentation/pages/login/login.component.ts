import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/domain/services/authentication.service';
import { CarteiraService } from 'src/app/domain/services/carteira.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

 constructor(
   private formBuilder: FormBuilder,
   private route: ActivatedRoute,
   private router: Router,
   private authenticationService: AuthenticationService,
   private carteiraService: CarteiraService
   ) {   
     // redirect to home if already logged in
     if (this.authenticationService.access_token) { 
        this.authenticationService.reset();
        this.carteiraService.reset();
     }
  }

  ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
  });

   // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dash';
  }

  get f() { return this.loginForm.controls; }
     

  onSubmit() {
     this.submitted = true;

     // stop here if form is invalid
     if (this.loginForm.invalid) {
        return;
     }

     this.loading = true;
     this.authenticationService.login(this.f.username.value, this.f.password.value)
     .pipe(first())
     .subscribe(
        data => {           
           this.router.navigate(['/dash']);
        },
        error => {
           this.error = error;
           this.loading = false;
        }
     );
  }

}
