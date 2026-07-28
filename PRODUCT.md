# Product

## Register

brand

## Users

Primary: startup founders and early product teams evaluating an outside team to build their product. They are technical-adjacent — they can read a stack list and will judge competence from it. They arrive skeptical, usually comparing three or four vendors, and they are looking for reasons to disqualify before reasons to buy.

Secondary: SMB owners and operators who need a specific thing built (an app, a portal, a migration) and cannot evaluate engineering depth directly. They judge on clarity, confidence, and whether the team seems like it will actually finish.

Context of use: desktop or phone, mid-evaluation, skimming. Rarely a first-touch discovery — usually arriving from a referral, a search, or a founder's shortlist. They will spend under a minute before deciding whether to keep reading.

Job to be done: decide whether lambdasoft is credible enough to start a conversation with, and understand what lambdasoft actually builds without decoding marketing language.

## Product Purpose

A single landing page that establishes lambdasoft as a competent full-stack software partner covering web, mobile, desktop, cloud, and AI, and converts a skeptical evaluator into an inbound conversation.

lambdasoft is a new company with no client portfolio yet. The page must therefore build credibility from what genuinely exists — in-house builds, side projects, demonstrable stack depth, and a clear account of how the team works — rather than from borrowed authority (fake logos, invented case studies, inflated metrics).

Success: a visitor who has never heard of lambdasoft can, within one minute, say what the company builds, believe it can build it, and know how to start a conversation.

## Brand Personality

Precise, engineered, calm.

Voice: plain, specific, and technical without posturing. Says what it builds and how. Uses concrete nouns (Postgres, React Native, inference latency) in place of abstract value words. Never sells with adjectives.

Tone: confident and unhurried. The register of a senior engineer explaining a system — not a salesperson, not a hype account. Comfortable with short sentences and with saying "we don't do that."

Emotional goal: relief. The visitor should feel they have found the rare vendor page that respects their time and does not need to shout.

## Anti-references

- **Generic dev-agency template.** Three icon cards in a row, "We deliver innovative solutions for your business", stock gradient hero, Bootstrap-shaped section rhythm, a services grid that could belong to any of ten thousand companies. This is the default failure mode for this category and the most important one to avoid.
- **AI/crypto hype aesthetic.** Purple-to-blue glow, floating orbs and blobs, neon edge lighting, fabricated dashboard screenshots, "next-gen", "unleash", "revolutionize". The palette here is blue, which makes this drift especially easy — guard against it deliberately.
- Also avoid: fabricated proof of any kind. No invented client logos, no made-up metrics, no case studies for work that was not done.

## Design Principles

1. **Show the build, not adjectives.** Every credibility claim resolves to something concrete — a stack, an artifact, a demo, a described decision. If a sentence would survive being pasted onto a competitor's site, it is cut.

2. **Honest proof only.** In-house and side projects are labeled as exactly that. The absence of client work is handled by showing real capability, never by implying clients that do not exist. Placeholder slots are visibly placeholders.

3. **Range must read as depth, not a menu.** Five capability areas (web, mobile, desktop, cloud, AI) risk reading as an undifferentiated service list. They must be presented as one team's coherent competence, with the connections between them visible.

4. **Earn the click before asking for it.** Evidence precedes the ask. The contact moment lands after the visitor has reason to believe, not only in the first viewport.

5. **Restraint is the credibility argument.** This page is itself the primary work sample. Sloppy spacing, weak hierarchy, or decorative noise disqualifies the company more effectively than any missing feature. What is left out matters as much as what is included.

## Accessibility & Inclusion

- **WCAG 2.2 AA** as the enforced baseline: 4.5:1 contrast for body text, 3:1 for large text and meaningful non-text elements.
- Full keyboard operability with a visible, high-contrast focus indicator on every interactive element.
- **All motion gated behind `prefers-reduced-motion`.** Scroll-driven and entrance animation must degrade to a static, fully legible page — no content that only appears after animating in.
- Palette constraint: the mid-cyan (`#00B4D8`) fails AA against the deep navy for body text. It is an accent and large-text colour only; body copy uses the pale end of the ramp on dark surfaces.
- Semantic landmarks and a logical heading order, so the page is navigable by screen reader without relying on visual grouping.
