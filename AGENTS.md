# Project Guidance

## User Preferences

[No preferences yet]

## LSBFL architecture decisions (product plan)

These items implement the agreed direction for chain scope, admin governance, and the developer surface. Update this section if the product strategy changes.

### Chain scope (`clarify-chain-scope`)

- **Primary stack:** Internet Computer only for core lottery logic and state: Motoko canister(s), Internet Identity, and `@dfinity/*` on the client, as in this repository today.
- **Out of scope for now:** EVM/Solidity, bridges, and alternate L1/L2 execution for draws or ticket ownership. If added later, they must be an explicit **separate module** (own contracts, indexing, and trust assumptions) and must not block shipping the ICP-native path.

### Admin governance (`define-admin-governance`)

- **Phase 1 (default for OSS admin):** Authorize `public shared` admin endpoints by checking the caller `Principal` against a **`stable` allowlist** of admin principals configured at init / upgrade (rotations via controlled update methods).
- **Phase 2 (optional):** Multisig-style approval (e.g. N-of-M principals) or DAO-based parameter changes. Not required for the first admin UI or first production cut.
- **Note:** DFX **canister controllers** govern WASM upgrades and infrastructure; they are **not** a substitute for on-canister admin ACLs for business operations (creating draws, pausing sales, etc.).

### Developer / integrator surface (`define-dev-audience`)

- **Always ship:** The **Candid interface** (`src/backend/dist/backend.did` after build), **regenerated TypeScript bindings** (`pnpm bindgen`), and **documentation** with minimal examples (creating an actor, calling queries vs updates, testnet canister IDs).
- **Publish `@lsbfl/sdk` to npm** only when third parties need a versioned installable client; until then, use **pnpm workspace packages** (e.g. `packages/canister-client`) shared by the consumer app and a future admin app—no public package required.
- **Portal “developer”** can start as a section of the site or static docs linking the DID and env vars; a separate marketing/docs host is optional.

### Package layout direction

- **Default:** Single **pnpm monorepo** with optional `apps/admin` and `packages/*` when an admin UI or shared client appears; the current `src/frontend` layout can be migrated incrementally.

### Consumer wallet, deposits, and prize payout UI (`wallet-payout-routes`)

- **Prize flow (`/prize/$ticketId`):** The payout step lists three methods. Only **«En tienda física»** used to be the one with a real in-app route (`/map` → `MapPage`). **«Cartera digital»** and **«Transferencia bancaria»** still use the in-wizard verify step (mock delay / form) until treasury and KYC exist on the backend.
- **Funding UI:** **`/wallet/deposit`** is the canonical screen for adding balance (amount presets + CTA). Production should mount a PSP here (e.g. Stripe Checkout Session or Payment Element); the mock app only shows UX and a placeholder handoff.
- **Wallet:** The **Recargar** control must navigate to **`/wallet/deposit`** so deposits are not a dead button.
- **Cross-links from payout:** Wallet option links to **`/wallet/deposit`** (add funds); bank transfer links to **`/help`** for instructions until a dedicated bank onboarding route exists.

## Verified Commands

**Frontend** (run from `src/frontend/`):

- **install**: `pnpm install --prefer-offline`
- **typecheck**: `pnpm typecheck`
- **lint fix**: `pnpm fix`
- **build**: `pnpm build`

**Backend** (run from `src/backend/`):

- **install**: `mops install`
- **typecheck**: `mops check --fix`
- **build**: `mops build`

**Backend and frontend integration** (run from root):

- **generate bindings**: `pnpm bindgen` This step is necessary to ensure the frontend can call the backend methods. Requires `caffeine-bindgen` on your PATH (from the Caffeine toolchain). After editing Motoko, compile with `mops` so `backend.did` stays authoritative; if bindgen is unavailable, keep `declarations/backend.did.js`, `backend.did.d.ts`, and `backend.ts` admin sections in sync with the `.did` file.

**Admin wizard / testnet**

- UI: `/admin/lotteries/new` — five-step wizard; draft persisted in `localStorage` (`lsbfl-lottery-wizard-draft-v1`). Use **Guardar snapshot** then **Comparar con snapshot** for a line-oriented diff before sharing JSON.
- Canister flow: first caller runs `adminBootstrap` when the admin list is empty; then `adminUpsertDraft` stores a typed `LotteryProductConfig`; `adminPublishLottery(slug)` validates **schema version 1** and **treasury percents sum 100**, then appends a `Lottery`. Point the app at a testnet canister via `env.json` / `CANISTER_ID_BACKEND` as usual.

## Learnings

[No learnings yet]
