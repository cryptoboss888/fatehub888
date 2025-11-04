import { NextRequest } from 'next/server'

const map: Record<string,string> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  sol: 'solana',
  base: 'base-protocol'
}

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url)
  const sym = (searchParams.get('symbol') || 'eth').toLowerCase()
  const id = map[sym]
  if (!id) return Response.json({ symbol: sym, price: null })
  try{
    const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`, { next: { revalidate: 30 } })
    const j = await r.json()
    return Response.json({ symbol: sym, price: j?.[id]?.usd ?? null })
  }catch{
    return Response.json({ symbol: sym, price: null })
  }
}