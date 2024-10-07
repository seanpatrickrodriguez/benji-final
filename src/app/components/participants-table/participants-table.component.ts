import { Component, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';

export interface Participant {
  participantId: string;
  affiliateSiteAcronym: string;
  coachId: string;
  cohortId: string;
  samePersonId: string[];
  sex: string;
  birthdate: number;
  height: number;
  city: string;
  state: string;
  zipcode: string;
  ethnicity: string[];
  education: string;
  hba1c: string;
  t1t2Diabetes: boolean;
  pregnant: boolean;
  glucTest: boolean;
  gdm: boolean;
  riskTest: boolean;
  physicalDisability: boolean;
  visualDisability: boolean;
  enrollMot: string;
  enrollHc: string;
  healthInsurance: string;
}

@Component({
  selector: 'app-participants-table',
  standalone: true,
  templateUrl: './participants-table.component.html',
  styleUrls: ['./participants-table.component.scss']
})
export class ParticipantsTableComponent implements OnInit {
  participants: WritableSignal<Participant[]> = signal([]);
  error: WritableSignal<string | null> = signal(null);

  constructor(private participantService: ParticipantService) {}

  ngOnInit(): void {
    this.fetchParticipants();
  }

  fetchParticipants(): void {
    this.error.set(null);
    this.participantService.getParticipants().then(
      (participants: Participant[]) => {
        this.participants.set(participants);
      },
      (error: any) => {
        this.error.set('Error fetching participants: ' + error.message);
      }
    );
  }

  deleteParticipant(participantId: string): void {
    this.error.set(null);
    this.participantService.deleteParticipant(participantId)
      .then(() => {
        // Successfully deleted, no additional handling needed as the signal is updated in the service.
      })
      .catch((error: any) => {
        this.error.set('Error deleting participant: ' + error.message);
      });
  }
}
