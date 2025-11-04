'use client'
import Link from 'next/link'
export default function Nav(){
  return (
    <div className="nav">
      <div className="inner">
        <Link href="/" style={{fontWeight:800,textDecoration:'none',color:'#fff'}}>FateHub</Link>
        <div style={{flex:1}}/>
        <Link href="/tarot">Tarot</Link>
        <Link href="/fate">Will I Make It?</Link>
      </div>
    </div>
  )
}