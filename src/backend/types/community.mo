import Common "common";

module {
  public type BadgeType = {
    #Participant;
    #Gifter;
    #Winner;
    #MegaWinner;
  };

  public type Badge = {
    id : Text;
    name : Text;
    description : Text;
    earnedAt : Common.Timestamp;
    badgeType : BadgeType;
  };

  public type Winner = {
    id : Text;
    userId : Common.UserId;
    displayName : Text;
    country : Text;
    prizeAmount : Nat;
    lotteryName : Text;
    wonAt : Common.Timestamp;
    consentToShare : Bool;
  };
};
