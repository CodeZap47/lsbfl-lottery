import Text "mo:base/Text";
import LotteryConfig "../types/lottery-config";

module {
  public func treasuryPercentsSum100(p : LotteryConfig.TreasuryPercents) : Bool {
    p.prizes + p.protocol + p.stores + p.contingency + p.gasOrOps == 100;
  };

  public func schemaVersionOk(v : Nat) : Bool {
    v == LotteryConfig.SCHEMA_VERSION_PUBLISH;
  };

  public func identityOk(config : LotteryConfig.LotteryProductConfig) : Bool {
    Text.size(config.identity.slug) > 0 and Text.size(config.identity.name) > 0;
  };
};
