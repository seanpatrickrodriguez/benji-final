import { Component, WritableSignal, signal } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WithLoading } from '../../../decorators/with-loading.decorator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-session',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateSessionComponent {
  form: FormGroup;
  success: WritableSignal<string | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);

  constructor(private fb: FormBuilder, private sessionService: SessionService) {
    this.form = this.fb.group({
      sessionId: ['', Validators.required],
      sessionDate: ['', Validators.required],
      sessionNumber: ['', Validators.required],
      isMakeup: [false],
      transportationService: [''],
      wellnessActivity: [[]],
      bodyWeight: ['', Validators.required],
      weeklyPhysicalActivityMinutes: ['', Validators.required]
    });
  }

  @WithLoading()
  async updateSession() {
    if (this.form.invalid) {
      this.error.set('Please fill in all required fields correctly.');
      return;
    }

    this.error.set(null);
    try {
      const { sessionId, ...updatedData } = this.form.value;
      await this.sessionService.updateSession(sessionId, updatedData);
      this.success.set('Session updated successfully.');
      this.form.reset();
    } catch (error: any) {
      this.error.set('Error updating session: ' + error.message);
    }
  }
}
