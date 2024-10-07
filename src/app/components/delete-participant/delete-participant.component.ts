import { Component } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { WithLoading } from '../../decorators/with-loading.decorator';

@Component({
  selector: 'app-delete-participant',
  standalone: true,
  templateUrl: './delete-participant.component.html',
  styleUrls: ['./delete-participant.component.scss']
})
export class DeleteParticipantComponent {
  error: string | null = null;
  success: string | null = null;
  showConfirmation: boolean = false;
  participantId: string = '';

  constructor(private participantService: ParticipantService) {}

  confirmDelete(id: string) {
    this.participantId = id;
    this.showConfirmation = true;
  }

  @WithLoading()
  deleteParticipant() {
    this.error = null;
    this.success = null;

    this.participantService.deleteParticipant(this.participantId)
      .then(() => {
        this.success = 'Participant deleted successfully.';
        this.showConfirmation = false;
      })
      .catch((error: any) => {
        this.error = `Error deleting participant: ${error.message}`;
      });
  }

  cancelDelete() {
    this.showConfirmation = false;
  }
}
