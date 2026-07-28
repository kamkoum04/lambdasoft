/**
 * Every string on the page, in both languages.
 *
 * The French is written, not converted. Sales copy translated literally reads
 * as translated, which for a studio selling judgement is the wrong first
 * impression, so a few lines say the same thing differently rather than the
 * same thing word for word. French spacing rules are respected: a narrow
 * no-break space (U+202F) before ? ! ; and a no-break space before :, so a
 * question mark can never be orphaned onto the next line.
 *
 * `en` is the shape of record, and `checks/i18n.test.mjs` asserts that every
 * other locale carries exactly the same keys — missing ones and extra ones both
 * fail. Run it with `npm test`.
 *
 * This used to say `fr: typeof en` guaranteed that at compile time. It did not
 * and could not: `en` is `as const`, so `typeof en` is a tree of string
 * *literal* types that every French string violates — 56 errors — and no
 * typechecker ran. Do not restore that annotation; the check is the guarantee.
 */

export const languages = {
  en: { label: 'English', short: 'EN', htmlLang: 'en' },
  fr: { label: 'Français', short: 'FR', htmlLang: 'fr' },
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

const en = {
  meta: {
    title: 'lambdasoft \u2014 Your engineering partner',
    description:
      'lambdasoft is a product engineering team for the AI era. We design, build and ship software: web, mobile, desktop, and the cloud it runs on.',
  },

  nav: {
    sections: 'Sections',
    backToTop: 'back to top',
    language: 'Language',
    footer: 'Footer',
    emailUs: 'Email us',
    items: [
      { href: '#why', label: 'Why partner' },
      { href: '#build', label: 'What we do' },
      { href: '#contact', label: 'Contact' },
    ],
  },

  hero: {
    title: 'Your engineering partner, from concept to production.',
    lede: 'Designers, engineers and infrastructure people in one team, building the product and the AI inside it.',
    cta: 'Start a project',
    imageAlt:
      'A still dark sea at night, ringed by concentric ripples around a glowing pool of blue light, with a pale horizon beyond.',
    stackLabel: 'Technologies we work with',
  },

  art: {
    devices: 'A desktop screen and a phone drawn in outline, sharing one interface',
  },

  why: {
    heading: 'Why partner with us',
    intro:
      'We bring engineering depth, design judgement and agentic AI into one team, so the thing that ships is the thing you actually needed.',
    cards: {
      scale: {
        title: 'Designed for scale',
        body: 'Typed boundaries, real migrations, and load paths considered before they matter. Scaling later is a decision made early, or it is a rewrite.',
        alt: 'Three isometric stacks of increasing height, rising from left to right',
      },
      global: {
        title: 'Natively global',
        body: 'We build for users who are not all in one place: several regions, several languages, and latency budgets that still hold a long way from your servers. Global is a constraint decided early, not retrofitted.',
        alt: 'A wireframe globe with lit regions and a tilted orbit passing around it',
      },
      support: {
        title: 'Exclusive technical resources and support',
        body: 'You get the engineers who wrote your code, not a ticket queue. Direct access while it is being built, and a named person to call once it is running.',
        alt: 'A direct signal between two points, with a queue crossed out below',
      },
      ecosystem: {
        title: 'Expand your ecosystem',
        body: 'Your product rarely lives alone. We connect it to the payment, identity, data and messaging systems your customers already run, with integrations that are documented and testable.',
        alt: 'A core system with three tilted orbits, each carrying a connected service',
      },
      ai: {
        title: 'Built for the AI era',
        body: 'Generative AI and autonomous agents, applied where they genuinely improve the product. The tooling changes every few months, so we stay current and we measure what ships rather than assuming it helped.',
        alt: 'A constructed robot face with a lit visor, flanked by the four-pointed spark used to mark AI',
      },
      creative: {
        title: 'Creative excellence',
        body: 'Interfaces that are pleasant to use, and a design system underneath them so the tenth screen still looks like the first. The hard decisions are made before the build, not argued over during it.',
        alt: 'A lamp whose filament is drawn as a lambda, casting light',
      },
    },
  },

  build: {
    heading: 'What we do',
    intro:
      'Design, engineering, infrastructure and AI. Take a single discipline, or hand over the whole build from first sketch to production.',
    services: {
      ai: {
        name: 'Agentic and generative AI',
        body: 'Autonomous agents that plan and call your tools, retrieval over your own documents, and the evaluations that show it helped.',
      },
      engineering: {
        name: 'Software engineering',
        body: 'Web, mobile and desktop applications. TypeScript from the database to the browser, native where the platform genuinely matters.',
      },
      cloud: {
        name: 'Cloud and infrastructure',
        body: 'Containers, CI that runs the tests before a merge, and infrastructure as code so any environment rebuilds from the repository alone.',
      },
      security: {
        name: 'Security',
        body: 'Authentication and authorisation done properly, secrets kept out of the repository, dependencies monitored, and least-privilege access by default.',
      },
    },
  },

  footer: {
    index: 'Sections',
    reach: 'Reach us',
    backToTop: 'Back to top',
    /* A colophon: true statements about how this site is made. It is here
       because it is the one honest way a studio with no client logos can fill a
       footer — craft evidence rather than borrowed credibility. Every claim
       must stay true: no analytics or cookies are loaded anywhere. */
    colophon: 'Set in Manrope. Built with Astro, served as static files. No analytics, no cookies, no trackers.',
  },

  contact: {
    heading: 'Start a conversation',
    intro:
      'Tell us what you are trying to build, roughly when you need it, and any constraint that already exists: a platform, a budget, a codebase someone else wrote. The first reply comes from the person who would do the work.',
    direct: 'Or write to us directly',
    name: 'Your name',
    email: 'Email',
    message: 'What are you building?',
    send: 'Send',
    noticeTitle: 'Not connected yet.',
    noticeBody:
      'Sending is switched off until FORM_ENDPOINT is set in src/site.ts. The address above is a placeholder too — replace PLACEHOLDER_EMAIL in the same file. Nothing typed here is sent or stored.',
  },
} as const;

const fr = {
  meta: {
    title: "lambdasoft \u2014 Votre partenaire d'ingénierie",
    description:
      "lambdasoft est une équipe d'ingénierie produit pour l'ère de l'IA. Nous concevons, développons et livrons des logiciels : web, mobile, desktop, et le cloud qui les fait tourner.",
  },

  nav: {
    sections: 'Sections',
    backToTop: 'retour en haut',
    language: 'Langue',
    footer: 'Pied de page',
    emailUs: 'Nous écrire',
    items: [
      { href: '#why', label: 'Pourquoi nous' },
      { href: '#build', label: 'Ce que nous faisons' },
      { href: '#contact', label: 'Contact' },
    ],
  },

  hero: {
    title: "Votre partenaire d'ingénierie, du concept à la production.",
    lede: "Designers, ingénieurs et spécialistes de l'infrastructure dans une seule équipe, qui construisent le produit et l'IA qu'il contient.",
    cta: 'Démarrer un projet',
    imageAlt:
      "Une mer sombre et immobile la nuit, cernée de rides concentriques autour d'un bassin de lumière bleue, avec un horizon pâle au loin.",
    stackLabel: 'Les technologies que nous utilisons',
  },

  art: {
    devices: 'Un écran de bureau et un téléphone dessinés au trait, partageant une même interface',
  },

  why: {
    heading: 'Pourquoi travailler avec nous',
    intro:
      "Profondeur technique, jugement en design et IA agentique réunis dans une seule équipe : ce qui est livré est bien ce dont vous aviez besoin.",
    cards: {
      scale: {
        title: "Conçu pour l'échelle",
        body: "Des frontières typées, de vraies migrations, et les chemins de charge pensés avant qu'ils ne comptent. Passer à l'échelle plus tard, cela se décide tôt, sinon c'est une réécriture.",
        alt: 'Trois piles isométriques de hauteur croissante, montant de gauche à droite',
      },
      global: {
        title: 'International par nature',
        body: "Nous construisons pour des utilisateurs qui ne sont pas tous au même endroit : plusieurs régions, plusieurs langues, et des budgets de latence qui tiennent encore loin de vos serveurs. L'international est une contrainte décidée tôt, pas rajoutée après coup.",
        alt: 'Un globe filaire aux régions éclairées, traversé par une orbite inclinée',
      },
      support: {
        title: 'Ressources techniques et support dédiés',
        body: "Vous parlez aux ingénieurs qui ont écrit votre code, pas à une file de tickets. Un accès direct pendant la construction, et une personne identifiée à appeler une fois en production.",
        alt: 'Un signal direct entre deux points, avec une file d’attente barrée en dessous',
      },
      ecosystem: {
        title: 'Étendez votre écosystème',
        body: "Votre produit vit rarement seul. Nous le relions aux systèmes de paiement, d'identité, de données et de messagerie que vos clients utilisent déjà, avec des intégrations documentées et testables.",
        alt: 'Un système central entouré de trois orbites inclinées, chacune portant un service connecté',
      },
      ai: {
        title: "Pensé pour l'ère de l'IA",
        body: "IA générative et agents autonomes, appliqués là où ils améliorent réellement le produit. L'outillage change tous les quelques mois : nous restons à jour et nous mesurons ce qui est livré plutôt que de supposer que cela a aidé.",
        alt: 'Un visage de robot construit, à la visière éclairée, encadré par l’étincelle à quatre branches qui signale l’IA',
      },
      creative: {
        title: 'Exigence créative',
        body: "Des interfaces agréables à utiliser, et un design system dessous pour que le dixième écran ressemble encore au premier. Les décisions difficiles sont prises avant la construction, pas débattues pendant.",
        alt: 'Une lampe dont le filament dessine un lambda, projetant sa lumière',
      },
    },
  },

  build: {
    heading: 'Ce que nous faisons',
    intro:
      "Design, ingénierie, infrastructure et IA. Prenez une seule discipline, ou confiez-nous le projet entier, du premier croquis à la production.",
    services: {
      ai: {
        name: 'IA générative et agentique',
        body: "Des agents autonomes qui planifient et appellent vos outils, la recherche augmentée sur vos propres documents, et les évaluations qui prouvent que cela a servi.",
      },
      engineering: {
        name: 'Ingénierie logicielle',
        body: "Applications web, mobiles et desktop. TypeScript de la base de données au navigateur, natif quand la plateforme le justifie vraiment.",
      },
      cloud: {
        name: 'Cloud et infrastructure',
        body: "Conteneurs, CI qui exécute les tests avant la fusion, et infrastructure as code pour que n'importe quel environnement se reconstruise depuis le dépôt seul.",
      },
      security: {
        name: 'Sécurité',
        body: "Authentification et autorisation faites correctement, secrets tenus hors du dépôt, dépendances surveillées, et moindre privilège par défaut.",
      },
    },
  },

  footer: {
    index: 'Sections',
    reach: 'Nous joindre',
    backToTop: 'Haut de page',
    colophon: "Composé en Manrope. Construit avec Astro, servi en fichiers statiques. Aucune analyse d'audience, aucun cookie, aucun traceur.",
  },

  contact: {
    heading: 'Entamons la conversation',
    intro:
      "Dites-nous ce que vous cherchez à construire, à peu près pour quand, et toute contrainte qui existe déjà : une plateforme, un budget, du code écrit par quelqu'un d'autre. La première réponse vient de la personne qui ferait le travail.",
    direct: 'Ou écrivez-nous directement',
    name: 'Votre nom',
    email: 'E-mail',
    message: 'Que voulez-vous construire ?',
    send: 'Envoyer',
    noticeTitle: 'Pas encore connecté.',
    noticeBody:
      "L'envoi est désactivé tant que FORM_ENDPOINT n'est pas renseigné dans src/site.ts. L'adresse ci-dessus est également provisoire — remplacez PLACEHOLDER_EMAIL dans le même fichier. Rien de ce qui est saisi ici n'est envoyé ni conservé.",
  },
};

export const ui = { en, fr } as const;
