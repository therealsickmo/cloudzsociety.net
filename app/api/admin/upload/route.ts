import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { NextResponse } from 'next/server';
import { isAdminAuthed } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images');
const ALLOWED = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

function slugify(name: string): string {
  const ext = path.extname(name).toLowerCase();
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  return `${base || 'bild'}-${Date.now().toString(36)}${ext}`;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, message: 'Keine Datei erhalten.' },
      { status: 400 },
    );
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED.includes(ext)) {
    return NextResponse.json(
      { ok: false, message: 'Dateityp nicht erlaubt (PNG, JPG, WebP, GIF, SVG).' },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, message: 'Datei zu groß (max. 8 MB).' },
      { status: 400 },
    );
  }

  let buffer: Buffer = Buffer.from(await file.arrayBuffer());

  // Auto-trim transparent borders so uploaded skins fill the frame.
  if (ext === '.png' || ext === '.webp') {
    try {
      buffer = Buffer.from(
        await sharp(buffer).trim({ threshold: 12 }).toBuffer(),
      );
    } catch {
      /* keep original on failure */
    }
  }

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const filename = slugify(file.name);
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);

  return NextResponse.json({ ok: true, path: `/images/${filename}` });
}
