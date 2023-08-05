import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from 'src/app/Services/auth-services.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:any = new FormControl
  spinner:boolean = false

  constructor(private fb:FormBuilder,
              private _AuthServicesService:AuthServicesService,
              private toaster:ToastrService,
              private _Router: Router) { }

  ngOnInit(): void {
    this.createFrom()
  }

  createFrom(){
    this.form=this.fb.group({
      email : ['',[Validators.required]],
      password :['',[Validators.required]]
    })
  }

  submit(){
    const model = {
      email : this.form.value.email,
      password : this.form.value.password
    }

    this.spinner = true

    // console.log(model)

    if(this.form.status === 'VALID'){

        this._AuthServicesService.login(model).subscribe(
          {
            next:(response)=>{
              console.log('Login Success')
              // console.log(response)
              localStorage.setItem("token", response.token)
              this.toaster.success('Login Success','',{
                disableTimeOut: false,
                titleClass: "toastr_title",
                messageClass: "toastr_message",
                timeOut:2000,
                closeButton: true,
              })
              this.spinner = false
              this._Router.navigate(['/home'])
              this._AuthServicesService.decodedUserData()
            },
            error :(errorResponse)=>{
              console.log(`Error`)
              this.toaster.error(errorResponse.error.message,)
              this.spinner = false
            },
            complete: ()=>{console.log("complete")}
          }
        )

    }else{
      this.toaster.error('Not Valid Input')
    }

  }

}
