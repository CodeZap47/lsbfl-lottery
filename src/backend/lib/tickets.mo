import TicketTypes "../types/tickets";
import Common "../types/common";
import List "mo:core/List";

module {
  public func purchaseTicket(
    tickets : List.List<TicketTypes.Ticket>,
    ownerId : Common.UserId,
    lotteryId : Common.LotteryId,
    numbers : [Nat],
    artSeed : Nat,
    now : Common.Timestamp,
  ) : TicketTypes.Ticket {
    let id = "ticket-" # ownerId.toText() # "-" # now.toText();
    let ticket : TicketTypes.Ticket = {
      id;
      ownerId;
      lotteryId;
      numbers;
      purchasedAt = now;
      status = #Active;
      artSeed;
      isGifted = false;
      giftedTo = null;
    };
    tickets.add(ticket);
    ticket;
  };

  public func getMyTickets(
    tickets : List.List<TicketTypes.Ticket>,
    ownerId : Common.UserId,
  ) : [TicketTypes.Ticket] {
    tickets.toArray().filter(func(t : TicketTypes.Ticket) : Bool { t.ownerId == ownerId });
  };

  public func giftTicket(
    tickets : List.List<TicketTypes.Ticket>,
    ticketId : Common.TicketId,
    callerId : Common.UserId,
    recipientIdentifier : Text,
  ) : Bool {
    var found = false;
    tickets.mapInPlace(func(t : TicketTypes.Ticket) : TicketTypes.Ticket {
      if (t.id == ticketId and t.ownerId == callerId) {
        found := true;
        { t with isGifted = true; giftedTo = ?recipientIdentifier };
      } else t;
    });
    found;
  };

  public func getTicketById(
    tickets : List.List<TicketTypes.Ticket>,
    id : Common.TicketId,
  ) : ?TicketTypes.Ticket {
    tickets.find(func(t : TicketTypes.Ticket) : Bool { t.id == id });
  };

  public func claimPrize(
    claims : List.List<TicketTypes.PrizeClaim>,
    tickets : List.List<TicketTypes.Ticket>,
    ticketId : Common.TicketId,
    userId : Common.UserId,
    method : TicketTypes.PayoutMethod,
    now : Common.Timestamp,
  ) : ?TicketTypes.PrizeClaim {
    switch (tickets.find(func(t : TicketTypes.Ticket) : Bool { t.id == ticketId and t.ownerId == userId })) {
      case null null;
      case (?_) {
        let claimId = "claim-" # ticketId # "-" # now.toText();
        let claim : TicketTypes.PrizeClaim = {
          id = claimId;
          ticketId;
          userId;
          method;
          status = #Pending;
          claimedAt = now;
          amountClaimed = 0;
        };
        claims.add(claim);
        ?claim;
      };
    };
  };
};
