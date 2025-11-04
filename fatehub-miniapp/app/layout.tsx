import './globals.css'
import type { Metadata } from 'next'
import Nav from '../components/Nav'
export const metadata: Metadata = {
  title: 'FateHub',
  description: 'Tarot + Crypto Fate MiniApp on Base',
  other: {
    'fc:miniapp': JSON.stringify({
      name: 'FateHub',
      icon: '/icon.png',
      url: 'https://YOUR_DOMAIN/'
    })
  }
}
export default function RootLayout({ children }: { children: React.ReactNode }){
  return (<html lang="en"><body><Nav/>{children}</body></html>)
}