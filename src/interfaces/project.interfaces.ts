export interface IProject {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate: Date | null | undefined;
  developerId: number;
}

export type TProjectCreate = Omit<IProject, "id">;

export type TProjectUpdate = Partial<TProjectCreate>;
