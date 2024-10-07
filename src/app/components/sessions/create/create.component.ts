import { Component, WritableSignal, signal } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WithLoading } from '../../../decorators/with-loading.decorator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateSessionComponent {
  form: FormGroup;
  success: WritableSignal<string | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);

  constructor(private fb: FormBuilder, private sessionService: SessionService) {
    this.form = this.fb.group({
      participantId: ['', Validators.required],
      sessionDate: ['', Validators.required],
      sessionNumber: ['', Validators.required],
      isMakeup: [false],
      transportationService: [''],
      wellnessActivity: [[], Validators.required],
      bodyWeight: ['', Validators.required],
      weeklyPhysicalActivityMinutes: ['', Validators.required]
    });
  }

  @WithLoading()
  async createSession() {
    if (this.form.invalid) {
      this.error.set('Please fill in all required fields correctly.');
      return;
    }

    this.error.set(null);
    try {
      await this.sessionService.createSession(this.form.value);
      this.success.set('Session created successfully.');
      this.form.reset();
    } catch (error: any) {
      this.error.set('Error creating session: ' + error.message);
    }
  }
}