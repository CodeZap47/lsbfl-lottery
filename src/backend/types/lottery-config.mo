import Common "common";

module {
  public type Lifecycle = {
    #draft;
    #scheduled;
    #live;
    #paused;
    #archived;
  };

  public type ProductCategory = {
    #classic;
    #no_loss;
    #raffle_nft;
    #progressive;
    #instant_win;
  };

  public type TreasuryPercents = {
    prizes : Nat;
    protocol : Nat;
    stores : Nat;
    contingency : Nat;
    gasOrOps : Nat;
  };

  public type LotteryIdentity = {
    name : Text;
    slug : Text;
    shortDescription : Text;
    iconEmoji : Text;
    themeColorHex : Text;
    productCategory : ProductCategory;
    contractSchemaSemantic : Text;
    schemaVersion : Nat;
    lifecycle : Lifecycle;
  };

  public type ScheduleConfig = {
    cronExpression : Text;
    timezoneIana : Text;
    salesStartAtIso : Text;
    salesCloseMinutesBeforeDraw : Nat;
    drawAtIso : Text;
    claimWindowDays : Nat;
  };

  public type TicketConfig = {
    pickRule : Text;
    numberMin : Nat;
    numberMax : Nat;
    basePriceMinorUnits : Nat;
    basePriceCurrency : Text;
    maxTicketsPerUser : Nat;
  };

  public type WinnerAlgorithm = {
    #match_N_numbers;
    #random_weighted_by_balance;
    #random_single_winner;
    #top_K_winners;
    #tiered;
  };

  public type WinnerSelectionConfig = {
    algorithm : WinnerAlgorithm;
    minMatchesForPayout : Nat;
  };

  public type TreasuryConfig = {
    prizeCurrency : Text;
    guaranteedSeedAmount : Nat;
    percents : TreasuryPercents;
    storeCommissionPercent : Nat;
    protocolCommissionPercent : Nat;
  };

  public type RngStrategy = {
    #icp_chain_key;
    #raw_rand;
    #commit_reveal;
    #drand_compatible;
  };

  public type RngConfig = {
    primary : RngStrategy;
    fallback : RngStrategy;
    randomWords : Nat;
  };

  public type ComplianceConfig = {
    allowedCountryCodes : [Text];
    minimumAge : Nat;
    termsUrl : Text;
  };

  public type LotteryProductConfig = {
    identity : LotteryIdentity;
    schedule : ScheduleConfig;
    ticket : TicketConfig;
    winnerSelection : WinnerSelectionConfig;
    treasury : TreasuryConfig;
    rng : RngConfig;
    compliance : ComplianceConfig;
  };

  public type DraftEntry = {
    slug : Text;
    config : LotteryProductConfig;
    updatedAt : Common.Timestamp;
  };

  public let SCHEMA_VERSION_PUBLISH : Nat = 1;
};
