import { Component, WritableSignal, signal } from '@angular/core';
import { SessionService } from '../../../services/session.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WithLoading } from '../../../decorators/with-loading.decorator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-session',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteSessionComponent {
  form: FormGroup;
  success: WritableSignal<string | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);
  showConfirmation: WritableSignal<boolean> = signal(false);

  constructor(private fb: FormBuilder, private sessionService: SessionService) {
    this.form = this.fb.group({
      sessionId: ['', Validators.required]
    });
  }

  confirmDelete() {
    if (this.form.invalid) {
      this.error.set('Please provide a valid session ID.');
      return;
    }
    this.showConfirmation.set(true);
  }

  @WithLoading()
  async deleteSession() {
    this.error.set(null);
    try {
      const { sessionId } = this.form.value;
      await this.sessionService.deleteSession(sessionId);
      this.success.set('Session deleted successfully.');
      this.showConfirmation.set(false);
      this.form.reset();
    } catch (error: any) {
      this.error.set('Error deleting session: ' + error.message);
    }
  }

  cancelDelete() {
    this.showConfirmation.set(false);
  }
}