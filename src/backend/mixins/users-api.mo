import Types "../types/users";
import Common "../types/common";
import UserLib "../lib/users";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (users : List.List<Types.User>) {

  public shared ({ caller }) func createUser(
    name : Text,
    email : ?Text,
    country : Text,
    currency : Text,
    isGuest : Bool,
  ) : async Types.UserPublic {
    let user = UserLib.createUser(users, caller, name, email, country, currency, isGuest, Time.now());
    UserLib.toPublic(user);
  };

  public query ({ caller }) func getUser(id : Common.UserId) : async ?Types.UserPublic {
    UserLib.getUser(users, id);
  };

  public shared ({ caller }) func updateUserProfile(
    name : ?Text,
    email : ?Text,
    country : ?Text,
    currency : ?Text,
  ) : async Bool {
    UserLib.updateUserProfile(users, caller, name, email, country, currency);
  };

  public query ({ caller }) func getUserStats() : async ?Types.UserStats {
    UserLib.getUserStats(users, caller);
  };

  public shared ({ caller }) func updateSettings(settings : Types.UserSettings) : async Bool {
    UserLib.updateSettings(users, caller, settings);
  };
};
