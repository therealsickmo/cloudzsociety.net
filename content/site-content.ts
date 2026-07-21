import type { SiteContent } from '@/types';

// ────────────────────────────────────────────────────────────────
// CLOUDZ™ — Default editable text content
// Seeds the content model; the /admin → Inhalte editor writes
// overrides to data/content.json.
// ────────────────────────────────────────────────────────────────

export const defaultContent: SiteContent = {
  nav: {
    items: [
      { label: 'Home', href: '/', enabled: true },
      { label: 'Team', href: '/team', enabled: true },
      { label: 'Blog', href: '/blog', enabled: true },
      { label: 'Logs', href: '/changelog', enabled: true },
      { label: 'Akt. Projekt', href: '/projekt', enabled: true, badge: 'Neu' },
      { label: 'Bewerben', href: '/apply', enabled: true },
      { label: 'Spenden', href: '/donate', enabled: true },
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
    title: 'Mehr als nur ein Server',
    description:
      'CLOUDZ™ verbindet moderne Technik mit einer Community, die zusammenhält. Das steckt hinter dem Netzwerk.',
    points: [
      {
        icon: 'Sparkles',
        title: 'Was ist Cloudz?',
        text: 'CLOUDZ™ ist eine moderne Minecraft Community mit eigenen Spielmodi, die du so nirgendwo sonst findest.',
      },
      {
        icon: 'Calendar',
        title: 'Seit 2021',
        text: 'Das Netzwerk existiert seit 2021 und wächst seitdem kontinuierlich mit einer aktiven, loyalen Community.',
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
