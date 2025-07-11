# Cybersecurity Log Agent Dashboard

A modern, responsive React dashboard for monitoring and analyzing cybersecurity logs in real-time. Built with TypeScript, Tailwind CSS, and Supabase for a production-ready security monitoring solution.

## Features

### 🔑 Authentication
- Email-based authentication with Supabase Auth
- User registration and login
- Password reset functionality
- Protected routes for authenticated users
- Persistent sessions

### 🔐 Security Monitoring
- Real-time log analysis and visualization
- Color-coded decision indicators (allowed, blocked, flagged)
- Comprehensive filtering and search capabilities
- Statistical insights and trends

### 📊 Analytics & Visualization
- Interactive charts for decision distribution
- HTTP method analysis
- Real-time statistics cards
- Responsive data visualization

### 🎨 Modern UI/UX
- Clean, professional cybersecurity-themed design
- Fully responsive across all devices
- Smooth animations and micro-interactions
- Accessibility-focused components

### 🔍 Advanced Filtering
- Search by IP address or URL
- Filter by HTTP method, decision, and status
- Real-time filter application
- Clear filter functionality

### 📱 Responsive Design
- Mobile-first approach
- Optimized for tablets and desktops
- Touch-friendly interactions
- Adaptive layouts

## Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Authentication Setup

1. In your Supabase project dashboard, go to Authentication > Providers
2. Ensure Email provider is enabled
3. Configure email templates for confirmation and password reset emails
4. Set up redirect URLs for your application

### 3. Database Schema

The application expects a `logagent` table with the following structure:

```sql
CREATE TABLE logagent (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  method TEXT NOT NULL,
  query_string TEXT,
  user_agent TEXT,
  decision TEXT NOT NULL,
  confidence TEXT NOT NULL,
  reasoning TEXT,
  decision_maker TEXT,
  url TEXT NOT NULL,
  status BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Installation

```bash
npm install
```

### 5. Development

```bash
npm run dev
```

### 6. Production Build

```bash
npm run build
npm run preview
```

## Component Architecture

```
src/
├── App.tsx                        # Main app with routing and auth protection
├── components/
│   ├── Auth/
│   │   ├── AuthProvider.tsx       # Authentication context provider
│   │   ├── ProtectedRoute.tsx     # Route protection component
│   │   └── SignIn.tsx             # Email authentication component
│   └── Dashboard/
│       ├── Dashboard.tsx          # Main dashboard orchestrator
│       ├── Header.tsx             # App header with refresh
│       ├── StatsCards.tsx         # Statistics cards
│       ├── FilterBar.tsx          # Search and filter controls
│       ├── Charts.tsx             # Data visualization
│       ├── LogsTable.tsx          # Logs data table
│       ├── Pagination.tsx         # Table pagination
│       ├── LoadingSpinner.tsx     # Loading states
│       └── ErrorState.tsx         # Error handling
├── hooks/
│   ├── useLogs.ts                 # Custom hook for log data
│   └── useAuth.ts                 # Authentication hook and context
├── lib/
│   └── supabase.ts                # Supabase client setup
├── types/
│   └── index.ts                   # TypeScript definitions
└── utils/
    └── helpers.ts                 # Utility functions
```

## Key Features Explained

### Authentication System
The application uses Supabase Auth for secure email-based authentication:
- **AuthProvider**: Manages authentication state and provides auth functions throughout the app
- **Protected Routes**: Prevents unauthorized access to the dashboard
- **Sign In/Sign Up**: User-friendly form with email/password authentication
- **Password Reset**: Allows users to reset their password via email
- **Persistent Sessions**: Maintains user sessions across page reloads

### Real-time Data Fetching
The `useLogs` hook manages all data fetching with automatic error handling and loading states.

### Advanced Filtering
Multi-criteria filtering with debounced search and URL parameter persistence.

### Responsive Design
Mobile-first approach with breakpoints for tablet and desktop optimization.

### Performance Optimization
- Efficient data fetching with pagination
- Memoized components to prevent unnecessary re-renders
- Lazy loading for large datasets

### Security Features
- Email-based authentication with Supabase Auth
- Protected routes for authenticated users only
- Secure password handling (never stored in client)
- Session management with auto-refresh
- Input sanitization
- XSS protection
- Secure API communication

## Customization

### Colors and Themes
Update the color scheme in `tailwind.config.js` and component files.

### Table Columns
Modify the `LogsTable` component to add or remove columns based on your data structure.

### Charts
Customize charts in the `Charts` component using the Recharts library.

### Filters
Add new filter options in the `FilterBar` component and update the `useLogs` hook.

## Performance Considerations

- Pagination limits data fetching to manageable chunks
- Debounced search prevents excessive API calls
- Optimized re-renders with React.memo and useCallback
- Efficient data structures for fast filtering

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
