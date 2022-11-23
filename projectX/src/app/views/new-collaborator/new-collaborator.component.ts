import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-new-collaborator',
  templateUrl: './new-collaborator.component.html',
  styleUrls: ['./new-collaborator.component.css']
})
export class NewCollaboratorComponent implements OnInit {

  public formCollaborator: FormGroup

  constructor(
    fb : FormBuilder,
    private notification: NotificationService,
    private collaboratorService: CollaboratorService,
    private router: Router) { 
  
    this.formCollaborator =fb.group({
      nome: ["", [Validators.required, Validators.maxLength(30)]],
      cpf: ["", [Validators.required]],
      dataNascimento: ["", [Validators.required]],
      cargo: ["", [Validators.required]],
      setor: ["", [Validators.required]],
      estado: ["", [Validators.required]],
      cidade: ["", [Validators.required]],
      remuneracao: ["", [Validators.required, Validators.min(0)]],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }

  public createCollaborator(): void {
    if(this.formCollaborator.valid){
const collaborator: Collaborator =  this.formCollaborator.value;
// ENVIAR PAR O BANCO  DE DADOS
this.collaboratorService.createCollaborator(collaborator).subscribe(Response =>{
  this.notification.ShowMessage("Cadastrado com sucesso.");
  this.router.navigate(["/dashboard"]);
   });
 }
    else {
      this.notification.ShowMessage("Dados inválidos.");
    }
  }
}