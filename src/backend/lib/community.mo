import CommunityTypes "../types/community";
import Common "../types/common";
import List "mo:core/List";

module {
  public func getWinners(
    winners : List.List<CommunityTypes.Winner>,
  ) : [CommunityTypes.Winner] {
    winners.toArray().filter(func(w : CommunityTypes.Winner) : Bool { w.consentToShare });
  };

  public func getUserBadges(
    badges : List.List<CommunityTypes.Badge>,
    userId : Common.UserId,
  ) : [CommunityTypes.Badge] {
    // Badges are stored globally; in this model we return all badges
    // (a real implementation would store badges per user separately)
    badges.toArray();
  };
};
