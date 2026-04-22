import CommunityTypes "../types/community";
import Common "../types/common";
import CommunityLib "../lib/community";
import List "mo:core/List";

mixin (
  winners : List.List<CommunityTypes.Winner>,
  badges : List.List<CommunityTypes.Badge>,
) {

  public query func getWinners() : async [CommunityTypes.Winner] {
    CommunityLib.getWinners(winners);
  };

  public query ({ caller }) func getMyBadges() : async [CommunityTypes.Badge] {
    CommunityLib.getUserBadges(badges, caller);
  };
};
