import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { SessionService, Session } from '../../../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sessions-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class SessionsTableComponent implements OnInit {
  sessions: WritableSignal<Session[]> = signal([]);
  error: WritableSignal<string | null> = signal(null);

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.fetchSessions();
  }

  async fetchSessions() {
    this.error.set(null);
    try {
      const sessions = await this.sessionService.getSessions();
      this.sessions.set(sessions);
    } catch (error: any) {
      this.error.set('Error fetching sessions: ' + error.message);
    }
  }

  async deleteSession(sessionId: string) {
    if (confirm('Are you sure you want to delete this session?')) {
      try {
        await this.sessionService.deleteSession(sessionId);
        this.fetchSessions();
      } catch (error: any) {
        this.error.set('Error deleting session: ' + error.message);
      }
    }
  }
}