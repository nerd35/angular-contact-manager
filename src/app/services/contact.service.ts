import { IGroup } from './../models/IGroup';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/IContacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private  serverUrl: string = `http://localhost:9000`; // json sever url

  constructor(private httpClient: HttpClient) { }

  // Get all contact
  public getAllContacts():Observable<IContact[]> {
    let dataUrl: string = `${this.serverUrl}/contact`;
    return this.httpClient.get<IContact[]>(dataUrl).pipe(catchError(this.handleError));


  }

  // Single contact

  public getContact(contactId: string): Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contact/${contactId}`;
    return this.httpClient.get<IContact>(dataUrl).pipe(catchError(this.handleError));

  }
  // Create Contact
  public createContact(contact: IContact,):Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contact`;
    return this.httpClient.post<IContact>(dataUrl, contact).pipe(catchError(this.handleError));

  }
  // Create Contact
  public updateContact(contact: IContact, contactId: string):Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contact/${contactId}`;
    return this.httpClient.put<IContact>(dataUrl, contact).pipe(catchError(this.handleError));

  }
   // Create Contact
   public deleteContact( contactId: string):Observable<{}>{
    let dataUrl: string = `${this.serverUrl}/contact/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));

  }

  // get all groups
  public getAllGroups():Observable<IGroup[]> {
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataUrl).pipe(catchError(this.handleError));


  }

  // Single Group

  public getGroup(contact: IContact): Observable<IGroup>{
    let dataUrl: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataUrl).pipe(catchError(this.handleError));

  }


  // Error handling
  public handleError(error:HttpErrorResponse){
    let errorMessage: string = '';
    if(error.error instanceof ErrorEvent){
      // client error
      errorMessage = `Error : ${error.error.message}`
    } else {
      // server error
      errorMessage = `Status : ${error.status} \n message: ${error.message}`
    }
    return throwError(errorMessage)
  }
}
