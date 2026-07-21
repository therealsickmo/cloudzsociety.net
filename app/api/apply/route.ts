import { NextResponse } from 'next/server';
import type { ApplicationPayload } from '@/types';

// ────────────────────────────────────────────────────────────────
// Dummy application endpoint.
//
// Validates the payload and echoes success. No persistence yet — later
// this can forward to a Discord webhook, a database or an admin queue.
// ────────────────────────────────────────────────────────────────

function isValid(body: Partial<ApplicationPayload>): body is ApplicationPayload {
  return Boolean(
    body.role &&
      body.minecraftName &&
      body.discordName &&
      body.age &&
      body.experience &&
      body.motivation,
  );
}

export async function POST(request: Request) {
  let body: Partial<ApplicationPayload>;
  try {
    body = (await request.json()) as Partial<ApplicationPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Ungültige Anfrage.' },
      { status: 400 },
    );
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { ok: false, message: 'Bitte fülle alle Felder aus.' },
      { status: 422 },
    );
  }

  // Simulate processing latency.
  await new Promise((resolve) => setTimeout(resolve, 700));

  // In a real setup we would persist / forward `body` here.
  return NextResponse.json({
    ok: true,
    message: `Danke für deine Bewerbung als ${body.role}! Wir melden uns bei dir über Discord.`,
  });
}
