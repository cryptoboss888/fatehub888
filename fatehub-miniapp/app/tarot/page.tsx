'use client'
import { MiniKitProvider, useMiniKit } from '@coinbase/onchainkit/minikit'
import { useMemo, useState } from 'react'
import { drawCards, summarize, yesNoFromCards, Drawn } from '../../lib/tarot'
import TarotCard from '../../components/TarotCard'
import ShareButton from '../../components/ShareButton'

export default function TarotPage(){
  return (<MiniKitProvider><Inner/></MiniKitProvider>)
}
function Inner(){
  const mk = useMiniKit()
  const [address, setAddress] = useState<string|null>(null)
  const [q, setQ] = useState('')
  const [count, setCount] = useState(3)
  const [seed, setSeed] = useState('')
  const [cards, setCards] = useState<Drawn[]|null>(null)

  const connect = async () => {
    try{ const res = await mk?.actions.requestWallet(); if (res?.address) setAddress(res.address) } catch(e){ alert('Connect failed') }
  }
  const draw = () => setCards(drawCards(count, seed || undefined))

  const headline = useMemo(()=>{
    if (!cards || cards.length !== 1) return ''
    return yesNoFromCards(cards)
  }, [cards])

  const shareText = useMemo(()=>{
    if (!cards) return 'My tarot reading'
    const base = `Tarot reading${q?` on “${q}”`:''}`
    return `${base}
${headline ? `Answer: ${headline}
` : ''}${summarize(cards)}`
  }, [cards, q, headline])

  return (
    <div className="wrap">
      <div className="card">
        <h2>🔮 Tarot</h2>
        <div className="row" style={{marginTop:8}}>
          <button onClick={connect}>{address ? 'Connected' : '🔗 Connect Wallet'}</button>
        </div>
        <div style={{marginTop:12}}>
          <label>Question (optional)</label>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Type your question..." style={{width:'100%', marginTop:6}}/>
        </div>
        <div className="row" style={{marginTop:12}}>
          <label style={{alignSelf:'center'}}>Cards:</label>
          <select value={count} onChange={e=>setCount(parseInt(e.target.value))}>
            <option value={1}>1 (Yes/No)</option>
            <option value={3}>3 (Past–Present–Future)</option>
            <option value={6}>6 (Celtic-lite)</option>
          </select>
          <input value={seed} onChange={e=>setSeed(e.target.value)} placeholder="Seed (optional)" />
          <button onClick={draw}>✨ Draw</button>
        </div>
        {cards && (
          <div style={{marginTop:12}}>
            <div className="grid">
              {cards.map((d,i)=>(<TarotCard key={i} d={d}/>))}
            </div>
            <div className="row" style={{marginTop:12}}>
              <ShareButton text={shareText} url={'https://YOUR_DOMAIN/tarot'} />
              <TipButton />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
function TipButton(){
  const mk = useMiniKit()
  const tip = async () => {
    try{
      await mk?.actions.pay({
        chainId: 'eip155:8453',
        amount: '1',
        currency: 'USDC',
        to: '0x0000000000000000000000000000000000000000',
        description: 'Tip the reader'
      })
    }catch(e){ alert('Tip failed: ' + (e as Error).message) }
  }
  return <button onClick={tip}>💖 Tip (USDC)</button>
}