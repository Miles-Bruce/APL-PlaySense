import { MatchEvent, PlayerStats, MatchContext } from '../types';

export const mockMatchContext: MatchContext = {
  score: '142/5',
  overs: '17.3',
  requiredRuns: 36,
  ballsRemaining: 15,
};

export const mockEvents: MatchEvent[] = [
  {
    momentType: 'WICKET',
    playerName: 'Ravindra Jadeja',
    teamName: 'CSK',
    matchContext: mockMatchContext,
    emotionalWeight: 'HIGH',
  },
  {
    momentType: 'SIX',
    playerName: 'MS Dhoni',
    teamName: 'CSK',
    matchContext: mockMatchContext,
    emotionalWeight: 'HIGH',
  },
  {
    momentType: 'FOUR',
    playerName: 'MS Dhoni',
    teamName: 'CSK',
    matchContext: mockMatchContext,
    emotionalWeight: 'MEDIUM',
  },
  {
    momentType: 'CENTURY_APPROACHING',
    playerName: 'MS Dhoni',
    teamName: 'CSK',
    matchContext: mockMatchContext,
    emotionalWeight: 'HIGH',
  },
  {
    momentType: 'LAST_OVER',
    playerName: 'MS Dhoni',
    teamName: 'CSK',
    matchContext: { ...mockMatchContext, overs: '19.0', ballsRemaining: 6, requiredRuns: 12 },
    emotionalWeight: 'HIGH',
  },
  {
    momentType: 'PARTNERSHIP_MILESTONE',
    playerName: 'MS Dhoni',
    teamName: 'CSK',
    matchContext: mockMatchContext,
    emotionalWeight: 'MEDIUM',
  },
  {
    momentType: 'MATCH_TIED',
    playerName: 'MS Dhoni',
    teamName: 'CSK',
    matchContext: { score: '178/6', overs: '20.0', requiredRuns: 0, ballsRemaining: 0 },
    emotionalWeight: 'HIGH',
  },
];

export const mockPlayers: PlayerStats[] = [
  { name: 'MS Dhoni', team: 'CSK', runs: 34, balls: 18 },
  { name: 'Ravindra Jadeja', team: 'CSK', runs: 28, balls: 14 },
  { name: 'Virat Kohli', team: 'RCB', runs: 0, balls: 0 }, // Unused in this match but requested
  { name: 'Rohit Sharma', team: 'MI', runs: 0, balls: 0 }, // Unused in this match but requested
  { name: 'Jasprit Bumrah', team: 'MI', runs: 0, balls: 0, wickets: 2, overs: 3.3 },
];
