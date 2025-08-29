# Instructions for Claude Code

This document contains important guidelines and constraints for working on the StaticPages Astro website project.

## Project Overview
- **Framework**: Astro static site generator
- **Styling**: Vanilla CSS with CSS variables
- **JavaScript**: Vanilla JS (no frameworks)
- **Purpose**: High-performance static website for web development services

## Core Principles
1. **Performance First** - Maintain 100/100 PageSpeed scores
2. **Mobile-First** - Responsive design starting from 320px
3. **Theme Support** - Light and dark mode compatibility
4. **Accessibility** - WCAG compliant markup and interactions
5. **SEO Optimized** - Proper meta tags, structured data, semantic HTML

## Technical Constraints

### CSS Guidelines
- **Always use existing CSS variables** from `/public/styles/main.css`
- **Never override root variables** in component styles
- **Use the established design system**:
  - Colors: `var(--color-primary)`, `var(--color-secondary)`, `var(--color-accent)`
  - Spacing: `var(--space-2)` through `var(--space-20)`
  - Typography: `var(--text-sm)` through `var(--text-6xl)`
  - Shadows: `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-lg)`

### Component Patterns
- **Follow existing Layout.astro structure** for new pages
- **Use common button classes**: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-large`
- **Maintain navigation consistency** across all pages
- **Include dark mode styles** for all new components: `[data-theme="dark"]`

### JavaScript Requirements
- **Use existing theme toggle system** - no new theme implementations
- **Form handling**: Follow the pattern in Contact.astro with Web3Forms
- **Performance**: Minimize JavaScript, prefer CSS solutions
- **No external libraries** without explicit approval

### File Structure
```
src/
├── components/           # Reusable Astro components
├── pages/               # Route pages
├── images/              # Optimized images
└── styles/              # Page-specific styles (minimal)

public/
├── styles/main.css      # Global styles (primary)
├── scripts/main.js      # Global JavaScript
└── images/              # Static assets
```

## Design System Rules

### Colors
- **Light mode**: White backgrounds, dark text
- **Dark mode**: Dark backgrounds, light text
- **Always test both themes** before completing tasks
- **Use semantic color variables** not hex codes

### Typography
- **Font**: Inter (loaded from Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body text**: Regular weight (400-500)
- **Emphasis**: Use `<em>` for italic styling (Dapper's signature style)

### Buttons
- **Base class**: `.btn` for all buttons
- **Variants**: `.btn-primary`, `.btn-outline`, `.btn-large`
- **No custom button styles** - extend existing classes only
- **Consistent hover effects**: Transform and shadow animations

### Spacing & Layout
- **Grid systems**: CSS Grid preferred over Flexbox for layouts
- **Container**: Max-width 1200px with responsive padding
- **Sections**: Use `var(--space-20)` for vertical section padding
- **Components**: Use consistent spacing scale

## Performance Requirements

### Core Web Vitals
- **LCP**: < 2.5 seconds
- **FID**: < 100ms  
- **CLS**: < 0.1
- **All metrics must stay green**

### Optimization Rules
- **Images**: Always optimize (WebP/AVIF preferred)
- **CSS**: Minimize custom styles, use existing variables
- **JavaScript**: Keep minimal, async where possible
- **Fonts**: Preload critical fonts, use font-display: swap

### CDN & Caching
- **Serve static assets** through CDN when possible
- **Proper cache headers** for static resources
- **Optimize loading order**: Critical CSS inline, defer non-critical

## Content Guidelines

### Writing Tone & Quality
- **Professional but approachable** - not overly casual
- **Data-driven**: Include specific metrics and examples
- **Benefits-focused**: Emphasize outcomes over features
- **Human-like authenticity**: Content must sound natural and human-written
- **Avoid AI detection**: No obvious AI-generated patterns or phrases

### Content Writing Rules
- **No AI-typical phrases**: Avoid "Furthermore," "Moreover," "Additionally," "It's important to note"
- **Vary sentence structure**: Mix short and long sentences naturally
- **Use specific examples**: Real scenarios over generic statements
- **Include minor imperfections**: Occasional contractions, fragments for emphasis
- **Personal experience tone**: "We've found that..." instead of "Studies show that..."
- **Conversational elements**: Rhetorical questions, direct address to reader
- **Industry-specific language**: Use actual web development terminology
- **Avoid hedging language**: "Various factors," "In many cases," "It depends"

### Authenticity Markers
- **Specific data points**: "Load time dropped from 6s to 0.3s" not "significantly faster"
- **Real-world references**: Current events, specific tools, actual companies
- **Opinion and personality**: Take stances, show preferences
- **Casual interjections**: "Look," "Here's the thing," "The reality is"
- **Professional experience**: "In our testing," "We've seen," "Our approach"

### SEO Requirements
- **Unique meta titles** and descriptions for each page
- **Proper heading hierarchy** (H1 → H2 → H3)
- **Schema markup** where appropriate
- **Internal linking** with descriptive anchor text
- **Image alt attributes** for all images

## Development Workflow

### Before Making Changes
1. **Read existing code** to understand patterns
2. **Check main.css** for existing styles before creating new ones
3. **Test both light and dark themes**
4. **Verify responsive design** at 768px and 480px breakpoints
5. **Update sitemap.xml** whenever creating new pages or routes

### Testing Checklist
- [ ] Light and dark theme both work
- [ ] Mobile responsive (320px to 1200px+)
- [ ] Navigation functions correctly
- [ ] Forms submit properly (if applicable)
- [ ] PageSpeed scores maintained
- [ ] No console errors
- [ ] Sitemap.xml updated with new pages
- [ ] All internal links working correctly

### Common Patterns to Follow

#### Page Structure
```astro
---
import Layout from '../components/Layout.astro';
---

<Layout title="Page Title" description="SEO description">
  <section class="page-hero">
    <!-- Hero content -->
  </section>
  
  <section class="main-content">
    <!-- Main content -->
  </section>
</Layout>

<style>
/* Page-specific styles using existing variables */
</style>
```

#### Dark Mode Styles
```css
.component {
  background: var(--color-white);
  color: var(--color-primary);
}

[data-theme="dark"] .component {
  background: var(--color-white); /* In dark theme, this becomes dark */
  color: var(--color-primary);    /* In dark theme, this becomes light */
}
```

## Restrictions

### What NOT to Do
- ❌ **Don't add external CSS frameworks** (Bootstrap, Tailwind, etc.)
- ❌ **Don't override CSS root variables** in component styles
- ❌ **Don't use inline styles** (use classes instead)
- ❌ **Don't break existing navigation** or theme toggle
- ❌ **Don't add heavy JavaScript libraries**
- ❌ **Don't ignore mobile responsiveness**
- ❌ **Don't forget dark mode styles**
- ❌ **Don't use deprecated HTML attributes**
- ❌ **Don't write AI-detectable content** (robotic, overly formal, repetitive patterns)
- ❌ **Don't use transition phrases** like "Furthermore," "Moreover," "Additionally"
- ❌ **Don't be overly generic** or use vague qualifiers like "various," "numerous"
- ❌ **Don't forget to update sitemap.xml** when adding new pages

### What TO Do
- ✅ **Use existing CSS variable system**
- ✅ **Follow established component patterns**
- ✅ **Test both light and dark themes**
- ✅ **Maintain performance standards**
- ✅ **Use semantic HTML elements**
- ✅ **Include proper accessibility attributes**
- ✅ **Optimize all images and assets**
- ✅ **Use consistent naming conventions**
- ✅ **Write authentic, human-sounding content**
- ✅ **Include specific metrics and real examples**
- ✅ **Use industry experience and professional insights**
- ✅ **Vary sentence length and structure naturally**
- ✅ **Update sitemap.xml when creating new pages or routes**
- ✅ **Check for broken internal links after page changes**

## Contact & Services
- **Primary email**: hey@staticpages.site
- **Contact form**: Uses Web3Forms API
- **Services focus**: Astro development, performance optimization, JAMstack
- **Target audience**: Businesses, agencies, startups needing fast websites

## Sitemap Management

### When to Update Sitemap
- **New pages created** (any .astro file in src/pages/)
- **Page URLs changed** (file renames or moves)
- **Pages deleted** (remove from sitemap)
- **Dynamic routes added** (API endpoints, etc.)

### Sitemap Location
- File: `/public/sitemap.xml`
- URL: `https://staticpages.site/sitemap.xml`

### Required Information for Each Page
```xml
<url>
  <loc>https://staticpages.site/page-url</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Page Priorities
- **Homepage**: 1.0
- **Main service pages**: 0.9
- **Individual service pages**: 0.8
- **Blog posts**: 0.7
- **Secondary pages**: 0.6

## Emergency Fixes
If something breaks:
1. **Check console errors** first
2. **Verify theme toggle** still works
3. **Test mobile navigation**
4. **Run PageSpeed test**
5. **Validate HTML markup**
6. **Check sitemap.xml accessibility**

Remember: This is a showcase website for a web development agency. Every page should demonstrate exceptional performance, design, and technical implementation.