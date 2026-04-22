import Buffer "mo:base/Buffer";
import LotteryConfig "../types/lottery-config";
import Common "../types/common";

module {
  public type DraftBuf = Buffer.Buffer<LotteryConfig.DraftEntry>;

  public func new() : DraftBuf {
    Buffer.Buffer<LotteryConfig.DraftEntry>(0);
  };

  public func upsert(buf : DraftBuf, slug : Text, config : LotteryConfig.LotteryProductConfig, now : Common.Timestamp) {
    let tmp = Buffer.Buffer<LotteryConfig.DraftEntry>(buf.size());
    for (e in buf.vals()) {
      if (e.slug != slug) {
        tmp.add(e);
      };
    };
    tmp.add({ slug; config; updatedAt = now });
    buf.clear();
    for (e in tmp.vals()) {
      buf.add(e);
    };
  };

  public func find(buf : DraftBuf, slug : Text) : ?LotteryConfig.DraftEntry {
    for (e in buf.vals()) {
      if (e.slug == slug) {
        return ?e;
      };
    };
    null;
  };

  public func toArray(buf : DraftBuf) : [LotteryConfig.DraftEntry] {
    buf.toArray();
  };

  public func fromArray(entries : [LotteryConfig.DraftEntry]) : DraftBuf {
    let b = Buffer.Buffer<LotteryConfig.DraftEntry>(entries.size());
    for (e in entries.vals()) {
      b.add(e);
    };
    b;
  };
};
