import { Injectable, WritableSignal, signal } from '@angular/core';
import { Functions, httpsCallable, HttpsCallableResult } from '@angular/fire/functions';
import { WithLoading } from '../decorators/with-loading.decorator';

export interface Cohort {
  cohortId?: string;
  coachId: string;
  cohortName: string;
  participants: string[];
  startDate: string;
  endDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class CohortService {
  cohorts: WritableSignal<Cohort[]> = signal([]);

  constructor(private functions: Functions) {}

  @WithLoading()
  async getCohorts(): Promise<Cohort[]> {
    try {
      const getCohortsFunction = httpsCallable(this.functions, 'getCohorts');
      const result = await getCohortsFunction() as HttpsCallableResult<Cohort[]>;
      this.cohorts.set(result.data);
      return result.data;
    } catch (error: any) {
      throw new Error('Error fetching cohorts: ' + error.message);
    }
  }

  @WithLoading()
  async deleteCohort(cohortId: string): Promise<void> {
    try {
      const deleteCohortFunction = httpsCallable(this.functions, 'deleteCohort');
      await deleteCohortFunction({ cohortId });
      const updatedCohorts = this.cohorts().filter(c => c.cohortId !== cohortId);
      this.cohorts.set(updatedCohorts);
    } catch (error: any) {
      throw new Error('Error deleting cohort: ' + error.message);
    }
  }

  @WithLoading()
  async createCohort(cohort: Cohort): Promise<void> {
    try {
      const createCohortFunction = httpsCallable(this.functions, 'createCohort');
      const result = await createCohortFunction(cohort) as HttpsCallableResult<{ cohortId: string }>;
      cohort.cohortId = result.data.cohortId;
      const updatedCohorts = [...this.cohorts(), cohort];
      this.cohorts.set(updatedCohorts);
    } catch (error: any) {
      throw new Error('Error creating cohort: ' + error.message);
    }
  }

  @WithLoading()
  async updateCohort(cohortId: string, updatedData: Partial<Cohort>): Promise<void> {
    try {
      const updateCohortFunction = httpsCallable(this.functions, 'updateCohort');
      await updateCohortFunction({ cohortId, ...updatedData });
      const updatedCohorts = this.cohorts().map(c =>
        c.cohortId === cohortId ? { ...c, ...updatedData } : c
      );
      this.cohorts.set(updatedCohorts);
    } catch (error: any) {
      throw new Error('Error updating cohort: ' + error.message);
    }
  }
}