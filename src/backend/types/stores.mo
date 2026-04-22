import Common "common";

module {
  public type Store = {
    id : Common.StoreId;
    name : Text;
    address : Text;
    city : Text;
    country : Text;
    lat : Float;
    lng : Float;
    hoursOpen : Text;
    hasTickets : Bool;
    phone : ?Text;
  };

  public type POSSale = {
    id : Text;
    storeId : Common.StoreId;
    ticketIds : [Common.TicketId];
    totalAmount : Nat;
    soldAt : Common.Timestamp;
    commission : Nat;
  };
};
