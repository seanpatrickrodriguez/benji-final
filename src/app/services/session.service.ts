import { Injectable, WritableSignal, signal } from '@angular/core';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';
import { WithLoading } from '../decorators/with-loading.decorator';

export interface Session {
  participantId: string;
  sessionId: string;
  sessionDate: string;
  sessionNumber: number;
  isMakeup: boolean;
  transportationService: string;
  wellnessActivity: string[];
  bodyWeight: number;
  weeklyPhysicalActivityMinutes: number;
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  sessions: WritableSignal<Session[]> = signal([]);

  constructor(private functions: Functions) {}

  @WithLoading()
  async getSessions(): Promise<Session[]> {
    try {
      const getSessionsFunction = httpsCallable(this.functions, 'getSessions');
      const result = await getSessionsFunction() as HttpsCallableResult<Session[]>;
      this.sessions.set(result.data);
      return result.data;
    } catch (error: any) {
      throw new Error('Error fetching sessions: ' + error.message);
    }
  }

  @WithLoading()
  async deleteSession(sessionId: string): Promise<void> {
    try {
      const deleteSessionFunction = httpsCallable(this.functions, 'deleteSession');
      await deleteSessionFunction({ sessionId });
      const updatedSessions = this.sessions().filter(s => s.sessionId !== sessionId);
      this.sessions.set(updatedSessions);
    } catch (error: any) {
      throw new Error('Error deleting session: ' + error.message);
    }
  }

  @WithLoading()
  async createSession(session: Session): Promise<void> {
    try {
      const createSessionFunction = httpsCallable(this.functions, 'createSession');
      await createSessionFunction(session);
      const updatedSessions = [...this.sessions(), session];
      this.sessions.set(updatedSessions);
    } catch (error: any) {
      throw new Error('Error creating session: ' + error.message);
    }
  }

  @WithLoading()
  async updateSession(sessionId: string, updatedData: Partial<Session>): Promise<void> {
    try {
      const updateSessionFunction = httpsCallable(this.functions, 'updateSession');
      await updateSessionFunction({ sessionId, ...updatedData });
      const updatedSessions = this.sessions().map(s =>
        s.sessionId === sessionId ? { ...s, ...updatedData } : s
      );
      this.sessions.set(updatedSessions);
    } catch (error: any) {
      throw new Error('Error updating session: ' + error.message);
    }
  }
}
