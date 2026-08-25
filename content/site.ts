/**
 * Site-level facts. Contact details are transcribed from MJ's own printed
 * portfolios, where both books agree. See CONTENT-INVENTORY.md.
 */
export const site = {
  name: 'MJ Terra Design',
  shortName: 'MJ Terra',
  person: 'Mohamadjavad Shoori',
  role: 'Architect and graphic designer',
  tagline: 'Landscape architecture and the drawings that argue for it',
  description:
    'The portfolio of MJ Terra Design: landscape architecture, architecture and graphic design by Mohamadjavad Shoori, based in Milan.',
  // PROVISIONAL: the production domain is not decided yet.
  url: 'https://mjterradesign.com',
  email: 'mjshoori.arch@gmail.com',
  phone: '+39 351 886 0362',
  phoneHref: '+393518860362',
  location: 'Milan, Italy',
  availability: 'Available for freelance and full-time work',
} as const

export const nav = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export const socials = [
  { href: 'https://www.behance.net/mjshoori', label: 'Behance' },
  { href: 'https://www.instagram.com/mj.shoori', label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/mjshoori', label: 'LinkedIn' },
] as const
