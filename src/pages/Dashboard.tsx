import { Search, Bell, User, MoreHorizontal } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { MetricCard } from '@/components/MetricCard';
import { PropertyLineChart } from '@/components/Charts/LineChart';
import { RevenueBarChart } from '@/components/Charts/BarChart';
import { PropertyDonutChart } from '@/components/Charts/DonutChart';
import { PropertyListCard } from '@/components/PropertyListCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-muted border-0 rounded-lg w-64 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
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