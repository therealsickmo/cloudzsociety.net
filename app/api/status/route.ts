import { NextResponse } from 'next/server';
import { connectAddress, getServerStatus, getSettings } from '@/lib/content-store';

// Live (mock) server status, derived from the editable settings.
// Read fresh on every request so /admin edits show immediately.
export const dynamic = 'force-dynamic';

export async function GET() {
  const status = getServerStatus();
  const address = connectAddress(getSettings());
  return NextResponse.json({ status, address });
}
