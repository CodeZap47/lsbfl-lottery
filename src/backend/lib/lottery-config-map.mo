import LotteryConfig "../types/lottery-config";
import LotteryTypes "../types/lotteries";

module {
  public func productCategoryToLotteryType(c : LotteryConfig.ProductCategory) : LotteryTypes.LotteryType {
    switch (c) {
      case (#classic) #Classic645;
      case (#no_loss) #NoLoss;
      case (#raffle_nft) #NFTRaffle;
      case (#progressive) #Daily;
      case (#instant_win) #Daily;
    };
  };
};
