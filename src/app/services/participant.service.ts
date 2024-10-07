import { Injectable, WritableSignal, signal } from '@angular/core';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';
import { Participant } from '../components/participants/table/table.component';
import { WithLoading } from '../decorators/with-loading.decorator';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  participants: WritableSignal<Participant[]> = signal([]);

  constructor(private functions: Functions) {}

  @WithLoading()
  async getParticipants(): Promise<Participant[]> {
    try {
      const getParticipantsFunction = httpsCallable(this.functions, 'getParticipants');
      const result = await getParticipantsFunction() as HttpsCallableResult<Participant[]>;
      this.participants.set(result.data);
      return result.data;
    } catch (error: any) {
      throw new Error('Error fetching participants: ' + error.message);
    }
  }

  @WithLoading()
  async deleteParticipant(participantId: string): Promise<void> {
    try {
      const deleteParticipantFunction = httpsCallable(this.functions, 'deleteParticipant');
      await deleteParticipantFunction({ participantId });
      const updatedParticipants = this.participants().filter(p => p.participantId !== participantId);
      this.participants.set(updatedParticipants);
    } catch (error: any) {
      throw new Error('Error deleting participant: ' + error.message);
    }
  }

  @WithLoading()
  async createParticipant(participant: Participant): Promise<void> {
    try {
      const createParticipantFunction = httpsCallable(this.functions, 'createParticipant');
      await createParticipantFunction(participant);
      const updatedParticipants = [...this.participants(), participant];
      this.participants.set(updatedParticipants);
    } catch (error: any) {
      throw new Error('Error creating participant: ' + error.message);
    }
  }

  @WithLoading()
  async updateParticipant(participantId: string, updatedData: Partial<Participant>): Promise<void> {
    try {
      const updateParticipantFunction = httpsCallable(this.functions, 'updateParticipant');
      await updateParticipantFunction({ participantId, ...updatedData });
      const updatedParticipants = this.participants().map(p =>
        p.participantId === participantId ? { ...p, ...updatedData } : p
      );
      this.participants.set(updatedParticipants);
    } catch (error: any) {
      throw new Error('Error updating participant: ' + error.message);
    }
  }
}