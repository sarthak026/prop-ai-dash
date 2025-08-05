import { BarChart3, Home, Building, Shield, DollarSign, MessageCircle, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { 
    name: 'Dashboard', 
    icon: Home, 
    path: '/',
    isActive: true 
  },
  { 
    name: 'Properties', 
    icon: Building, 
    path: '/properties' 
  },
  { 
    name: 'Insurance', 
    icon: Shield, 
    path: '/insurance' 
  },
  { 
    name: 'Income', 
    icon: DollarSign, 
    path: '/income' 
  },
  { 
    name: 'Chat', 
    icon: MessageCircle, 
    path: '/chat' 
  },
];

export const AppSidebar = () => {
  return (
    <div className="w-64 bg-card border-r border-border h-screen fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-semibold text-lg text-foreground">
            Property Dashboard
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive || item.isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-body">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Log Out at bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-muted-foreground hover:bg-muted hover:text-foreground w-full">
          <div className="w-5 h-5 rounded-full bg-muted-foreground/20" />
          <span className="font-body">Log Out</span>
        </button>
      </div>
    </div>
  );
};