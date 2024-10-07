import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantService } from '../../services/participant.service';
import { WithLoading } from '../../decorators/with-loading.decorator';

@Component({
  selector: 'app-update-participant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-participant.component.html',
  styleUrls: ['./update-participant.component.scss']
})
export class UpdateParticipantComponent {
  form: FormGroup;
  error: string | null = null;
  success: string | null = null;
  participantId: string = '';

  constructor(private fb: FormBuilder, private participantService: ParticipantService) {
    this.form = this.fb.group({
      affiliateSiteAcronym: ['', Validators.required],
      coachId: ['', Validators.required],
      cohortId: ['', Validators.required],
      // Add additional fields here as necessary
    });
  }

  @WithLoading()
  updateParticipant() {
    if (this.form.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }
    this.error = null;
    this.participantService.updateParticipant(this.participantId, this.form.value)
      .then(() => {
        this.success = 'Participant updated successfully.';
        this.form.reset();
      })
      .catch((error: any) => {
        this.error = 'Error updating participant: ' + error.message;
      });
  }
}
