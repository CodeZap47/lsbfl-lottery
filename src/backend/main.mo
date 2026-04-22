import List "mo:core/List";
import Principal "mo:core/Principal";
import UserTypes "types/users";
import LotteryTypes "types/lotteries";
import TicketTypes "types/tickets";
import StoreTypes "types/stores";
import CommunityTypes "types/community";
import UsersApi "mixins/users-api";
import LotteriesApi "mixins/lotteries-api";
import TicketsApi "mixins/tickets-api";
import StoresApi "mixins/stores-api";
import CommunityApi "mixins/community-api";

actor {
  // ── User state ──────────────────────────────────────────────────────────────
  let users = List.empty<UserTypes.User>();

  // ── Lottery & draw state ─────────────────────────────────────────────────────
  let lotteries = List.fromArray<LotteryTypes.Lottery>([
    {
      id = "lottery-classic645";
      name = "Classic 6/45";
      lotteryType = #Classic645;
      drawDate = 1_800_000_000_000_000_000;
      prizePool = 10_000_000;
      ticketPrice = 50;
      isActive = true;
      participatingCountries = ["MX", "AR", "CO", "PE", "CL"];
    },
    {
      id = "lottery-daily";
      name = "Sorteo Diario";
      lotteryType = #Daily;
      drawDate = 1_800_000_000_000_000_000;
      prizePool = 500_000;
      ticketPrice = 20;
      isActive = true;
      participatingCountries = ["MX", "AR", "CO", "PE", "CL", "VE", "EC"];
    },
    {
      id = "lottery-nft";
      name = "Rifa NFT";
      lotteryType = #NFTRaffle;
      drawDate = 1_800_000_000_000_000_000;
      prizePool = 2_000_000;
      ticketPrice = 100;
      isActive = true;
      participatingCountries = ["MX", "AR", "CO"];
    },
    {
      id = "lottery-noloss";
      name = "Sin Pérdida";
      lotteryType = #NoLoss;
      drawDate = 1_800_000_000_000_000_000;
      prizePool = 1_000_000;
      ticketPrice = 30;
      isActive = true;
      participatingCountries = ["MX", "AR", "CO", "PE", "CL"];
    },
  ]);

  let draws = List.fromArray<LotteryTypes.Draw>([
    {
      id = "draw-classic645-001";
      lotteryId = "lottery-classic645";
      drawnNumbers = [14, 22, 37, 5, 41];
      status = #Completed;
      drawnAt = ?1_700_000_000_000_000_000;
      fairnessSeal = "SHA256:a1b2c3d4e5f6";
    },
  ]);

  // ── Ticket & prize claim state ───────────────────────────────────────────────
  let tickets = List.empty<TicketTypes.Ticket>();
  let claims = List.empty<TicketTypes.PrizeClaim>();

  // ── Store & POS state ────────────────────────────────────────────────────────
  let stores = List.fromArray<StoreTypes.Store>([
    {
      id = "store-mx-cdmx-001";
      name = "LSBFL Centro CDMX";
      address = "Av. Juárez 100, Centro Histórico";
      city = "Ciudad de México";
      country = "MX";
      lat = 19.4326;
      lng = -99.1332;
      hoursOpen = "09:00–21:00";
      hasTickets = true;
      phone = ?"+52 55 1234 5678";
    },
    {
      id = "store-mx-gdl-001";
      name = "LSBFL Guadalajara";
      address = "Av. Chapultepec 200, Americana";
      city = "Guadalajara";
      country = "MX";
      lat = 20.6597;
      lng = -103.3496;
      hoursOpen = "09:00–20:00";
      hasTickets = true;
      phone = ?"+52 33 9876 5432";
    },
    {
      id = "store-mx-mty-001";
      name = "LSBFL Monterrey";
      address = "Calzada del Valle 300, San Pedro";
      city = "Monterrey";
      country = "MX";
      lat = 25.6866;
      lng = -100.3161;
      hoursOpen = "10:00–19:00";
      hasTickets = true;
      phone = null;
    },
    {
      id = "store-ar-bue-001";
      name = "LSBFL Buenos Aires";
      address = "Florida 600, Microcentro";
      city = "Buenos Aires";
      country = "AR";
      lat = -34.6037;
      lng = -58.3816;
      hoursOpen = "09:00–20:00";
      hasTickets = true;
      phone = ?"+54 11 4567 8901";
    },
    {
      id = "store-ar-cor-001";
      name = "LSBFL Córdoba";
      address = "Av. General Paz 500, Centro";
      city = "Córdoba";
      country = "AR";
      lat = -31.4201;
      lng = -64.1888;
      hoursOpen = "10:00–18:00";
      hasTickets = true;
      phone = null;
    },
    {
      id = "store-co-bog-001";
      name = "LSBFL Bogotá";
      address = "Carrera 7 # 32-15, La Candelaria";
      city = "Bogotá";
      country = "CO";
      lat = 4.7110;
      lng = -74.0721;
      hoursOpen = "09:00–19:00";
      hasTickets = true;
      phone = ?"+57 1 345 6789";
    },
    {
      id = "store-co-med-001";
      name = "LSBFL Medellín";
      address = "Calle 10 # 43E-31, El Poblado";
      city = "Medellín";
      country = "CO";
      lat = 6.2087;
      lng = -75.5740;
      hoursOpen = "10:00–20:00";
      hasTickets = true;
      phone = null;
    },
    {
      id = "store-co-cal-001";
      name = "LSBFL Cali";
      address = "Av. 6N # 23-09, Granada";
      city = "Cali";
      country = "CO";
      lat = 3.4516;
      lng = -76.5320;
      hoursOpen = "09:00–18:00";
      hasTickets = true;
      phone = ?"+57 2 891 0123";
    },
  ]);

  let sales = List.empty<StoreTypes.POSSale>();

  // ── Community state ──────────────────────────────────────────────────────────
  let winners = List.fromArray<CommunityTypes.Winner>([
    {
      id = "winner-001";
      userId = Principal.fromText("aaaaa-aa");
      displayName = "María G.";
      country = "MX";
      prizeAmount = 500_000;
      lotteryName = "Classic 6/45";
      wonAt = 1_700_000_000_000_000_000;
      consentToShare = true;
    },
    {
      id = "winner-002";
      userId = Principal.fromText("aaaaa-aa");
      displayName = "Carlos R.";
      country = "AR";
      prizeAmount = 250_000;
      lotteryName = "Sorteo Diario";
      wonAt = 1_700_100_000_000_000_000;
      consentToShare = true;
    },
    {
      id = "winner-003";
      userId = Principal.fromText("aaaaa-aa");
      displayName = "Ana P.";
      country = "CO";
      prizeAmount = 1_000_000;
      lotteryName = "Rifa NFT";
      wonAt = 1_700_200_000_000_000_000;
      consentToShare = true;
    },
    {
      id = "winner-004";
      userId = Principal.fromText("aaaaa-aa");
      displayName = "Luis T.";
      country = "MX";
      prizeAmount = 150_000;
      lotteryName = "Sin Pérdida";
      wonAt = 1_700_300_000_000_000_000;
      consentToShare = true;
    },
    {
      id = "winner-005";
      userId = Principal.fromText("aaaaa-aa");
      displayName = "Sofia M.";
      country = "CO";
      prizeAmount = 300_000;
      lotteryName = "Classic 6/45";
      wonAt = 1_700_400_000_000_000_000;
      consentToShare = true;
    },
  ]);

  let badges = List.empty<CommunityTypes.Badge>();

  // ── Mixin composition ────────────────────────────────────────────────────────
  include UsersApi(users);
  include LotteriesApi(lotteries, draws);
  include TicketsApi(tickets, claims);
  include StoresApi(stores, sales);
  include CommunityApi(winners, badges);
};
