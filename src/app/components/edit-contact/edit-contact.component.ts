import { ContactService } from './../../services/contact.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IGroup } from './../../models/IGroup';
import { IContact } from './../../models/IContacts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

   public loading : boolean = false;
   public contactId : string | null = null;
   public contact : IContact = {} as IContact;
   public errorMessage: string | null = null;
   public groups: IGroup[] = [] as IGroup[]

  constructor(private activatedRouter: ActivatedRoute, private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if(this.contactId){
      this.contactService.getContact(this.contactId).subscribe((data: IContact) => {
        this.contact = data
        this.loading = false
        this.contactService.getAllGroups().subscribe((data: IGroup[]) => {
          this.groups = data
        })
      }, (error) => {
        this.errorMessage = error;
        this.loading = false
      })
    }


  }
  public updateHandle(){
    if(this.contactId) {
      this.contactService.updateContact(this.contact, this.contactId).subscribe((data: IContact) => {
        this.router.navigate( ['/']).then();
      }, (error) => {
        this.errorMessage = error
        this.router.navigate( [`/contact/edit/${this.contactId}`]).then();
      })
    }
  }



}
