export type TarotCard = {
  id:number; name:string; arcana:'Major'|'Minor'; keywords:string[]; reversed:string[]
};
export const MAJOR_ARCANA: TarotCard[] = [
  {id:0,name:'The Fool',arcana:'Major',keywords:['beginnings','innocence','free spirit'],reversed:['recklessness','hesitation','naivety']},
  {id:1,name:'The Magician',arcana:'Major',keywords:['willpower','manifestation','skill'],reversed:['manipulation','untapped potential','trickery']},
  {id:2,name:'The High Priestess',arcana:'Major',keywords:['intuition','mystery','spirituality'],reversed:['secrets','disconnected','confusion']},
  {id:3,name:'The Empress',arcana:'Major',keywords:['nurture','abundance','fertility'],reversed:['dependence','smothering','emptiness']},
  {id:4,name:'The Emperor',arcana:'Major',keywords:['authority','structure','stability'],reversed:['rigidity','domination','inflexibility']},
  {id:5,name:'The Hierophant',arcana:'Major',keywords:['tradition','learning','guidance'],reversed:['rebellion','unconventional','challenge']},
  {id:6,name:'The Lovers',arcana:'Major',keywords:['union','choices','alignment'],reversed:['disharmony','indecision','imbalance']},
  {id:7,name:'The Chariot',arcana:'Major',keywords:['drive','victory','determination'],reversed:['lack of control','aggression','stalling']},
  {id:8,name:'Strength',arcana:'Major',keywords:['courage','patience','compassion'],reversed:['self-doubt','weakness','insecurity']},
  {id:9,name:'The Hermit',arcana:'Major',keywords:['introspection','wisdom','solitude'],reversed:['isolation','withdrawal','loneliness']},
  {id:10,name:'Wheel of Fortune',arcana:'Major',keywords:['change','karma','turning point'],reversed:['resistance','bad luck','stagnation']},
  {id:11,name:'Justice',arcana:'Major',keywords:['truth','law','fairness'],reversed:['unfairness','dishonesty','imbalance']},
  {id:12,name:'The Hanged Man',arcana:'Major',keywords:['surrender','new perspective','pause'],reversed:['stalling','indecision','avoidance']},
  {id:13,name:'Death',arcana:'Major',keywords:['ending','transformation','release'],reversed:['resistance','fear of change','stagnation']},
  {id:14,name:'Temperance',arcana:'Major',keywords:['balance','moderation','healing'],reversed:['excess','imbalance','friction']},
  {id:15,name:'The Devil',arcana:'Major',keywords:['attachment','materialism','shadow'],reversed:['release','awareness','detachment']},
  {id:16,name:'The Tower',arcana:'Major',keywords:['upheaval','revelation','reset'],reversed:['averted disaster','delay','fear of change']},
  {id:17,name:'The Star',arcana:'Major',keywords:['hope','renewal','inspiration'],reversed:['discouragement','insecurity','doubt']},
  {id:18,name:'The Moon',arcana:'Major',keywords:['illusion','intuition','dreams'],reversed:['clarity','release of fear','truth']},
  {id:19,name:'The Sun',arcana:'Major',keywords:['vitality','success','joy'],reversed:['pessimism','clouded joy','block']},
  {id:20,name:'Judgement',arcana:'Major',keywords:['awakening','reckoning','purpose'],reversed:['self-doubt','stagnation','avoidance']},
  {id:21,name:'The World',arcana:'Major',keywords:['completion','wholeness','travel'],reversed:['shortcuts','incomplete','delays']}
];
export type Drawn = { card:TarotCard; reversed:boolean };
export function drawCards(n:number, seed?:string): Drawn[]{
  const s = (seed ?? (Math.random().toString(36).slice(2))) + '|tarot';
  let h = 0; for (let i=0;i<s.length;i++) h = Math.imul(31,h) + s.charCodeAt(i) | 0;
  const rand = () => (h = Math.imul(48271,h) + 0x7fffffff & 0x7fffffff) / 0x7fffffff;
  const deck = [...MAJOR_ARCANA]; const out:Drawn[] = [];
  for (let i=0;i<n && deck.length;i++){
    const idx = Math.floor(rand() * deck.length);
    const [card] = deck.splice(idx,1);
    const rev = rand() < 0.45;
    out.push({card, reversed: rev});
  }
  return out;
}
export function yesNoFromCards(cards:Drawn[]): 'Yes'|'No'|'Maybe'{
  const good = new Set(['The Sun','The Star','The World','The Magician','The Chariot','Judgement','Strength']);
  let score=0; for (const d of cards){ const isGood = good.has(d.card.name); score += (isGood?1:0) + (!d.reversed?0.5:-0.5); }
  if (score >= 1) return 'Yes'; if (score <= -1) return 'No'; return 'Maybe';
}
export function summarize(cards:Drawn[]): string{
  return cards.map(d=>`${d.card.name}${d.reversed?' (reversed)':''}`).join(', ');
}