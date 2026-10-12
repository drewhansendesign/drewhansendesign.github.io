import samsClub from '../assets/work/sams-club-inventory.png';
import samsScan from '../assets/work/sams/scan.webp';
import samsDashboard from '../assets/work/sams/dashboard-hd.png';
import samsRecount from '../assets/work/sams/recount-status.png';
import tinderPost from '../assets/work/tinder/post-dark.png';
import tinderFeed from '../assets/work/tinder/feed-dark.png';
import tinderMerch from '../assets/work/tinder/merch-dark.png';
import tnfPlp from '../assets/work/tnf/plp.png';
import tnfPdp from '../assets/work/tnf/pdp.png';
import jcSplash from '../assets/work/jumpcloud/splash.png';
import jcDashboard from '../assets/work/jumpcloud/dashboard.png';
import tinder from '../assets/work/tinder-lets-meet.png';
import tnf from '../assets/work/tnf-homepage.png';
import jumpcloud from '../assets/work/jumpcloud-admin-dark.png';

export const contact = {
  email: 'hello@drewhansen.design',
  linkedin: 'https://www.linkedin.com/in/drewhansendesign/',
  // DrewHansen_Resume2026.pdf, supplied by Drew.
  resume: '/Drew-Hansen-Resume.pdf',
};

export type Work = {
  slug: string;
  company: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  tags: string[];
  image: ImageMetadata;
  imageAlt: string;
  /** The current (v1) case study, linked from the v2 stub until it is rewritten. */
  legacyUrl: string;
  short?: boolean;
  /** Screens shown in place of the cover image: phones [left, centre, right]
   *  or desktop pages [back, middle, front]. */
  screens?: { src: ImageMetadata; alt: string }[];
  screensKind?: 'phone' | 'desktop';
  /** Real outcomes from Drew's resume; never invented. */
  impact?: { value: string; label: string }[];
};

export const work: Work[] = [
  {
    slug: 'sams-club',
    company: "Sam's Club",
    title: 'Annual Inventory',
    summary:
      'A 40-year-old pen-and-paper count, replaced with a custom mobile app that syncs with existing inventory software.',
    role: 'Senior UX Designer',
    year: '2024',
    screens: [
      { src: samsScan, alt: 'Scan screen: the camera framing a pallet barcode on a ground beef case, above the pallet’s item list.' },
      { src: samsDashboard, alt: 'Annual Inventory dashboard: 10 days left, with precount, spot check and finalize progress.' },
      { src: samsRecount, alt: 'Recount status: in-progress categories with progress gauges, and not-started categories sorted by highest variance.' },
    ],
    impact: [
      { value: '~7M', label: 'pages of paper replaced' },
      { value: '$335k', label: 'projected yearly savings' },
      { value: '4 weeks', label: 'faster precounts' },
      { value: '304k', label: 'manual tasks removed' },
    ],
    tags: ['Enterprise', 'Mobile', 'Field research'],
    image: samsClub,
    imageAlt:
      "Dozens of Sam's Club inventory app screens: precount progress, location grids, pallet barcode scanning and variance review.",
    legacyUrl: 'https://drewhansen.design/projects/sams-club',
  },
  {
    slug: 'tinder',
    company: 'Tinder',
    title: "Let's Meet",
    summary:
      'Date ideas you can actually say yes to: a feed of nearby plans that turns matches into meetups.',
    role: 'Lead Designer',
    year: '2023',
    tags: ['Consumer', 'Trust & Safety', 'Localization'],
    image: tinder,
    screens: [
      { src: tinderPost, alt: 'Let’s Meet post screen in dark mode: a date idea for Thai food tomorrow, with a Date Safely tip and when-to-meet chips.' },
      { src: tinderFeed, alt: 'Let’s Meet Discover feed in dark mode: a date-idea card reading “Let’s go see a concert next week!” with an Interested button.' },
      { src: tinderMerch, alt: 'Let’s Meet promo card in the Tinder swipe deck, in dark mode: “Find your next date. Post a date idea and see who’s interested with Let’s Meet,” with a Try Now button.' },
    ],
    imageAlt:
      "Tinder Let's Meet: a date-idea card reading “Wanna grab a bite!?” beside the Describe your date and Discover screens.",
    legacyUrl: 'https://drewhansen.design/projects/tinder',
  },
  {
    slug: 'the-north-face',
    company: 'The North Face',
    title: 'thenorthface.com refresh',
    summary:
      'A premium brand refresh backed by a 1,200-symbol atomic design system, validated with 1,000+ users and blind perception tests.',
    role: 'Lead Designer',
    year: '2021',
    tags: ['E-commerce', 'Design system', 'Brand'],
    image: tnf,
    screensKind: 'desktop',
    screens: [
      { src: tnfPdp, alt: 'Redesigned product page: Women’s Cragmont Fleece Jacket with color and size pickers and an Add to Bag button.' },
      { src: tnfPlp, alt: 'Redesigned product listing: Women’s Insulated & Down Jackets with filters and a grid of parkas.' },
      { src: tnf, alt: 'Redesigned homepage: a climber on a night-lit rock face under the headline “High altitude. Higher mileage.”' },
    ],
    imageAlt:
      'The refreshed thenorthface.com homepage: a climber on a night-lit rock face under the headline “High altitude. Higher mileage.”',
    legacyUrl: 'https://drewhansen.design/projects/the-north-face',
  },
  {
    slug: 'jumpcloud',
    company: 'JumpCloud',
    title: 'Admin Mobile',
    summary:
      'The first native app for a desktop-only IT platform, so admins can handle urgent tasks, like unlocking a locked-out user, from anywhere.',
    role: 'Lead Designer',
    year: '2022',
    tags: ['B2B SaaS', 'Native mobile', '0 → 1'],
    image: jumpcloud,
    screens: [
      { src: jcSplash, alt: 'JumpCloud Admin launch screen with the Admin by JumpCloud wordmark and cloud mark.' },
      { src: jcDashboard, alt: 'JumpCloud Admin dashboard: 5,909 total users, 2 accounts locked out and 20 expired passwords.' },
    ],
    imageAlt:
      'JumpCloud Admin app in light and dark mode: splash screen and a home dashboard showing locked-out accounts and expired passwords.',
    legacyUrl: 'https://drewhansen.design/projects/jumpcloud',
    short: true,
  },
];

export const experience: {
  company: string;
  role: string;
  dates: string;
  current?: boolean;
  body?: string;
}[] = [
  {
    company: 'Ibotta',
    role: 'Senior Product Designer',
    dates: 'Jun 2026 – Present',
    current: true,
    body: 'Designing revenue tools for the Ibotta Performance Network (IPN) that help win new clients and streamline the workflows existing ones rely on.',
  },
  {
    company: "Sam's Club",
    role: 'Senior UX Designer (contract)',
    dates: 'Jan 2024 – Mar 2026',
    body: "Led the design strategy to replace a 40-year-old point-of-sale platform with a modern mobile experience built on the Blue Steel design system. Modernized Annual Inventory and created new workflows for the Tire & Battery Center.",
  },
  {
    company: 'Tinder',
    role: 'Senior Product Designer (contract)',
    dates: 'Dec 2022 – Sep 2023',
    body: "Native mobile experiences for Discovery and Explore, A/B-tested creative for the Explore homepage, prototyped interactions for the Sparks brand refresh, and conceptualized Let’s Meet.",
  },
  {
    company: 'JumpCloud',
    role: 'Senior UX Designer',
    dates: 'Aug 2021 – Nov 2022',
    body: 'Co-built and scaled the Stratus Design System, led platform-wide consistency and accessibility initiatives, and designed the first native mobile app for the admin portal.',
  },
  {
    company: 'VF Corporation',
    role: 'Senior UX Designer',
    dates: 'Jun 2020 – Jul 2021',
    body: 'Led the end-to-end redesign of thenorthface.com and maintained a white-labeled design system with swappable tokens used by The North Face, Vans and Timberland.',
  },
  {
    company: 'Athlinks (Life Time Fitness)',
    role: 'Senior UX Designer',
    dates: 'Jan 2017 – Mar 2020',
    body: 'Owned end-to-end design for the Athlinks mobile app, website and middleware apps, and implemented front-end CSS styling in the native app.',
  },
  {
    company: 'Effective UI (Ogilvy)',
    role: 'UX Designer → Senior UX Designer',
    dates: 'Dec 2014 – Jan 2017',
    body: 'Research, wireframes, UI and motion design for enterprise clients including Comcast, Wells Fargo and American Express.',
  },
];
