import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/Services/auth-services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  form:any = new FormControl

  spinner:boolean = false

  constructor(private fb:FormBuilder, private _AuthServicesService:AuthServicesService, private _Router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.form=this.fb.group({
      Fname : ['', [Validators.required, Validators.maxLength(10)]],
      Lname:['',[Validators.required, Validators.maxLength(10)]],
      email :['', [Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(8)]],
      rePassword : ['', [Validators.required]],
      phone:['01033667297'],
    })
  }

  submit(){
    const model ={
      name:this.form.value.Fname+' '+ this.form.value.Lname,
      email: this.form.value.email,
      password: this.form.value.password,
      rePassword: this.form.value.rePassword,
      phone: '01033667297'
    }
    this.spinner = true
    console.log('toaster')
    if(this.form.status === 'VALID'){
      console.log('valid')
        this._AuthServicesService.signup(model).subscribe(
          {
            next:(res:any)=>{
              console.log("sign up done")
              this._Router.navigate(['/login'])
              this.form.reset()
              this.toastr.success('Success...', 'Resgister');
              this.spinner = false
            },
            error:(err:any)=>{
              console.log(err)
              this.form.value.Fname = ''
              this.toastr.error(err.error.message, 'Resgister');
              this.spinner = false
            },
            complete:()=>{
              console.log('sign up complete')
              this.spinner = false
            }
          }
        )

    }else{
      console.log('form not valid')
      this.toastr.error('Error .. Not valid', 'Resgister');
    }

  }

}
