# YojnaAI

## Current State
New build -- no existing frontend/backend code. Rebuilding from scratch with all previous functionality.

## Requested Changes (Diff)

### Add
- Premium dark SaaS landing page (Stripe/Linear/Vercel style): #0B0F1A background, #6C5CE7 primary accent, #00D4FF highlight
- Framer Motion animations: hero text reveal, card entrance, smooth transitions
- Three.js particle field in hero background
- Smooth scrolling with CSS scroll-behavior
- VanillaTilt-style 3D hover on feature cards
- Premium Google Fonts: Space Grotesk (heading), Inter (body)
- Landing page sections: Hero, Features (3 cards), How It Works, Stats
- /search page with filters: State, Age, Occupation, Income, Category
- Animated scheme result cards with hover glow effects
- /categories page with category grid
- /scheme/:id detail page: description, eligibility, documents, benefits, apply link
- /calculator page: benefits estimator with user inputs
- /admin page (password: admin123): add/edit/delete schemes, import JSON/DOCX
- OpenRouter AI fallback: models qwen/qwen3-next-80b-a3b-instruct, liquid/lfm-2.5-1.2b-instruct, liquid/lfm-2.5-1.2b-thinking
- API key: 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
- Smart search: word-based matching, yojna/yojana spelling variations, 50%+ relevance threshold
- AI answers formatted with bold headings, sections, bullet lists (no raw markdown symbols)
- Google Search Console verification meta tag
- SEO meta tags, Open Graph, JSON-LD structured data
- Comprehensive scheme database (20+ schemes across all categories)

### Modify
- N/A (fresh build)

### Remove
- N/A

## Implementation Plan
1. Motoko backend: scheme storage (CRUD), search by keyword/state/category, get all schemes
2. Frontend routing: /, /search, /categories, /scheme/:id, /calculator, /admin
3. Landing page: animated hero with Three.js particles, 3 feature cards with tilt hover, stats section
4. Search page: filter panel + animated result cards + AI fallback when no local results
5. Scheme detail page: full scheme info layout
6. Calculator page: form inputs + eligibility calculation
7. Admin page: password-gated CRUD interface + JSON import
8. AI service: OpenRouter multi-model fallback with formatted response parsing
9. Seed data: 25+ government schemes across Students/Farmers/Women/Labour/Business/Senior Citizens
