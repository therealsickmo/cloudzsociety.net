import { redirect } from 'next/navigation';
import { isAdminAuthed } from '@/lib/admin-auth';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { ToastProvider } from '@/components/admin/toast';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthed())) redirect('/admin/login');

  return (
    <ToastProvider>
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] bg-background">
        <AdminSidebar />
        <div className="flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
        </div>
      </div>
    </ToastProvider>
  );
}
