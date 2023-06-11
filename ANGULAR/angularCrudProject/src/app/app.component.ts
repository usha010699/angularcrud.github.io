import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from './services/employee-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from './modules/Employee';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.getEmployee();
  }





  EmpArr: Employee[] = [];
  employeeFormGroup: FormGroup;
 get f()
 {
  return this.employeeFormGroup.controls;
 }

  constructor(private empservice: EmployeeServiceService, private fb: FormBuilder) {

    this.employeeFormGroup = this.fb.group({
      id:[""],
      name: ["",Validators.required],
      mobileNo: ["",Validators.required],
      emailID: ["",Validators.email]
    });
  }
  getEmployee() {
    this.empservice.GetEmployee().subscribe(res => {
      console.log(res);
      this.EmpArr = res;
    })
  }

  onSubmit() {
    console.log(this.employeeFormGroup.value);

    if (this.employeeFormGroup.value.id != null && this.employeeFormGroup.value.id != "")
     {
      this.empservice.updateEmployee(this.employeeFormGroup.value).subscribe(res => {
        console.log(res);
        this.getEmployee();
        this.employeeFormGroup.setValue({
          id:"",
          name: "",
          mobileNo: "",
          emailID: ""
        })
      })
    }
    else 
    {
      this.empservice.createEmployee(this.employeeFormGroup.value).subscribe(res => {
        console.log(res);
     
      this.getEmployee();
      this.employeeFormGroup.setValue({
        id:"",
        name: "",
        mobileNo: "",
        emailID: ""
      })

    })

    }

  }

  fillForm(emp:Employee)
  {
    this.employeeFormGroup.setValue({
      id:emp.id,
      name:emp.name,
      mobileNo:emp.mobileNo,
      emailID:emp.emailID
    })
  }

  deleteForm(id:string)
  {
    this.empservice.DeleteEmployee(id).subscribe(res=>{
      console.log(res);
      this.getEmployee();
    })
  }

}
