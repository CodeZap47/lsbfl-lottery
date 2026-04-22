import StoreTypes "../types/stores";
import Common "../types/common";
import List "mo:core/List";

module {
  public func getStores(
    stores : List.List<StoreTypes.Store>,
  ) : [StoreTypes.Store] {
    stores.toArray();
  };

  public func getStoresByCountry(
    stores : List.List<StoreTypes.Store>,
    country : Text,
  ) : [StoreTypes.Store] {
    stores.toArray().filter(func(s : StoreTypes.Store) : Bool { s.country == country });
  };

  public func recordSale(
    sales : List.List<StoreTypes.POSSale>,
    storeId : Common.StoreId,
    ticketIds : [Common.TicketId],
    totalAmount : Nat,
    commission : Nat,
    now : Common.Timestamp,
  ) : StoreTypes.POSSale {
    let id = "sale-" # storeId # "-" # now.toText();
    let sale : StoreTypes.POSSale = {
      id;
      storeId;
      ticketIds;
      totalAmount;
      soldAt = now;
      commission;
    };
    sales.add(sale);
    sale;
  };

  public func getStoreSales(
    sales : List.List<StoreTypes.POSSale>,
    storeId : Common.StoreId,
  ) : [StoreTypes.POSSale] {
    sales.toArray().filter(func(s : StoreTypes.POSSale) : Bool { s.storeId == storeId });
  };
};
