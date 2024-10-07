import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantService } from '../../services/participant.service';
import { WithLoading } from '../../decorators/with-loading.decorator';

@Component({
  selector: 'app-create-participant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-participant.component.html',
  styleUrls: ['./create-participant.component.scss']
})
export class CreateParticipantComponent {
  form: FormGroup;
  success: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService
  ) {
    this.form = this.fb.group({
      participantId: ['', Validators.required],
      affiliateSiteAcronym: ['', Validators.required],
      coachId: ['', Validators.required],
      cohortId: ['', Validators.required],
      // Add additional fields here as necessary
    });
  }

  @WithLoading()
  createParticipant() {
    if (this.form.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    this.success = null;
    this.error = null;

    this.participantService.createParticipant(this.form.value)
      .then(() => {
        this.success = 'Participant created successfully.';
        this.form.reset();
      })
      .catch((error: any) => {
        this.error = 'Error creating participant: ' + error.message;
      });
  }
}
