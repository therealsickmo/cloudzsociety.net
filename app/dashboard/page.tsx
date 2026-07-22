import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import {
  getMembers,
  getTickets,
  getTimeEntries,
  getTodos,
} from '@/lib/dashboard-store';
import { DashboardClient } from '@/components/dashboard/dashboard-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect('/login');

  const canManage = user.role === 'admin' || user.role === 'team';

  return (
    <DashboardClient
      user={user}
      initial={
        canManage
          ? {
              todos: getTodos(),
              tickets: getTickets(),
              time: getTimeEntries(),
              members: getMembers(),
            }
          : { todos: [], tickets: [], time: [], members: [] }
      }
    />
  );
}
