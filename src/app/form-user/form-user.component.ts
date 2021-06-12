import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { City } from '../models/city.model';
import { DocumentTypee } from '../models/documentType.model';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm:any;
  documentTypeList: DocumentTypee[] = []
  cityList: City[] = []
  userList: User[] = []
  isEdit: boolean = false
  userId: number = 0
  constructor(private fb: FormBuilder,
              public userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
    this.getDocuments();
    this.getCities();
    this.getUsers();
  }

  initForm()
  {
    this.userForm =this.fb.group({
      name: [''],
      lastName: [''],
      documentType: [''],
      documentNumber: [''],
      city: [''],
    })
  }

  clearForm()
  {
    this.userForm.reset();
  }

  getDocuments()
  {
    this.userService.getDocuments().subscribe(data =>{
      data.forEach(element => {
        var dT = new DocumentTypee();
        dT.documentTypeName=element.fields['document_type_name'];
        dT.pk = element.pk;
        this.documentTypeList.push(dT);
        
      });
    })
  }

  getCities()
  {
    this.userService.getCities().subscribe(data =>{
      data.forEach(element => {
        var c = new City();
        c.cityName=element.fields['city_name'];
        c.pk = element.pk;
        this.cityList.push(c);
        
      });
    })
  }

  getUsers()
  {
    this.userList = []
    this.userService.getUsers().subscribe(data =>{
      data.forEach(element => {
        this.userList.push(element);
      });
      console.log(this.userList)
    })
  }

  saveUser()
  {
    if(!this.isEdit)
    {
      var u = new User();
      u = this.userForm.value;
      this.userService.saveUser(u).subscribe(data =>{
        this.getUsers();
      })
    }else{
      this.updateUser(this.userId)
    }
    
  }

  patchForm(userId:number)
  {
    var uF = this.userList.find(uL => uL.pk == userId)
    var u = uF != undefined ? uF : new User()
    this.userForm.patchValue(u)
    this.userForm.get('documentType').setValue(u.documentType.pk)
    this.userForm.get('city').setValue(u.city.pk)
    this.isEdit = true
    this.userId = userId
  }

  updateUser(userId:number){
    var u = new User();
    u = this.userForm.value;
    this.userService.updateUser(userId, u).subscribe(data =>{
      this.getUsers();
    })
  }

  deleteUser(userId:number){
    this.userService.deleteUser(userId).subscribe(data =>{
      this.getUsers();
    })
  }
}
