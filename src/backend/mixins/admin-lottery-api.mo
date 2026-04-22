import Principal "mo:core/Principal";
import Time "mo:core/Time";
import LotteryTypes "../types/lotteries";
import LotteryConfig "../types/lottery-config";
import List "mo:core/List";
import Validate "../lib/lottery-config-validation";
import DraftBuf "../lib/lottery-draft-buffer";
import Acl "../lib/admin-acl";
import MapLot "../lib/lottery-config-map";
import LotteryLib "../lib/lotteries";

mixin (
  adminBuf : Acl.AdminBuf,
  draftBuf : DraftBuf.DraftBuf,
  lotteries : List.List<LotteryTypes.Lottery>,
  _draws : List.List<LotteryTypes.Draw>,
) {

  public shared ({ caller }) func adminBootstrap() : async () {
    assert (adminBuf.size() == 0);
    adminBuf.add(caller);
  };

  public query func adminIsCallerAuthorized(caller : Principal) : async Bool {
    Acl.contains(adminBuf, caller);
  };

  public query func adminListDraftEntries() : async [LotteryConfig.DraftEntry] {
    DraftBuf.toArray(draftBuf);
  };

  public shared ({ caller }) func adminUpsertDraft(
    config : LotteryConfig.LotteryProductConfig,
  ) : async { #ok; #err : Text } {
    if (not Acl.contains(adminBuf, caller)) {
      return #err("not_authorized");
    };
    if (not Validate.schemaVersionOk(config.identity.schemaVersion)) {
      return #err("bad_schema_version");
    };
    if (not Validate.treasuryPercentsSum100(config.treasury.percents)) {
      return #err("treasury_percents_must_sum_100");
    };
    if (not Validate.identityOk(config)) {
      return #err("invalid_identity");
    };
    DraftBuf.upsert(draftBuf, config.identity.slug, config, Time.now());
    #ok;
  };

  public shared ({ caller }) func adminPublishLottery(
    slug : Text,
  ) : async { #ok : LotteryTypes.Lottery; #err : Text } {
    if (not Acl.contains(adminBuf, caller)) {
      return #err("not_authorized");
    };
    switch (DraftBuf.find(draftBuf, slug)) {
      case null { #err("draft_not_found") };
      case (?entry) {
        let config = entry.config;
        if (not Validate.schemaVersionOk(config.identity.schemaVersion)) {
          return #err("bad_schema_version");
        };
        if (not Validate.treasuryPercentsSum100(config.treasury.percents)) {
          return #err("treasury_percents_must_sum_100");
        };
        switch (LotteryLib.getLotteryById(lotteries, config.identity.slug)) {
          case (?_) {
            return #err("lottery_id_exists");
          };
          case null {};
        };
        let lottery : LotteryTypes.Lottery = {
          id = config.identity.slug;
          name = config.identity.name;
          lotteryType = MapLot.productCategoryToLotteryType(
            config.identity.productCategory,
          );
          drawDate = 1_800_000_000_000_000_000;
          prizePool = config.treasury.guaranteedSeedAmount;
          ticketPrice = config.ticket.basePriceMinorUnits;
          isActive = true;
          participatingCountries = config.compliance.allowedCountryCodes;
        };
        lotteries.add(lottery);
        #ok(lottery);
      };
    };
  };
};
