import { Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-jugador-edit',
  templateUrl: './jugador-edit.component.html',
  styleUrls: ['./jugador-edit.component.scss']
})
export class JugadorEditComponent {
  constructor(public dialogRef: MatDialogRef<JugadorEditComponent>) {}
    
  onCancel(): void {
    this.dialogRef.close('Cancelar');
  }

  closeDialog() {
    this.dialogRef.close('Cerrar');
  }
}