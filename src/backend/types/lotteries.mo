import Common "common";

module {
  public type LotteryType = {
    #Classic645;
    #Daily;
    #NFTRaffle;
    #NoLoss;
  };

  public type Lottery = {
    id : Common.LotteryId;
    name : Text;
    lotteryType : LotteryType;
    drawDate : Common.Timestamp;
    prizePool : Nat;
    ticketPrice : Nat;
    isActive : Bool;
    participatingCountries : [Text];
  };

  public type DrawStatus = {
    #Upcoming;
    #InProgress;
    #Completed;
  };

  public type Draw = {
    id : Common.DrawId;
    lotteryId : Common.LotteryId;
    drawnNumbers : [Nat];
    status : DrawStatus;
    drawnAt : ?Common.Timestamp;
    fairnessSeal : Text;
  };
};
