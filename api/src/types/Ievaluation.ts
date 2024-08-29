export interface Ievaluation {
  title: string;
  userName: string;
  date: string;
  metrics: Imetrics;
  generalScore: IgeneralScore;
  feedback: string;
}

export interface Imetrics {
  productivity: IgeneralScore;
  jobQuality: IgeneralScore;
  teamWork: IgeneralScore;
  punctuality: IgeneralScore;
  communication: IgeneralScore;
  initiative: IgeneralScore;
}

export interface IgeneralScore {
  score: number;
}
