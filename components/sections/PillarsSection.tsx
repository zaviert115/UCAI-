import PinnedScene from '@/components/chrome/PinnedScene'

const cards = [
  {
    code: '01',
    name: 'Workshops',
    sub: 'Hands-on sessions on AI tools, prompt engineering, and building with APIs. Bring a laptop, leave with something deployed.',
  },
  {
    code: '02',
    name: 'Panel discussions',
    sub: 'Industry guests share how AI is changing their work and what skills matter most for new grads.',
  },
  {
    code: '03',
    name: 'Networking',
    sub: 'Connect with students and professionals passionate about AI. Casual socials every fortnight.',
  },
  {
    code: '04',
    name: 'Tutorials',
    sub: 'Structured guides written by members — work through them at your own pace, on your own time.',
  },
]

export default function PillarsSection() {
  return (
    <PinnedScene
      index="01"
      eyebrow="What we do"
      title="Four ways to plug in."
      intro="Membership is free and open to all UC students. Whether you've never opened ChatGPT or you're fine-tuning models for fun, there's a way in."
      cards={cards}
      dataShape="nz"
    />
  )
}
