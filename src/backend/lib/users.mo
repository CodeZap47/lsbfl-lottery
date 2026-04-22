import Types "../types/users";
import Common "../types/common";
import List "mo:core/List";

module {
  public func createUser(
    users : List.List<Types.User>,
    id : Common.UserId,
    name : Text,
    email : ?Text,
    country : Text,
    currency : Text,
    isGuest : Bool,
    now : Common.Timestamp,
  ) : Types.User {
    let user : Types.User = {
      id;
      var name;
      var email;
      var country;
      var currency;
      joinedAt = now;
      isGuest;
    };
    users.add(user);
    user;
  };

  public func getUser(
    users : List.List<Types.User>,
    id : Common.UserId,
  ) : ?Types.UserPublic {
    switch (users.find(func(u : Types.User) : Bool { u.id == id })) {
      case (?u) ?toPublic(u);
      case null null;
    };
  };

  public func updateUserProfile(
    users : List.List<Types.User>,
    id : Common.UserId,
    name : ?Text,
    email : ?Text,
    country : ?Text,
    currency : ?Text,
  ) : Bool {
    switch (users.find(func(u : Types.User) : Bool { u.id == id })) {
      case null false;
      case (?u) {
        switch (name) { case (?n) { u.name := n }; case null {} };
        switch (email) { case (?e) { u.email := ?e }; case null {} };
        switch (country) { case (?c) { u.country := c }; case null {} };
        switch (currency) { case (?c) { u.currency := c }; case null {} };
        true;
      };
    };
  };

  public func getUserStats(
    users : List.List<Types.User>,
    id : Common.UserId,
  ) : ?Types.UserStats {
    switch (users.find(func(u : Types.User) : Bool { u.id == id })) {
      case null null;
      case (?_) {
        ?{
          totalTickets = 0;
          totalWins = 0;
          totalSpent = 0;
          totalWon = 0;
          badges = [];
        };
      };
    };
  };

  public func updateSettings(
    users : List.List<Types.User>,
    id : Common.UserId,
    settings : Types.UserSettings,
  ) : Bool {
    switch (users.find(func(u : Types.User) : Bool { u.id == id })) {
      case null false;
      case (?u) {
        u.currency := settings.currency;
        u.country := settings.country;
        true;
      };
    };
  };

  public func toPublic(user : Types.User) : Types.UserPublic {
    {
      id = user.id;
      name = user.name;
      email = user.email;
      country = user.country;
      currency = user.currency;
      joinedAt = user.joinedAt;
      isGuest = user.isGuest;
    };
  };
};
