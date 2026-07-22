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
        image: '/images/skin-render.webp',
        title: 'Stabile Server ohne Lags',
        description:
          'Hochleistungs-Hardware garantiert dir ein lagfreies Minecraft-Erlebnis rund um die Uhr.',
        tags: '99.9% Uptime, Dedicated Hardware',
      },
      {
        image: '/images/skin-render.webp',
        title: 'Faires Spiel ohne Pay2Win',
        description:
          'Bei uns entscheidet Können, nicht dein Geldbeutel. Alle Spieler starten mit den gleichen Chancen.',
        tags: 'Kein Pay2Win, Fair Play',
      },
      {
        image: '/images/skin-render.webp',
        title: 'Aktive & freundliche Community',
        description:
          'Eine loyale Community und ein Team, das rund um die Uhr für dich da ist.',
        tags: '+400 Mitglieder, 24/7 Support',
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
    eyebrow: 'Features',
    title: 'Warum CLOUDZ™?',
    description:
      'Vier Gründe, warum sich tausende Spieler für unser Netzwerk entscheiden.',
    items: [
      {
        icon: 'Gamepad2',
        title: 'Eigene Spielmodi',
        text: 'Einzigartige Spielmodi, die wir selbst entwickeln — von rasantem PvP bis zu entspanntem Survival.',
      },
      {
        icon: 'Users',
        title: 'Aktive Community',
        text: 'Tausende Spieler auf Discord und im Spiel. Finde neue Freunde und erlebe Events gemeinsam.',
      },
      {
        icon: 'RefreshCw',
        title: 'Regelmäßige Updates',
        text: 'Neue Inhalte, Balance-Anpassungen und Features — wir liefern kontinuierlich frischen Content.',
      },
      {
        icon: 'Headphones',
        title: 'Schneller Support',
        text: 'Unser Support-Team ist rund um die Uhr für dich da und hilft bei jedem Anliegen zügig weiter.',
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
