export type Game = {
  id: number;
  game_date: string;
  game_time?: string | null;
  stadium: string;
  home_team: string;
  home_mascot: string;
  home_rank?: number | null;
  away_team: string;
  away_mascot: string;
  away_rank?: number | null;
  home_score?: number | null;
  away_score?: number | null;
  conference_game: boolean;
  neutral_site: boolean;
  game_played: boolean;
};

export type NextGame = {
  id: number;
  name: string;
  mascot: string;
  stadium: string;
  total_wins?: number | 0;
  total_losses?: number | 0;
  conference_wins?: number | 0;
  conference_losses?: number | 0;
  home_wins?: number | 0;
  home_losses?: number | 0;
  away_wins?: number | 0;
  away_losses?: number | 0;
  neutral_wins?: number | 0;
  neutral_losses?: number | 0;
  team_rank?: number | null;
  primary_color?: string | null;
  secondary_color?: string | null;
  sec_team?: boolean | false;
  next_game?: Game | null;
};

export type Team = {
  id: number;
  name: string;
  mascot: string;
  stadium: string;
  total_wins?: number | 0;
  total_losses?: number | 0;
  conference_wins?: number | 0;
  conference_losses?: number | 0;
  home_wins?: number | 0;
  home_losses?: number | 0;
  away_wins?: number | 0;
  away_losses?: number | 0;
  neutral_wins?: number | 0;
  neutral_losses?: number | 0;
  team_rank?: number | null;
  primary_color?: string | null;
  secondary_color?: string | null;
  sec_team?: boolean | false;
  games?: Game[];
};

export type TeamEnum =
  | "alabama"
  | "arkansas"
  | "auburn"
  | "florida"
  | "georgia"
  | "kentucky"
  | "lsu"
  | "mississippi_state"
  | "missouri"
  | "oklahoma"
  | "ole_miss"
  | "south_carolina"
  | "tennessee"
  | "texas"
  | "texas_a&m"
  | "vanderbilt";

export type SortEnum = "alpha" | "rank" | "record";
