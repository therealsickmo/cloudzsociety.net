import type { ChangelogEntry } from '@/types';

// ────────────────────────────────────────────────────────────────
// CLOUDZ™ — Changelog entries (mock data)
// ────────────────────────────────────────────────────────────────

export const changelog: ChangelogEntry[] = [
  {
    version: '2.4.0',
    date: '2026-07-10',
    category: 'Update',
    features: [
      'Neuer Spielmodus „Skyfall" veröffentlicht',
      'Saisonales Battle-Pass System hinzugefügt',
      'Neue Nebula Wings Cosmetics im Shop',
    ],
    improvements: [
      'Lobby-Ladezeiten um 40% reduziert',
      'Überarbeitetes Scoreboard-Design',
    ],
    bugfixes: [
      'Fehler beim Teleportieren zwischen Welten behoben',
      'Chat-Filter reagiert nicht mehr auf legitime Nachrichten',
    ],
  },
  {
    version: '2.3.1',
    date: '2026-06-18',
    category: 'Hotfix',
    features: [],
    improvements: ['Performance des Anti-Cheat Systems optimiert'],
    bugfixes: [
      'Crash beim Öffnen von Legendary Crates behoben',
      'Rang-Prefixe werden wieder korrekt angezeigt',
    ],
  },
  {
    version: '2.3.0',
    date: '2026-05-30',
    category: 'Update',
    features: [
      'Premium Coins Währung eingeführt',
      'Neues Freundes- und Party-System',
    ],
    improvements: [
      'Discord-Verknüpfung überarbeitet',
      'Shop-Menü im Spiel neu gestaltet',
    ],
    bugfixes: ['Diverse kleinere UI-Fehler behoben'],
  },
  {
    version: '2.2.0',
    date: '2026-04-15',
    category: 'Update',
    features: [
      'Ranking- und Leaderboard-System',
      'Tägliche Belohnungen (Daily Rewards)',
    ],
    improvements: ['Server auf Version 1.21.4 aktualisiert'],
    bugfixes: ['Speicherfehler bei Spielerdaten behoben'],
  },
  {
    version: '2.1.0',
    date: '2026-02-20',
    category: 'Update',
    features: ['Neue Spawn-Welt mit interaktiven NPCs'],
    improvements: [
      'Verbesserte Matchmaking-Logik',
      'Optimierte Netzwerk-Stabilität',
    ],
    bugfixes: ['Lag-Spikes zur Primetime reduziert'],
  },
];
