# LSBFL Design System

**Purpose**: Elegant, ceremonial web3 phygital lottery. Tone: hopeful, aspirational—"Luck as a right, not a privilege." Emotion: opening a sacred envelope meets fintech elegance.

## Palette

| Token           | Light OKLCH    | Dark OKLCH     | Usage                                 |
|-----------------|----------------|----------------|---------------------------------------|
| primary         | 0.65 0.16 80   | 0.72 0.18 80   | Gold glow, buttons, interactive cues  |
| secondary       | 0.38 0.08 160  | 0.55 0.12 160  | Clover green, trust signals, accents  |
| background      | 0.97 0.01 70   | 0.08 0.01 50   | Light cream / deep black              |
| card            | 0.99 0.01 70   | 0.12 0.01 50   | Ticket/card surfaces                  |
| muted           | 0.92 0.02 70   | 0.18 0.01 50   | Secondary text, borders               |
| destructive     | 0.58 0.2 25    | 0.65 0.2 25    | Warnings, destructive actions         |

## Typography

| Role       | Font            | Scale          | Weight | Usage                        |
|------------|-----------------|----------------|--------|------------------------------|
| Display    | Fraunces        | 48–72px        | 700    | Headlines, ticket values     |
| Body       | Space Grotesk   | 16–18px        | 400–500 | Content, descriptions        |
| Mono       | JetBrains Mono  | 12–14px        | 400    | Codes, data, lottery numbers |

## Structural Zones

| Zone          | Light Surface           | Dark Surface            | Border             | Depth Treatment        |
|---------------|-------------------------|-------------------------|--------------------|------------------------|
| Header        | 0.97 0.01 70 transparent| 0.08 0.01 50 transparent| Minimal divider   | Floating, minimal      |
| Hero/Tickets  | 0.99 0.01 70 elevated   | 0.12 0.01 50 elevated   | 0.88 0.02 70       | Glow + ticket texture  |
| Content Cards | 0.99 0.01 70            | 0.12 0.01 50            | 0.88 0.02 70       | Soft shadow (xs)       |
| Buttons       | primary (gold)          | primary (gold)          | None               | Glow on hover          |
| Footer        | 0.92 0.02 70            | 0.18 0.01 50            | 0.88 0.02 70       | Subtle divider, muted  |

## Buttons & Interactive

- **Shape**: 12px border-radius, soft-edge design
- **State**: Default (gold solid) → Hover (glow-gold-active + shimmer) → Active (higher opacity)
- **Accessibility**: High contrast (AA+), focus ring 2px solid primary

## Cards & Tickets

- **Radius**: 24px for ticket cards, 12px for standard cards
- **Elevation**: Subtle shadow on light mode, glowing edge on dark mode
- **Texture**: Optional grain overlay for vintage banknote aesthetic
- **Interaction**: Flip animation on hover (preview), glow on selection

## Motion & Microinteractions

| Element              | Animation              | Duration | Trigger           |
|----------------------|------------------------|----------|-------------------|
| Button hover         | glow-gold-active       | 0.3s     | Mouse enter       |
| Shimmer effect       | shimmer (infinite)     | 2s       | Interactive ready |
| Ticket flip          | 3D rotate Y 180°       | 0.6s     | Hover/tap         |
| Confetti celebration | burst + fade           | 1.2s     | Win confirmed     |
| Ripple feedback      | Scale 1 → 1.05, fade   | 0.4s     | Click             |

## Differentiation

**Sacred Ticket Aesthetic**: Every interaction confirms "this is special." Gold glows on buttons, tickets have rounded corners + subtle texture, celebratory confetti on key actions (purchase, claim, win). Dark mode is deep black (#0A0A0A) with lifted card surfaces—cinema mode for the draw reveal. Light mode is warm cream with gold accents—daytime ticket browsing. Both modes maintain 7:1 contrast minimum for accessibility.

## Component Patterns

- **Buttons**: Large (48px height), soft-edge (12px), glow state
- **Inputs**: Clean borders (0.88 0.02 70), focus state gold ring
- **Modals**: Centered, dark overlay, elevated card surface
- **Lists**: Ticket stacks with offset positioning (offset by 8px each)
- **Badges**: Clover green background, body text white

## Spacing & Density

- **Gap**: 1rem (16px) between cards, 2rem (32px) between sections
- **Padding**: 1.5rem (24px) inside cards, 2rem (32px) in hero zones
- **Mobile**: 1rem gaps, 1rem padding (compressed density)

## Dark Mode Signature

Deep black background (`0.08 0.01 50`) creates "ceremonial cinema" feel. Gold primary (`0.72 0.18 80`) is brighter than light mode to maintain glow. Clover green (`0.55 0.12 160`) is lifted for readability. Every interactive element glows—no flat surfaces dominate.
