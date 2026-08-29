import { education } from '@/content/profile'
import { site, socials } from '@/content/site'

/**
 * One JSON-LD graph for the whole site: the person, and the site that is his
 * portfolio. Everything here is already published on the pages themselves; this
 * only restates it in a form a search engine can read without guessing. Facts
 * come from `content/`, so there is nothing to keep in sync by hand.
 */
export default function StructuredData() {
  const personId = `${site.url}/#person`

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.person,
        alternateName: site.name,
        jobTitle: site.role,
        description: site.description,
        email: `mailto:${site.email}`,
        telephone: site.phone,
        url: site.url,
        image: `${site.url}/images/portrait.jpg`,
        address: { '@type': 'PostalAddress', addressLocality: 'Milan', addressCountry: 'IT' },
        alumniOf: education.map((e) => ({
          '@type': 'CollegeOrUniversity',
          name: e.school,
        })),
        knowsAbout: [
          'Landscape architecture',
          'Urban design',
          'Architecture',
          'Graphic design',
          'Brand identity',
        ],
        sameAs: socials.map((s) => s.href),
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // Content is ours and comes from typed modules, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
