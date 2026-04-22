import LotteryTypes "../types/lotteries";
import Common "../types/common";
import List "mo:core/List";

module {
  public func getLotteries(
    lotteries : List.List<LotteryTypes.Lottery>,
  ) : [LotteryTypes.Lottery] {
    lotteries.toArray().filter(func(l : LotteryTypes.Lottery) : Bool { l.isActive });
  };

  public func getLotteryById(
    lotteries : List.List<LotteryTypes.Lottery>,
    id : Common.LotteryId,
  ) : ?LotteryTypes.Lottery {
    lotteries.find(func(l : LotteryTypes.Lottery) : Bool { l.id == id });
  };

  public func getDrawByLottery(
    draws : List.List<LotteryTypes.Draw>,
    lotteryId : Common.LotteryId,
  ) : [LotteryTypes.Draw] {
    draws.toArray().filter(func(d : LotteryTypes.Draw) : Bool { d.lotteryId == lotteryId });
  };

  public func getLatestDraw(
    draws : List.List<LotteryTypes.Draw>,
    lotteryId : Common.LotteryId,
  ) : ?LotteryTypes.Draw {
    let filtered = draws.toArray().filter(func(d : LotteryTypes.Draw) : Bool { d.lotteryId == lotteryId });
    // Return the last draw added (highest index = most recent)
    if (filtered.size() == 0) null else ?filtered[filtered.size() - 1];
  };
};
