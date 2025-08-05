import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Insurance = () => {
  const insurancePolicies = [
    {
      id: 1,
      property: '1234 Oak Street, Austin, TX',
      provider: 'State Farm',
      type: 'Property Insurance',
      premium: 1200,
      coverage: 425000,
      deductible: 2500,
      status: 'Active',
      expires: '2024-12-15'
    },
    {
      id: 2,
      property: '5678 Pine Avenue, Denver, CO',
      provider: 'Allstate',
      type: 'Landlord Insurance',
      premium: 900,
      coverage: 385000,
      deductible: 1000,
      status: 'Active',
      expires: '2024-11-30'
    },
    {
      id: 3,
      property: '9012 Maple Drive, Nashville, TN',
      provider: 'Progressive',
      type: 'Rental Property Insurance',
      premium: 1100,
      coverage: 355000,
      deductible: 1500,
      status: 'Expiring Soon',
      expires: '2024-02-15'
    }
  ];

  const riskAlerts = [
    {
      property: '9012 Maple Drive',
      risk: 'Flood Zone Update',
      severity: 'Medium',
      action: 'Review flood coverage'
    },
    {
      property: '3456 Cedar Boulevard',
      risk: 'Crime Rate Increase',
      severity: 'Low',
      action: 'Consider security upgrades'
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <h1 className="font-heading font-semibold text-xl text-foreground">Insurance Management</h1>
          <Button className="gap-2">
            <Shield className="w-4 h-4" />
            Add Policy
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
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Policies</p>
                    <p className="text-2xl font-bold text-foreground">{insurancePolicies.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Coverage</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${(insurancePolicies.reduce((acc, p) => acc + p.coverage, 0) / 1000000).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Alerts</p>
                    <p className="text-2xl font-bold text-foreground">{riskAlerts.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Annual Premium</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${insurancePolicies.reduce((acc, p) => acc + p.premium, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insurance Policies */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading font-semibold">Insurance Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insurancePolicies.map((policy) => (
                  <div key={policy.id} className="p-4 border border-border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">{policy.property}</h3>
                      <Badge variant={policy.status === 'Active' ? 'default' : 'destructive'}>
                        {policy.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Provider</p>
                        <p className="font-medium">{policy.provider}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Coverage</p>
                        <p className="font-medium">${policy.coverage.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Premium</p>
                        <p className="font-medium">${policy.premium}/year</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expires</p>
                        <p className="font-medium">{policy.expires}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading font-semibold">Risk Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAlerts.map((alert, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{alert.property}</h3>
                        <p className="text-sm text-muted-foreground">{alert.risk}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'default' : 'secondary'}>
                          {alert.severity}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{alert.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Insurance;