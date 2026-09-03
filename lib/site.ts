const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

export const siteConfig = {
  name: 'UC AI Society',
  shortName: 'UC·AI',
  description:
    'A student-led club at the University of Canterbury focused on helping students understand and use AI in practical, ethical, and real-world ways.',
  url: (configuredSiteUrl || 'https://uc-ai-soc-website.vercel.app').replace(/\/$/, ''),
  email: 'ucaisoc@outlook.com',
  github: 'https://github.com/zaviert115/UCAI-',
  instagram: 'https://instagram.com/ucai.soc',
  facebook: 'https://www.facebook.com/profile.php?id=61582126750231',
} as const
