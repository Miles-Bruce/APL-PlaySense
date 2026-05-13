export type MomentType = 
  | 'WICKET' 
  | 'SIX' 
  | 'FOUR' 
  | 'CENTURY_APPROACHING' 
  | 'LAST_OVER' 
  | 'PARTNERSHIP_MILESTONE' 
  | 'MATCH_TIED';

export type EmotionalWeight = 'HIGH' | 'MEDIUM' | 'LOW';

export interface MatchContext {
  score: string;
  overs: string;
  requiredRuns: number;
  ballsRemaining: number;
}

export interface MatchEvent {
  momentType: MomentType;
  playerName: string;
  teamName: string;
  matchContext: MatchContext;
  emotionalWeight?: EmotionalWeight;
  summary?: string;
}

export interface PlayerStats {
  name: string;
  team: string;
  runs: number;
  balls: number;
  wickets?: number;
  overs?: number;
}

export interface Interaction {
  id: string;
  type: 'PredictionPoll' | 'HypeCard' | 'TriviaCard';
  momentType: MomentType;
  question?: string;
  options?: string[];
  timer: number;
  hypeText?: string;
  emoji?: string;
  correctIndex?: number;
  funFact?: string;
}

export interface VoteData {
  interactionId: string;
  option: string;
  fanTeam: string;
  timestamp: number;
}
