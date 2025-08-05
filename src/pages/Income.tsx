import { DollarSign, TrendingUp, Calendar, PieChart } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Income = () => {
  const incomeStreams = [
    {
      id: 1,
      property: '1234 Oak Street, Austin, TX',
      tenant: 'John Smith',
      monthlyRent: 2800,
      status: 'Paid',
      nextDue: '2024-02-01',
      ytdIncome: 8400
    },
    {
      id: 2,
      property: '5678 Pine Avenue, Denver, CO',
      tenant: 'Sarah Johnson',
      monthlyRent: 2400,
      status: 'Paid',
      nextDue: '2024-02-01',
      ytdIncome: 7200
    },
    {
      id: 3,
      property: '9012 Maple Drive, Nashville, TN',
      tenant: 'Mike Wilson',
      monthlyRent: 2200,
      status: 'Overdue',
      nextDue: '2024-01-15',
      ytdIncome: 4400
    }
  ];

  const expenses = [
    { category: 'Maintenance', amount: 1250, percentage: 25 },
    { category: 'Property Management', amount: 750, percentage: 15 },
    { category: 'Insurance', amount: 1000, percentage: 20 },
    { category: 'Taxes', amount: 1500, percentage: 30 },
    { category: 'Utilities', amount: 500, percentage: 10 }
  ];

  const totalIncome = incomeStreams.reduce((acc, stream) => acc + stream.ytdIncome, 0);
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <h1 className="font-heading font-semibold text-xl text-foreground">Income Management</h1>
          <Button className="gap-2">
            <DollarSign className="w-4 h-4" />
            Record Payment
          </Button>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">YTD Income</p>
                    <p className="text-2xl font-bold text-foreground">${totalIncome.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">YTD Expenses</p>
                    <p className="text-2xl font-bold text-foreground">${totalExpenses.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <PieChart className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Net Income</p>
                    <p className="text-2xl font-bold text-foreground">${netIncome.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Properties</p>
                    <p className="text-2xl font-bold text-foreground">{incomeStreams.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income Streams */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading font-semibold">Rental Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomeStreams.map((stream) => (
                    <div key={stream.id} className="p-4 border border-border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground text-sm">{stream.property}</h3>
                        <Badge variant={stream.status === 'Paid' ? 'default' : 'destructive'}>
                          {stream.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Tenant: {stream.tenant}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Monthly Rent</p>
                          <p className="font-medium">${stream.monthlyRent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">YTD Income</p>
                          <p className="font-medium">${stream.ytdIncome.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Next Due: {stream.nextDue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Expenses Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading font-semibold">Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{expense.category}</p>
                        <p className="text-sm text-muted-foreground">{expense.percentage}% of total</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">${expense.amount.toLocaleString()}</p>
                        <div className="w-24 bg-muted rounded-full h-2 mt-1">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${expense.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading font-semibold">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div>
                      <p className="font-medium">Rent Payment - Oak Street</p>
                      <p className="text-sm text-muted-foreground">Jan 1, 2024</p>
                    </div>
                  </div>
                  <p className="font-medium text-success">+$2,800</p>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div>
                      <p className="font-medium">Maintenance - Pine Avenue</p>
                      <p className="text-sm text-muted-foreground">Jan 3, 2024</p>
                    </div>
                  </div>
                  <p className="font-medium text-warning">-$450</p>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div>
                      <p className="font-medium">Rent Payment - Pine Avenue</p>
                      <p className="text-sm text-muted-foreground">Jan 1, 2024</p>
                    </div>
                  </div>
                  <p className="font-medium text-success">+$2,400</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Income;