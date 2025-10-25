# Changelog

All notable changes to this project will be documented in this file.

## [2025-01-25] - STP Plant Month Filter Dropdown Fix

### Fixed
- **STP Plant Dashboard**: Fixed month filter dropdown responsiveness and styling
  - Improved dropdown container structure for better positioning
  - Fixed ChevronDown icon positioning using proper absolute positioning with `top-1/2 -translate-y-1/2`
  - Changed width from fixed `w-48` to responsive `w-full min-w-[200px]`
  - Increased icon size from `w-4 h-4` to `w-5 h-5` for better visibility
  - Improved padding and spacing for better mobile responsiveness
  - Removed right-aligned label text for better UX

### Changes Made
- Updated `components/modules/stp/Dashboard.tsx` month filter dropdown section
- Applied proper Tailwind CSS classes for responsive design
- Fixed icon positioning to be vertically centered

## [Previous Versions]

### Dependencies Installed
- `@supabase/supabase-js` - Supabase client library for database integration
- `react-is` - Required dependency for recharts library

### Features
- STP Plant Dashboard with real-time data from Supabase
- Monthly water treatment volume charts
- Daily operations log with month filtering
- Complete database records view with search and pagination
- Economic impact tracking and statistics
