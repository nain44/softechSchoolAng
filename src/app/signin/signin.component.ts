import { Component, OnInit } from '@angular/core';
import{LoginService} from './signin.service'
import { Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser'; 
@Component({
  selector: 'app-sigin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  data:any={}; 
  signupData:any={}
  loading:boolean;
  spinner:boolean;
  Authmsg:boolean;  
  res:any={};
  location: any;
  loginForm:FormGroup;
  signupForm:FormGroup;
  submitted=false
  error: string;
  selectedfile:File=null
  dImage:any={};
  sellersPermitString: any;
  resp: any;
  img: any;
  imagePath: any;
  title = 'SignIn';


  constructor(
    private _LoginService:LoginService,
    private router:Router,
    private formBuilder:FormBuilder,
    private uploadService: LoginService,
    private titleService:Title) {
    
  }
 
 
 
   ngOnInit(): void {
    this.titleService.setTitle(this.title)
    this.loading=false
    this.spinner=false;
    this.Authmsg=false;
    
    this.loginForm=this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required],
      session:[''],
    })

    this.signupForm=this.formBuilder.group({
      Name:['',Validators.required],
      RegNo:['',Validators.required],
      Code:[''],
      Owner:[''],
      Cperson:[''],
      Contact:[''],
      Email:[''],
      Tehsil:[''],
      District:[''],
      Address:[''],
      Level:[''],
      img: [''],
    })
 
  }
  get f(){
      return this.loginForm.controls

  }
  
  login(){
        this.spinner=true
      this.submitted=true;
      if(this.loginForm.invalid){
         this.spinner=false
      return;
      }else{
      this.data.UserName=this.loginForm.value.userName;
      this.data.Password=this.loginForm.value.password
      this._LoginService.loginSF(this.data).subscribe(response => {
  
          if (response.status !== 0) {
            this.res=response.data[0]
            sessionStorage.setItem('userID', this.res.usr_id);
            sessionStorage.setItem('UserName', this.res.usr_uName);
            sessionStorage.setItem('SchoolName', this.res.sch_title);
            this.router.navigate(['/dashboard']);  
            this.spinner=false          

          }else{
            this.Authmsg=true;
          }
        
        }, error => {
          console.error(error);
        
        });
      }
    
  }
  get s(){
    return this.signupForm.controls

}
onFileChange(event) {
  
  if (event.target.files.length > 0) {
    this.selectedfile = <File>event.target.files[0];
    //image to display in form       
      var reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (_event) => { 
        this.img = reader.result; 
      }
    //-----
    this.handleInputChange(this.selectedfile); //turn into base64
    debugger
  }
}
handleInputChange(files) {
  
  var pattern = /image-*/;
  var reader = new FileReader();
  if (!files.type.match(pattern)) {
    alert('invalid format');
    return;
  }
  reader.onloadend = this._handleReaderLoaded.bind(this);
  reader.readAsDataURL(files);
}

_handleReaderLoaded(e) {
  let reader = e.target;
  var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
  //this.imageSrc = base64result;
  this.sellersPermitString = base64result;
   
}
uploadImg(){
  debugger
  this.submitted=true;
  this.spinner=true;    
  if(this.signupForm.invalid)
  {
    this.spinner=false
    return;
 }
  if(this.sellersPermitString){
  this._LoginService.upload(this.sellersPermitString).subscribe(response => {  
    if (response.status!=0) {
      this.resp=response.data;
      this.addSchool(this.resp)
        }    
  }, error => {
    console.error(error);    
  }); 
}
  else{
    this.addSchool('')

  }

}
  addSchool(imga){     
        
    this.signupData.RegNo=this.signupForm.value.RegNo;
    this.signupData.Code=this.signupForm.value.Code;
    this.signupData.Name=this.signupForm.value.Name;
    this.signupData.Owner=this.signupForm.value.Owner;
    this.signupData.Cperson=this.signupForm.value.Cperson;
    this.signupData.Contact=this.signupForm.value.Contact;
    this.signupData.Email=this.signupForm.value.Email;
    this.signupData.District=this.signupForm.value.District;
    this.signupData.Tehsil=this.signupForm.value.Tehsil;
    this.signupData.Address=this.signupForm.value.Address;
    this.signupData.Level=this.signupForm.value.Level;
    this.signupData.schoolLogo=imga; 
    this._LoginService.signupSf(this.signupData).subscribe(response => {    
    if(response.status !== 0) {
    this.spinner=false    
    this.res=response.data[0];
    sessionStorage.setItem('userID', this.res.usr_id);
    sessionStorage.setItem('UserName', this.res.usr_uName);
    sessionStorage.setItem('SchoolName', this.res.sch_title);       
    this.router.navigate(['/dashboard']);  
              }
              else
              {
                this.spinner=false
              }
            
            },
        error => {
      console.error(error);
    
    });

  }
  

 
  
} 
