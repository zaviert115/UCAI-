export const CONTACT_REASONS = [
  'General enquiry',
  'Joining the club',
  'Sponsorship / partnership',
  'Committee interest',
  'Event / tutorial idea',
  'Other',
] as const

export type ContactReason = (typeof CONTACT_REASONS)[number]
