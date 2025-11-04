'use client'
import { useMiniKit } from '@coinbase/onchainkit/minikit'
export default function ShareButton({ text, url }:{text:string, url:string}){
  const mk = useMiniKit()
  const go = async () => {
    try{ await mk?.actions.composeCast({ text, embeds:[{ url }] }) }
    catch(e){ alert('Share failed: ' + (e as Error).message) }
  }
  return <button onClick={go}>📣 Share</button>
}