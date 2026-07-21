import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdminAuthed } from '@/lib/admin-auth';
import { LoginForm } from '@/components/admin/login-form';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthed()) redirect('/admin');
  return (
    <div className="container">
      <LoginForm />
    </div>
  );
}
