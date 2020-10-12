export interface OlimpBet {
  deleted: boolean;
  event_name: string;
  value: number;
  new_max_bet: number;
}

export interface OlimpCloneBet {
  deleted: boolean;
  value: number;
  vmaxbet: string;
}

export interface OutcomeGroupList {
  memoizedProps: {
    children: {
      props: {
        children: {
          props: {
            id: number;
            name: string;
            onClick: () => void;
          };
        };
      };
    }[];
  };
}

interface OlimpBetslip {
  [key: string]: OlimpBet | OlimpCloneBet;
}

declare global {
  const betslip: OlimpBetslip;
  const betAdd: (
    id: string,
    sid: string,
    mtype: string,
    value: string,
    value1: string
  ) => unknown;
  const betClear: () => unknown;
}

export default {};
