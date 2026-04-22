import TicketTypes "../types/tickets";
import Common "../types/common";
import TicketLib "../lib/tickets";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  tickets : List.List<TicketTypes.Ticket>,
  claims : List.List<TicketTypes.PrizeClaim>,
) {

  public shared ({ caller }) func purchaseTicket(
    lotteryId : Common.LotteryId,
    numbers : [Nat],
    artSeed : Nat,
  ) : async TicketTypes.Ticket {
    TicketLib.purchaseTicket(tickets, caller, lotteryId, numbers, artSeed, Time.now());
  };

  public query ({ caller }) func getMyTickets() : async [TicketTypes.Ticket] {
    TicketLib.getMyTickets(tickets, caller);
  };

  public shared ({ caller }) func giftTicket(
    ticketId : Common.TicketId,
    recipientIdentifier : Text,
  ) : async Bool {
    TicketLib.giftTicket(tickets, ticketId, caller, recipientIdentifier);
  };

  public query func getTicketById(id : Common.TicketId) : async ?TicketTypes.Ticket {
    TicketLib.getTicketById(tickets, id);
  };

  public shared ({ caller }) func claimPrize(
    ticketId : Common.TicketId,
    method : TicketTypes.PayoutMethod,
  ) : async ?TicketTypes.PrizeClaim {
    TicketLib.claimPrize(claims, tickets, ticketId, caller, method, Time.now());
  };
};
