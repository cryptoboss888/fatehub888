'use client'
import { Drawn } from '../lib/tarot'
export default function TarotCard({ d }:{ d:Drawn }){
  return (
    <div className="tarot">
      <div style={{textAlign:'center'}}>
        <div style={{fontWeight:700}}>{d.card.name}</div>
        <div className="muted">{d.reversed ? 'Reversed' : 'Upright'}</div>
        <div style={{fontSize:12, marginTop:8}}>
          {d.reversed ? d.card.reversed.join(' • ') : d.card.keywords.join(' • ')}
        </div>
      </div>
    </div>
  )
}