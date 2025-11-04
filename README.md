# ⚡ FateHub — Tarot + Crypto Fate MiniApp (Base/Farcaster)

Ship a viral miniapp combining:
- 🔮 Tarot readings (1/3/6 cards, shareable & tip‑gated)
- 💸 “Will I Make It?” analyzer (1‑card verdict + live price)

## Quick Start
```bash
pnpm i
pnpm dev
# open http://localhost:3000
```

## Deploy
- Push to GitHub → Vercel
- Host manifest at: `https://YOUR_DOMAIN/.well-known/farcaster.json`
- Replace `YOUR_DOMAIN` in code & manifest.
- Sign `accountAssociation` (JFS) for Farcaster domain proof.

## Notes
- Price API proxies CoinGecko (no key). Tweak as needed.
- `Tip (USDC)` uses MiniKit `actions.pay` — set your address.
- Add full 78‑card deck & artwork for production.
