import Common "common";

module {
  public type TicketStatus = {
    #Unclaimed;
    #Active;
    #InDraw;
    #Winner;
    #Lost;
  };

  public type Ticket = {
    id : Common.TicketId;
    ownerId : Common.UserId;
    lotteryId : Common.LotteryId;
    numbers : [Nat];
    purchasedAt : Common.Timestamp;
    status : TicketStatus;
    artSeed : Nat;
    isGifted : Bool;
    giftedTo : ?Text;
  };

  public type PayoutMethod = {
    #Wallet;
    #BankTransfer;
    #StoreCredit;
    #Crypto;
  };

  public type ClaimStatus = {
    #Pending;
    #Processing;
    #Completed;
  };

  public type PrizeClaim = {
    id : Text;
    ticketId : Common.TicketId;
    userId : Common.UserId;
    method : PayoutMethod;
    status : ClaimStatus;
    claimedAt : Common.Timestamp;
    amountClaimed : Nat;
  };
};
