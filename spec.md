# YojnaAI - Sapforce-Style Landing Page Redesign

## Current State
YojnaAI has a dark space/galaxy theme landing page with hero section, search bar, scheme cards, India map section, benefits calculator, and features. It also has a white/patriotic light mode. Navbar, admin, search, scheme detail pages are all functional.

## Requested Changes (Diff)

### Add
- Premium Sapforce-style hero section: large bold gradient headline (saffron-to-blue or purple-to-blue), glowing CTA button, floating dashboard UI mockup preview card in hero
- Animated glowing orbs/blobs in hero background
- Feature highlights section with icon cards in a 3-column grid with glassmorphism cards
- Stats bar (number of schemes, states, users helped, etc.)
- Testimonials/trust section
- Gradient section dividers
- "How it works" 3-step section with numbered steps and icons
- Premium footer with logo, links, and tagline

### Modify
- LandingPage.tsx: full visual redesign of hero, features, and layout sections to match Sapforce premium dark SaaS aesthetic
- Navbar: glassmorphism dark navbar with gradient logo text, premium CTA button
- Dark mode background: very deep dark (#050816 or similar) with subtle grid/dot pattern
- Hero heading: bold large gradient text in Hindi + English, subheading text
- Search bar: premium glowing search bar with animated border

### Remove
- Generic or plain-looking sections
- Old flat card designs

## Implementation Plan
1. Redesign LandingPage hero with gradient text, floating mockup card, glowing orbs
2. Redesign Navbar with glassmorphism + gradient brand name
3. Add stats bar section
4. Add 3-column feature cards with glassmorphism
5. Add "How it works" 3-step section
6. Add testimonials section
7. Premium footer redesign
8. Maintain all existing functional features (search, map, admin)
