import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-new-collaborator',
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./edit-collaborator.component.css']
})
export class EditCollaboratorComponent implements OnInit {

  public collaborator!: Collaborator;

  public isLoadUpload: boolean = false;

  constructor(
    private notification: NotificationService,
    private collaboratorService: CollaboratorService,
    private router: Router,
    private  route: ActivatedRoute,
    private uploadService: UploadService) { 
  
    
  }

  ngOnInit(): void {
    this.initilizeFields()
  }
  private initilizeFields(): void {
const id = this.route.snapshot.params["id"];
this.collaboratorService.FindById(id).subscribe(collaborator => {
 this.collaborator = collaborator;
})
  }

  public updateCollaborator(form: NgForm): void {
    if(form.valid) {
      this.collaboratorService.updateCollaborator(this.collaborator).subscribe(response => {
        this.notification.ShowMessage("Atualizado com sucesso.");
        this.router.navigate(["/dashboard"]);
      });
    }
    else {
      this.notification.ShowMessage("Dados inválidos.");
    }
  }

  public uploadFile(event: any): void {
    this.isLoadUpload = true;
    const file: File = event.target.files[0];
    this.uploadService.uploadFoto(file).subscribe(uploadResult  => {
      this.isLoadUpload = false;  
      const storageReference = uploadResult.ref;
      const promiseFileUrl = storageReference.getDownloadURL();
      promiseFileUrl.then((fotoUrl: string) => {
        this.collaborator.fotoUrl = fotoUrl;
        console.log(fotoUrl);
      })
    });
  }
}
