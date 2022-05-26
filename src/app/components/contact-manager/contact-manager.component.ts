import { ContactService } from './../../services/contact.service';
import { IContact } from './../../models/IContacts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getAllContactsFromServer()
  }

  public getAllContactsFromServer(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data: IContact[]) => {
      this.contacts = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    })
  }

  public deleteContactId(contactId: string | undefined){
if(contactId){
  this.contactService.deleteContact(contactId).subscribe((data: {}) => {
    this.getAllContactsFromServer();
  }, (error) => {
    this.errorMessage = error;
  })
}

  }

}
