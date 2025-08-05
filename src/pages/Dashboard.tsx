import { Search, Bell, User, MoreHorizontal } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { MetricCard } from '@/components/MetricCard';
import { PropertyLineChart } from '@/components/Charts/LineChart';
import { RevenueBarChart } from '@/components/Charts/BarChart';
import { PropertyDonutChart } from '@/components/Charts/DonutChart';
import { PropertyListCard } from '@/components/PropertyListCard';
import { ProfileDropdown } from '@/components/ProfileDropdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">{/* Main content wrapper */}
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-foreground">Property Dashboard</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 w-64 bg-background border-border"
                  />
                </div>
                
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5 text-foreground" />
                </Button>
                
                <ProfileDropdown />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Total Properties"
              value="$4,562"
              subtitle="431 more to break last month record"
              variant="primary"
            />
            <MetricCard 
              title="Properties for Sale"
              value="$2,356"
              target="Target 36/month"
            />
            <MetricCard 
              title="Properties for Rent"
              value="$2,206"
              target="Target 36/month"
            />
            <MetricCard 
              title="Property Sale & Rent"
              value="$678,345"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Line Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-heading font-semibold">Total Overview</CardTitle>
                  <select className="font-body text-sm bg-transparent border-none focus:outline-none text-muted-foreground">
                    <option>Month</option>
                    <option>Year</option>
                  </select>
                </CardHeader>
                <CardContent>
                  <PropertyLineChart />
                </CardContent>
              </Card>
            </div>

            {/* Donut Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading font-semibold">Property Sale & Rent</CardTitle>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PropertyDonutChart />
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Bar Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading font-semibold">Total Revenue</CardTitle>
                  <p className="font-heading font-bold text-2xl text-foreground">$678,345</p>
                </CardHeader>
                <CardContent>
                  <RevenueBarChart />
                </CardContent>
              </Card>
            </div>

            {/* New List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading font-semibold">New List</CardTitle>
                <Button variant="ghost" className="font-body text-sm text-primary">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <PropertyListCard 
                  image="/placeholder.svg"
                  address="18 Abernethy Street, Westangara"
                  bedrooms={5}
                  bathrooms={2}
                  area={3}
                  price="$2500.00"
                  status="For Sale"
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;