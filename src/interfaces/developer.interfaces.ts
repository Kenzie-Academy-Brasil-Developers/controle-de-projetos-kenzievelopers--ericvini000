export interface IDevelopers {
  id: number;
  name: string;
  email: string;
}
export type TDeveloperCreate = Omit<IDevelopers, "id">;
export type TDeveloperUpdate = Partial<TDeveloperCreate>;

type TPreferredOs = "Windows" | "Linux" | "MacOS";

export interface IDeveloperInfos {
  id: number;
  developerSince: Date;
  preferredOS: TPreferredOs;
  developerId: number;
}

export type TDeveloperInfosCreate = Omit<
  IDeveloperInfos,
  "id" | "developerId"
>;

export interface IDeveloperResponse {
  developerId: number;
  developerName: string;
  developerEmail: string;
  developerInfoDeveloperSince: Date | null;
  developerInfoPreferredOs: string | null;
}
