import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { Collaborator } from 'src/app/models/collaborator';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['foto', 'nome', 'email', 'cpf', 'cargo', 'setor','excluir', 'editar', 'detalhes'];
  dataSource: Collaborator[] = [ ];

  constructor(
    private collaboratorService: CollaboratorService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initilizeTable()
  }

  private initilizeTable(): void {
// CAPTURAR OS DADOS DE FIRESTORE E PREENCHER O VETOR DE COLABORADORES
this.collaboratorService.findAll().subscribe(collaborators =>{
  this.dataSource = collaborators;
})
  }

  public deleteCollaborator(id: string): void {
    this.collaboratorService.deleteCollaborator(id).subscribe(reponse => {
      this.notification.ShowMessage("Apagado")
      this.initilizeTable();
    })
  }

  public openDetails(collaborator: Collaborator): void {
    // ABRIR CAIXA DE DIALOGO COM INFORMAÇÕES DO COLABORADOR
    this.dialog.open(DetailsComponent, {
      width: "400px",
      data: collaborator
    })
  }



}
