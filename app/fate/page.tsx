'use client'
import { MiniKitProvider, useMiniKit } from '@coinbase/onchainkit/minikit'
import { useEffect, useMemo, useState } from 'react'
import { drawCards, yesNoFromCards, summarize, Drawn } from '../../lib/tarot'
import ShareButton from '../../components/ShareButton'

type PriceInfo = { symbol:string; price:number|null }

export default function FatePage(){
  return (<MiniKitProvider><Inner/></MiniKitProvider>)
}
function Inner(){
  const mk = useMiniKit()
  const [address, setAddress] = useState<string|null>(null)
  const [token, setToken] = useState('eth')
  const [cards, setCards] = useState<Drawn[]|null>(null)
  const [price, setPrice] = useState<PriceInfo|null>(null)

  const connect = async () => {
    try{ const res = await mk?.actions.requestWallet(); if (res?.address) setAddress(res.address) } catch(e){ alert('Connect failed') }
  }

  const fetchPrice = async (sym:string) => {
    try{
      const r = await fetch(`/api/price?symbol=${encodeURIComponent(sym)}`)
      const j = await r.json()
      setPrice(j)
    }catch{ setPrice({symbol:sym, price:null})}
  }

  useEffect(()=>{ fetchPrice(token) }, [token])

  const analyze = () => { setCards(drawCards(1)) } // 1-card fate
  const verdict = useMemo(()=> cards ? yesNoFromCards(cards) : '', [cards])
  const shareText = useMemo(()=>{
    const p = price?.price != null ? `($${price.price})` : ''
    const list = cards ? summarize(cards) : ''
    return `Will I make it with $${token.toUpperCase()}? ${verdict || '—'} ${p}
${list}`.trim()
  }, [token, price, verdict, cards])

  return (
    <div className="wrap">
      <div className="card">
        <h2>💸 Will I Make It?</h2>
        <div className="row" style={{marginTop:8}}>
          <button onClick={connect}>{address ? 'Connected' : '🔗 Connect Wallet'}</button>
        </div>
        <div className="row" style={{marginTop:12}}>
          <label style={{alignSelf:'center'}}>Token:</label>
          <select value={token} onChange={e=>setToken(e.target.value)}>
            <option value="eth">ETH</option>
            <option value="sol">SOL</option>
            <option value="btc">BTC</option>
            <option value="base">BASE</option>
          </select>
          <button onClick={analyze}>🔮 Analyze Fate</button>
        </div>
        {price && <div className="badge" style={{marginTop:12}}>Spot: {price.price != null ? `$${price.price}` : '—'} ({price.symbol.upper()})</div>}
        {cards && (
          <div style={{marginTop:12}}>
            <div className="badge">Answer: <b>{verdict}</b></div>
            <div style={{marginTop:12}}>{summarize(cards)}</div>
            <div className="row" style={{marginTop:12}}>
              <ShareButton text={shareText} url={'https://YOUR_DOMAIN/fate'} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}