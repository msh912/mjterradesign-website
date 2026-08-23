export type Discipline =
  | 'Product'
  | 'Architecture'
  | 'Interface'
  | 'Brand'
  | 'Industrial'
  | 'Research'

export type Project = {
  slug: string
  title: string
  /** One line that earns the click. */
  summary: string
  year: number
  role: string
  client?: string
  disciplines: Discipline[]
  /** Long-form body, rendered as paragraphs. */
  body: string[]
  /** Transparent PNG plate or dark-bg still. Lives in /public/images. */
  cover?: string
  gallery?: { src: string; alt: string; caption?: string }[]
  /** Dark-bg, loopable. Lives in /public/videos. */
  video?: string
  /** Metric callouts — used sparingly, never as a hero template. */
  facts?: { label: string; value: string }[]
  featured?: boolean
  externalUrl?: string
}

/**
 * PLACEHOLDER SET — three entries proving the shape of the data.
 * Replace wholesale once the real work is catalogued; every page reads
 * from this file, so nothing else needs to change.
 */
export const projects: Project[] = [
  {
    slug: 'placeholder-one',
    title: 'Project One',
    summary: 'A short line describing what this work actually did.',
    year: 2025,
    role: 'Design & Build',
    disciplines: ['Product', 'Interface'],
    body: [
      'Replace this with the real narrative — the problem, the constraint that made it hard, and the decision that resolved it.',
      'Keep it specific. Portfolios lose people on generalities.',
    ],
    facts: [
      { label: 'Duration', value: '6 mo' },
      { label: 'Team', value: '4' },
    ],
    featured: true,
  },
  {
    slug: 'placeholder-two',
    title: 'Project Two',
    summary: 'The second placeholder, here to prove list layout and rhythm.',
    year: 2024,
    role: 'Lead Designer',
    disciplines: ['Architecture'],
    body: ['Replace this text.'],
    featured: true,
  },
  {
    slug: 'placeholder-three',
    title: 'Project Three',
    summary: 'The third placeholder, so the index has something to breathe against.',
    year: 2023,
    role: 'Concept & Direction',
    disciplines: ['Brand', 'Industrial'],
    body: ['Replace this text.'],
  },
]

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug)

export const featuredProjects = () => projects.filter((p) => p.featured)
