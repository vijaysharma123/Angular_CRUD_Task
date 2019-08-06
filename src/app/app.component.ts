import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {GetEmailService} from './service/get-email.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userEmail : string;
  message = " ";
  userEmailList = [];
  buttonLabel = "";
  updatedId : number;
  deleteEmailId : number;

  constructor(private email: GetEmailService){
    this.getEmail();
  }  


  // below code is used for save email on server

  saveEmail(){
    if(!this.userEmail)
      return;
    let body = {
      'tableEmailEmailAddress': this.userEmail,
      'tableEmailValidate': true
    }
    if(this.buttonLabel == 'Save'){
     
      this.email.save(body).subscribe(res => {
        if (JSON.parse(res['idtableEmail'])) {
          this.message = "Email is saved successfully";
          console.log(this.message);
          this.getEmail();

        }
      }, err => console.log('error'))
    }

    if(this.buttonLabel == 'Update'){
      console.log(this.updatedId);
      this.email.update(this.updatedId,body).subscribe((res:any)=>{
        let upadatedObj = res;
        this.userEmailList.forEach(item=>{
          if (item.idtableEmail == upadatedObj.idtableEmail){
            item.tableEmailEmailAddress = item.tableEmailEmailAddress.replace(item.tableEmailEmailAddress,upadatedObj.tableEmailEmailAddress);
            this.message = "Email is updated successfully";
          }
        })
      })

      console.log(this.userEmailList);

    }
  

    setTimeout(() => {
      this.message = "";
    }, 3000);
  }

  // below code is used for getting email from server

  getEmail(){
    this.email.get().subscribe((res:any) => {
      this.userEmailList = res;
      console.log(res);
    });
  }

  // below code is used for delete email from server

  deleteEmail(){
    console.log(this.deleteEmailId);
    this.email.delete(this.deleteEmailId).subscribe(res=>{
      if(res){
        this.userEmailList.forEach(item=>{
          if (item.idtableEmail == this.deleteEmailId){
            this.userEmailList.splice(this.userEmailList.indexOf(item),1);
          }
        })
        this.closeDeleteEmailModal();
      }
    })
  }

  // below code is used for close email modal
  closeModal() {
    console.log('closing');
    $('#ballardOverlay').css('display', 'none');
    $('body').css('overflow', 'auto');
    $('#emailUserPopup').toggleClass('showing');
    this.userEmail = "";
  }

  // below code is used for open email modal

  showModal(opr,id?) {
    this.updatedId = id;
    console.log(this.updatedId);
    $('#ballardOverlay').css('display', 'block');
    $('#emailUserPopup').addClass('showing');
    $('body').css('overflow', 'hidden');

    this.buttonLabel = opr == 'edit' ? 'Update':'Save';
    
  }


  closeDeleteEmailModal() {
    console.log('closing');
    $('#deleteOverlay').css('display', 'none');
    $('body').css('overflow', 'auto');
    $('#deleteEmailUserPopup').toggleClass('showing');
    this.userEmail = "";
  }

  showDeleteEmailModal(id){
    this.deleteEmailId = id;
    $('#deleteOverlay').css('display', 'block');
    $('#deleteEmailUserPopup').addClass('showing');
    $('body').css('overflow', 'hidden');

  }

  ngOnInit() {
  }

}

