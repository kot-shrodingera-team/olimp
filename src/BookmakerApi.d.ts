interface OlimpBet {
  deleted: boolean;
  event_name: string;
  value: number;
  new_max_bet: number;
}

interface OlimpBetslip {
  [ket: string]: OlimpBet;
}

declare const betslip: OlimpBetslip;
