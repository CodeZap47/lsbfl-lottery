import StoreTypes "../types/stores";
import Common "../types/common";
import StoreLib "../lib/stores";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  stores : List.List<StoreTypes.Store>,
  sales : List.List<StoreTypes.POSSale>,
) {

  public query func getStores() : async [StoreTypes.Store] {
    StoreLib.getStores(stores);
  };

  public query func getStoresByCountry(country : Text) : async [StoreTypes.Store] {
    StoreLib.getStoresByCountry(stores, country);
  };

  public shared ({ caller }) func recordSale(
    storeId : Common.StoreId,
    ticketIds : [Common.TicketId],
    totalAmount : Nat,
    commission : Nat,
  ) : async StoreTypes.POSSale {
    StoreLib.recordSale(sales, storeId, ticketIds, totalAmount, commission, Time.now());
  };

  public query ({ caller }) func getStoreSales(storeId : Common.StoreId) : async [StoreTypes.POSSale] {
    StoreLib.getStoreSales(sales, storeId);
  };
};
