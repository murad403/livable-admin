import OverviewStats from '@/components/app/OverviewStats';
import ActiveClient from '@/components/app/ActiveClient';
import QuickActions from '@/components/app/QuickActions';
import UpcomingTrips from '@/components/app/UpcomingTrips';

export default function OverviewPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top 4 Stats Cards */}
      <OverviewStats />

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Client Dossiers Table (8 cols) */}
        <div className="lg:col-span-8">
          <ActiveClient />
        </div>

        {/* Right Column: Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <QuickActions />
          <UpcomingTrips />
        </div>
      </div>
    </div>
  );
}