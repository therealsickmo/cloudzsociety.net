import type { SiteContent } from '@/types';

// ────────────────────────────────────────────────────────────────
// CLOUDZ™ — Default editable text content
// Seeds the content model; the /admin → Inhalte editor writes
// overrides to data/content.json.
// ────────────────────────────────────────────────────────────────

export const defaultContent: SiteContent = {
  nav: {
    items: [
      { label: 'HOME', href: '/', enabled: true },
      { label: 'TEAM', href: '/team', enabled: true },
      { label: 'BLOG', href: '/blog', enabled: true },
      { label: 'LOGS', href: '/changelog', enabled: true },
      { label: 'PROJEKT', href: '/projekt', enabled: true, badge: 'Neu' },
      { label: 'BEWERBEN', href: '/apply', enabled: true },
      { label: 'SPENDEN', href: '/donate', enabled: true },
    ],
  },
  showcase: {
    eyebrow: 'WAS CLOUDZ™ AUSZEICHNET',
    title: 'Wieso ausgerechnet CLOUDZ™?',
    subtitle: 'Der faire deutsche Minecraft Server ohne Pay2Win',
    cards: [
      {
        icon: 'Sparkles',
        image: '/images/skin-render.webp',
        title: 'Immer etwas Neues',
        description:
          'Langweilige Dauer-Server gibt es genug. CLOUDZ™ setzt auf zeitlich begrenzte Projekte mit frischen Ideen und einzigartigen Erlebnissen.',
        tags: [
          { icon: 'RefreshCw', label: 'Temporäre Projekte', color: 'blue-normal', iconColor: 'blue-neon' },
          { icon: 'Sparkles', label: 'Einzigartige Konzepte', color: 'purple-normal', iconColor: 'purple-neon' },
        ],
      },
      {
        icon: 'Users',
        image: '/images/skin-render.webp',
        title: 'Jeder startet gleich',
        description:
          'Neue Projekte bedeuten einen gemeinsamen Start für alle. Niemand ist jahrelang im Vorteil – jeder hat die Chance, Geschichte zu schreiben.',
        tags: [
          { icon: 'Target', label: 'Chancengleichheit', color: 'green-normal', iconColor: 'green-neon' },
          { icon: 'Shield', label: 'Faire Bedingungen', color: 'cyan-normal', iconColor: 'cyan-neon' },
        ],
      },
      {
        icon: 'Gem',
        image: '/images/skin-render.webp',
        title: 'Qualität statt Masse',
        description:
          'Wir veröffentlichen nur Projekte, hinter denen wir stehen. Weniger Features, dafür mehr Liebe zum Detail und ein durchdachtes Spielerlebnis.',
        tags: [
          { icon: 'Heart', label: 'Liebe zum Detail', color: 'pink-normal', iconColor: 'pink-neon' },
          { icon: 'Trophy', label: 'Hohe Qualität', color: 'amber-normal', iconColor: 'amber-neon' },
        ],
      },
    ],
  },
  hero: {
    title: 'CLOUDZ™',
    subtitle:
      'Eine moderne Minecraft Community. Temporäre Projekte, eine aktive Community und regelmäßige Updates — willkommen im Netzwerk.',
    joinLabel: 'Minecraft Horizons',
    discordLabel: 'CLOUDZ™ Discord',
    rulesLabel: 'Regeln lesen',
    stats: [
      { icon: 'Calendar', label: 'Gründung', value: '01.02.2026' },
      { icon: 'Users', label: 'Community', value: '+400' },
      { icon: 'Sparkles', label: 'Konzept', value: 'Temporäre Projekte' },
    ],
  },
  about: {
    eyebrow: 'Über Cloudz',
    title: 'Wieso ausgerechnet CLOUDZ™?',
    description: 'Test erstmals..',
    points: [
      {
        icon: 'Sparkles',
        title: 'Was ist Cloudz?',
        text: 'CLOUDZ™ ist eine moderne Minecraft Community mit eigenen Spielmodi, die du so nirgendwo sonst findest.',
      },
      {
        icon: 'Compass',
        title: 'Unsere Ziele',
        text: 'Ein faires, freundliches Miteinander und ein Spielerlebnis, das durch regelmäßige Updates niemals langweilig wird.',
      },
      {
        icon: 'Rocket',
        title: 'Unsere Vision',
        text: 'Die hochwertigste deutschsprachige Minecraft-Plattform zu bauen — technisch modern und mit echtem Community-Fokus.',
      },
    ],
  },
  features: {
    eyebrow: 'FEATURES',
    title: 'Warum CLOUDZ™?',
    subtitle: 'Vier Gründe, warum sich tausende Spieler für unser Netzwerk entscheiden.',
    cards: [
      {
        icon: 'Gamepad2',
        image: '/images/skin-render.webp',
        title: 'Eigene Spielmodi',
        description:
          'Einzigartige Spielmodi, die wir selbst entwickeln — von rasantem PvP bis zu entspanntem Survival.',
        tags: [
          { icon: 'Swords', label: 'PvP', color: 'red-neon', iconColor: 'red' },
          { icon: 'Sparkles', label: 'Einzigartig', color: 'blue-neon', iconColor: 'blue' },
        ],
      },
      {
        icon: 'Users',
        image: '/images/skin-render.webp',
        title: 'Aktive Community',
        description:
          'Tausende Spieler auf Discord und im Spiel. Finde neue Freunde und erlebe Events gemeinsam.',
        tags: [
          { icon: 'Handshake', label: 'Community', color: 'green-neon', iconColor: 'green' },
          { icon: 'PartyPopper', label: 'Events', color: 'purple-neon', iconColor: 'purple' },
        ],
      },
      {
        icon: 'RefreshCw',
        image: '/images/skin-render.webp',
        title: 'Regelmäßige Updates',
        description:
          'Neue Inhalte, Balance-Anpassungen und Features — wir liefern kontinuierlich frischen Content.',
        tags: [
          { icon: 'Rocket', label: 'Fortschritt', color: 'cyan-neon', iconColor: 'cyan' },
          { icon: 'Gift', label: 'Neuer Content', color: 'amber-neon', iconColor: 'amber' },
        ],
      },
    ],
  },
  stats: {
    eyebrow: 'Live Dashboard',
    title: 'Serverstatistik',
    description: 'Ein Blick auf unser Netzwerk in Echtzeit. (Aktuell mit Beispieldaten.)',
  },
  cta: {
    title: 'Bereit, Teil der CLOUDZ™ Community zu werden?',
    description:
      'Verbinde dich mit dem Server, tritt unserem Discord bei und erlebe Minecraft neu.',
    joinLabel: 'Server beitreten',
    discordLabel: 'Discord beitreten',
  },
  footer: {
    tagline: 'made with ❤️ für die Community.',
    note: 'nicht mit Mojang oder Microsoft verbunden.',
  },
  pages: {
    shop: {
      eyebrow: 'Shop',
      title: 'Unterstütze das Netzwerk',
      description:
        'Mit jedem Kauf hilfst du, die Server zu betreiben, neue Features zu entwickeln und die Community am Leben zu halten.',
    },
    team: {
      eyebrow: 'Team',
      title: 'Die Köpfe hinter CLOUDZ™',
      description:
        'Ein engagiertes Team sorgt Tag und Nacht für ein reibungsloses Erlebnis.',
    },
    blog: {
      eyebrow: 'Blog',
      title: 'News & Updates',
      description:
        'Alles Wichtige aus dem Netzwerk — von neuen Spielmodi über Guides bis zu Community-Highlights.',
    },
    changelog: {
      eyebrow: 'Changelog',
      title: 'Was ist neu?',
      description:
        'Verfolge die Entwicklung des Netzwerks — jede Version, jedes Feature und jeder Fix an einem Ort.',
    },
    apply: {
      eyebrow: 'Bewerben',
      title: 'Werde Teil des Teams',
      description:
        'Wir suchen motivierte Leute, die das Netzwerk mitgestalten wollen.',
    },
    donate: {
      eyebrow: 'Spenden',
      title: 'Unterstütze CLOUDZ™',
      description:
        'Deine Unterstützung hält das Netzwerk am Leben. Die Spendenfunktion befindet sich gerade im Aufbau.',
    },
    kontakt: {
      eyebrow: 'Kontakt',
      title: 'So erreichst du uns',
      description:
        'Fragen, Feedback oder Kooperationsanfragen? Wähle einfach den Kanal, der dir am liebsten ist.',
    },
  },
};
