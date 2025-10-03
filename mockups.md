# TeamsFit Mockups

## Overview
TeamsFit is a hiring pipeline management application with a modern dark theme and gradient accents.

## Design System
- **Background**: Dark (#0B0B1A)
- **Text**: Light gray (#EDEDED)
- **Accent Gradient**: Blue to Purple (#2D9CDB → #BB6BD9)
- **Rounded Corners**: Extra large (1rem)
- **Status Colors**: Semantic colors for different candidate statuses

## Routes

### 1. `/auth/login`
Login page with email/password form and link to registration.

### 2. `/auth/new-user`
Registration page for new users with full name, email, company, and password fields.

### 3. `/teamsfit/dashboard`
Main dashboard with two tabs:
- **Candidates Tab**: Table showing candidate name, email, position, applied date, and status badges
- **Jobs Tab**: 
  - Metric cards for Jobs (Open, In Progress, Closed)
  - Metric cards for Candidates (Active, Passive)
  - Metric cards for Timing KPIs (Time to Source, Recruit, Start)
  - Jobs table with title, location, employment type, status, and created date

### 4. `/teamsfit/interviews`
Interview management page with:
- Filter buttons (All, Scheduled, Completed)
- Table showing candidate, position, date, time, interviewer, type, and status
- Schedule Interview button

## Components

### UI Components
- **Button**: Gradient primary variant for CTAs
- **Input**: Dark themed with border
- **Table**: Dark themed with hover effects
- **Badge**: Various status colors
- **Tabs**: Gradient highlight for active tab
- **Card**: Dark background with gradient border on hover

### Custom Components
- **GradientText**: Text with gradient background clip
- **MetricCard**: Card displaying KPI metrics with hover effect
- **StatusBadge**: Colored badge for candidate statuses

## Mock Data
All data is stored in `src/mocks/data.ts`:
- 5 mock candidates with different statuses
- 5 mock jobs (mix of active/inactive)
- 3 mock interviews
- Mock metrics for KPIs

## Usage Notes
- This is a UI mockup without backend functionality
- All navigation works between pages
- Forms don't persist data (mock login/registration)
- Tables display static mock data
- Filters on interview page work with mock data
