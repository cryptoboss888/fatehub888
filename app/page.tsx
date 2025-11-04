'use client'
import Link from 'next/link'
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
export default function Page(){
  return (<MiniKitProvider>
    <div className="wrap">
      <div className="card">
        <h1>⚡ FateHub</h1>
        <p className="muted">Your onchain destiny oracle: Tarot + Crypto fate analyzer.</p>
        <div className="row" style={{marginTop:12}}>
          <Link href="/tarot"><button>🔮 Tarot</button></Link>
          <Link href="/fate"><button>💸 Will I Make It?</button></Link>
        </div>
      </div>
    </div>
  </MiniKitProvider>)
}