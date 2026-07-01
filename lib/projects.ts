export interface Project {
  tag: string
  title: string
  desc: string
  stack: string[]
}

export const projects: Project[] = [
  {
    tag: 'NLP · 2025 Hackathon Winner',
    title: 'Kōrero',
    desc: 'Real-time AI transcription and translation tool for te reo Māori, built in 48 hours at the UC Hackathon.',
    stack: ['Whisper', 'Next.js', 'Python', 'FastAPI'],
  },
  {
    tag: 'EdTech · Workshop Project',
    title: 'StudyBuddy',
    desc: 'A RAG-powered study assistant that answers questions about your own lecture slides.',
    stack: ['LangChain', 'Pinecone', 'React'],
  },
  {
    tag: 'Computer Vision · Side Project',
    title: 'Bin Sense',
    desc: 'Uses a phone camera to classify waste into the right recycling bin. 94% accuracy on the UC campus bins.',
    stack: ['YOLOv8', 'Flutter', 'TensorFlow'],
  },
]
