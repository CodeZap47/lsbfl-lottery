import Buffer "mo:base/Buffer";
import Principal "mo:core/Principal";

module {
  public type AdminBuf = Buffer.Buffer<Principal>;

  public func newAdminBuffer(fromStable : [Principal]) : AdminBuf {
    let b = Buffer.Buffer<Principal>(fromStable.size());
    for (p in fromStable.vals()) {
      b.add(p);
    };
    b;
  };

  public func contains(admins : AdminBuf, caller : Principal) : Bool {
    if (Principal.isAnonymous(caller)) {
      return false;
    };
    for (p in admins.vals()) {
      if (Principal.equal(p, caller)) {
        return true;
      };
    };
    false;
  };

  public func toArray(admins : AdminBuf) : [Principal] {
    admins.toArray();
  };
};
