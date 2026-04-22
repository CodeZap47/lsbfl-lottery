import LotteryTypes "../types/lotteries";
import Common "../types/common";
import LotteryLib "../lib/lotteries";
import List "mo:core/List";

mixin (
  lotteries : List.List<LotteryTypes.Lottery>,
  draws : List.List<LotteryTypes.Draw>,
) {

  public query func getLotteries() : async [LotteryTypes.Lottery] {
    LotteryLib.getLotteries(lotteries);
  };

  public query func getLotteryById(id : Common.LotteryId) : async ?LotteryTypes.Lottery {
    LotteryLib.getLotteryById(lotteries, id);
  };

  public query func getDrawByLottery(lotteryId : Common.LotteryId) : async [LotteryTypes.Draw] {
    LotteryLib.getDrawByLottery(draws, lotteryId);
  };

  public query func getLatestDraw(lotteryId : Common.LotteryId) : async ?LotteryTypes.Draw {
    LotteryLib.getLatestDraw(draws, lotteryId);
  };
};
