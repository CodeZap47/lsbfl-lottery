import Common "common";

module {
  public type User = {
    id : Common.UserId;
    var name : Text;
    var email : ?Text;
    var country : Text;
    var currency : Text;
    joinedAt : Common.Timestamp;
    isGuest : Bool;
  };

  public type UserPublic = {
    id : Common.UserId;
    name : Text;
    email : ?Text;
    country : Text;
    currency : Text;
    joinedAt : Common.Timestamp;
    isGuest : Bool;
  };

  public type UserStats = {
    totalTickets : Nat;
    totalWins : Nat;
    totalSpent : Nat;
    totalWon : Nat;
    badges : [Text];
  };

  public type UserSettings = {
    currency : Text;
    country : Text;
    notificationsEnabled : Bool;
    language : Text;
  };
};
