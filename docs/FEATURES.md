# Timetablely Features

Complete feature list and capabilities of Timetablely timetable management system.

## Table of Contents

1. [Core Features](#core-features)
2. [Quick Start Mode](#quick-start-mode)
3. [Timetable Grid](#timetable-grid)
4. [Database Management](#database-management)
5. [Automated Generation](#automated-generation)
6. [Templates](#templates)
7. [Export Options](#export-options)
8. [User Interface](#user-interface)
9. [Authentication](#authentication)
10. [Upcoming Features](#upcoming-features)

---

## Core Features

### Timetable Creation
- **Interactive Grid** - Visual drag-and-drop interface
- **5-Day Week** - Monday through Friday scheduling
- **Customizable Time Slots** - Adjustable column durations
- **Cell Editing** - Double-click to edit any cell
- **Multi-line Content** - Support for course name, tutor, and notes

### Data Management
- **Tutors Database** - Manage teaching staff
- **Courses Database** - Define subjects and assignments
- **Sessions Database** - Organize by class groups
- **Special Blocks** - Define breaks, lunch, assemblies

### Automation
- **Standard Generation** - Rule-based timetable creation
- **AI Generation** - Intelligent scheduling with Google Gemini
- **Conflict Detection** - Automatic tutor availability checking
- **Priority Scheduling** - High/Medium/Low priority courses

---

## Quick Start Mode

### Overview
Try Timetablely without creating an account - perfect for testing and simple timetables.

### Features

**Data Entry:**
- Add up to 12 tutors
- Add up to 11 courses
- Editable class name (default: "My Class")
- Email field for tutors (optional)

**Timetable Creation:**
- Up to 12 time columns
- Full grid editing capabilities
- Cell merging
- Background colors
- Text formatting (alignment, orientation)

**Time Management:**
- Adjustable default slot duration (5-480 minutes)
- Individual column duration editing
- Real-time time label updates

**Generation:**
- 2 automated generations per browser session
- Session-based usage tracking
- Resets when tab/window closes

**Export:**
- Standard PDF export (free)
- Premium PDF export (redirects to signup)
- Includes class name in export

### Limitations

**Quick Start Restrictions:**
- No data persistence (lost on refresh)
- Limited to 12 tutors
- Limited to 11 courses
- Limited to 12 columns
- 2 generations per session
- No AI-powered generation
- Cannot save templates
- Standard PDF export only

**Upgrade Benefits:**
- Unlimited tutors, courses, columns
- Unlimited generations
- Data persistence and saving
- AI-powered generation
- Template management
- Premium PDF exports
- Multiple timetables

---

## Timetable Grid

### Grid Structure

**Layout:**
- 5 rows (days: Monday-Friday)
- Customizable columns (time slots)
- Sticky headers for easy navigation
- Responsive design

**Cell States:**
- Default (white background)
- Selected (blue highlight)
- Hovered (gray highlight)
- Editing (yellow highlight)
- Merged (green highlight)
- Custom colored (user-defined)

### Cell Operations

**Selection:**
- Single-click to select
- Multi-select for batch operations
- Visual feedback with blue highlight
- Deselect by clicking empty space

**Editing:**
- Double-click to enter edit mode
- Textarea with auto-focus
- Multi-line support (Shift+Enter)
- Save with Enter, cancel with Esc
- Blur to auto-save

**Formatting:**
- **Text Orientation:** Horizontal or Vertical (90° rotation)
- **Alignment:** Left, Center, Right
- **Background Color:** 10 preset colors + custom picker
- **Multi-line:** Course name + tutor name format

**Merging:**
- Select rectangular cell range
- Click "Merge Cells" button
- Creates single large cell
- Useful for double periods
- Shows dimensions (e.g., "2×3")

**Cell Menu:**
- Appears on hover (three-dot icon)
- Edit text
- Toggle orientation
- Set alignment
- Choose background color
- Clear color

### Column Management

**Column Headers:**
- Display time range (e.g., "8:00-8:45")
- Hover to show menu
- Edit duration
- Add column after
- Delete column (min 1 required)

**Duration Control:**
- Default duration for new columns
- Individual column durations
- Range: 5-480 minutes
- Real-time label updates

**Column Operations:**
- **Add:** Insert new time slot
- **Delete:** Remove time slot
- **Edit:** Change duration
- **Reorder:** Not yet implemented

### Batch Operations

**Color Multiple Cells:**
1. Select multiple cells
2. Click "Color Selected Cells"
3. Choose from palette
4. All cells update instantly

**Merge Multiple Cells:**
1. Select rectangular range
2. Click "Merge Cells"
3. Creates single merged cell

---

## Database Management

### Tutors

**Fields:**
- Name (required)
- Email (optional)
- Subjects (array)
- Max periods per day (optional)
- Unavailable slots (optional)

**Operations:**
- Add new tutor
- Edit tutor details
- Delete tutor
- View tutor schedule
- Set availability

**Quick Start:**
- Limited to 12 tutors
- Name and email only
- No persistence

### Courses

**Fields:**
- Name (required)
- Teacher ID (required)
- Periods per week (required)
- Priority (HIGH/MEDIUM/LOW)
- Duration (optional, overrides default)
- Preferred slots (optional)
- Avoid consecutive (optional)

**Priority Levels:**
- **HIGH:** Scheduled first, best time slots
- **MEDIUM:** Scheduled after high priority
- **LOW:** Scheduled last, fills remaining slots

**Operations:**
- Add new course
- Edit course details
- Delete course
- Assign to tutor
- Set scheduling preferences

**Quick Start:**
- Limited to 11 courses
- Basic fields only
- No persistence

### Sessions (Classes)

**Fields:**
- Name (required, e.g., "Grade 10A")
- Subjects (array of course IDs)

**Purpose:**
- Organize timetables by class group
- Generate class-specific timetables
- Track which courses belong to which class

**Operations:**
- Add new session
- Edit session details
- Delete session
- Assign courses
- Generate session timetable

**Quick Start:**
- Not available (removed for simplicity)
- Use class name input instead

### Special Blocks

**Purpose:**
- Define recurring non-teaching periods
- Prevent scheduling in blocked times
- Maintain consistent break schedules

**Common Blocks:**
- Morning break
- Lunch period
- Assembly
- Devotion
- Sports/PE
- Study hall

**Operations:**
- Add block name
- Use in timetable cells
- Excluded from auto-generation

---

## Automated Generation

### Standard Generation

**Algorithm:**
- Rule-based scheduling
- Priority-first approach
- Conflict avoidance
- Even distribution

**Process:**
1. Sort courses by priority
2. Schedule high-priority first
3. Check tutor availability
4. Avoid conflicts
5. Distribute evenly across week
6. Fill remaining slots

**Constraints:**
- Tutor availability
- Max periods per day per tutor
- Blocked cells (breaks, lunch)
- Periods per week per course
- No tutor double-booking

**Limitations:**
- May not find optimal solution
- Simple conflict resolution
- Limited constraint handling

### AI-Powered Generation

**Technology:**
- Google Gemini AI
- Natural language processing
- Intelligent optimization

**Advantages:**
- Better conflict resolution
- More balanced schedules
- Considers complex constraints
- Produces optimal timetables

**Requirements:**
- Authenticated user account
- Google Gemini API key
- Internet connection

**Setup:**
1. Get API key from Google AI Studio
2. Click "Generate with AI"
3. Enter API key (saved locally)
4. Generate timetable

**Features:**
- Smarter course distribution
- Better tutor workload balancing
- Fewer manual adjustments needed
- Handles edge cases

**Availability:**
- Not available in Quick Start mode
- Requires authentication
- API key stored in localStorage

---

## Templates

### Overview
Save and reuse timetable layouts for efficiency.

### What Templates Save

**Grid Structure:**
- Column count
- Column durations
- Default slot duration

**Cell Data:**
- Cell contents (text)
- Merged cells
- Hidden cells
- Cell formatting (alignment, orientation)
- Background colors

**Metadata:**
- Template name
- Description (optional)
- Creation date
- Template ID

### Operations

**Save Template:**
1. Create/edit timetable
2. Click "Save as Template"
3. Enter name and description
4. Template saved to database

**Apply Template:**
1. Browse templates
2. Click "Apply"
3. Template loads into grid
4. Existing content replaced

**Manage Templates:**
- View all templates
- Edit template details
- Delete unused templates
- Duplicate for variations

**Availability:**
- Not available in Quick Start mode
- Requires authentication
- Stored in user database

---

## Export Options

### PDF Export

**Standard (Free):**
- Basic layout
- Black and white or color
- Includes all content
- Suitable for printing
- Available in Quick Start

**Premium (Paid):**
- Enhanced design
- Professional styling
- Additional customization
- Better formatting
- Requires paid account

**Export Process:**
1. Complete timetable
2. Click "Export PDF"
3. Choose Standard or Premium
4. PDF generates and downloads
5. Open in PDF viewer

**PDF Contents:**
- Timetable title
- Time slot headers
- Day labels
- All cell content
- Merged cells
- Colors (if supported)

**Customization:**
- Title (class name)
- Subtitle
- Page orientation
- Font sizes

### JSON Export

**Purpose:**
- Data backup
- System integration
- Custom processing
- Analysis

**Export Process:**
1. Click "Export JSON"
2. Data copies to clipboard
3. Also logged to console
4. Paste to save

**JSON Structure:**
```json
{
  "entries": [
    {
      "row": 0,
      "col": 0,
      "day": "Monday",
      "cellKey": "0-0",
      "timeSlot": "8:00-8:45",
      "customText": "Mathematics",
      "teacher": {...},
      "subject": {...}
    }
  ],
  "columnCount": 12,
  "defaultSlotDuration": 45,
  "columnDurations": {...}
}
```

---

## User Interface

### Design System

**Framework:**
- React + TypeScript
- Tailwind CSS
- Shadcn/ui components
- Lucide icons

**Theme:**
- Light mode (default)
- Dark mode support
- System preference detection
- Smooth transitions

**Responsive:**
- Desktop optimized
- Tablet compatible
- Mobile friendly (limited)
- Adaptive layouts

### Navigation

**Public Routes:**
- `/` - Landing page with hero
- `/quick-start` - Try without signup
- `/auth/login` - Sign in
- `/auth/signup` - Create account

**Protected Routes:**
- `/app/dashboard` - Overview
- `/app/tutors` - Manage tutors
- `/app/courses` - Manage courses
- `/app/sessions` - Manage sessions
- `/app/timetables` - Main timetable view
- `/app/templates` - Template management
- `/app/special-blocks` - Define blocks
- `/app/walkthrough` - Help guide
- `/app/settings` - User settings

### Components

**Reusable:**
- GridCell - Interactive timetable cell
- GridHeader - Column header with menu
- GridControls - Action buttons
- DatabaseManager - Data overview
- TemplateManager - Template operations

**UI Elements:**
- Buttons (primary, outline, destructive)
- Inputs (text, number, color)
- Selects (dropdown menus)
- Dialogs (modals)
- Cards (content containers)
- Tables (data display)

### Interactions

**Hover Effects:**
- Cell highlighting
- Button state changes
- Menu appearances
- Tooltip displays

**Click Actions:**
- Cell selection
- Button triggers
- Menu toggles
- Navigation

**Keyboard:**
- Enter to save
- Escape to cancel
- Shift+Enter for new line
- Tab navigation

---

## Authentication

### User Accounts

**Sign Up:**
- Email and password
- Google OAuth (optional)
- Email verification
- Profile creation

**Sign In:**
- Email/password login
- Google sign-in
- Remember me option
- Password reset

**Session Management:**
- Token-based auth
- Session storage
- Auto-logout on close
- Persistent login option

### Protected Features

**Requires Authentication:**
- Data persistence
- Template management
- AI generation
- Premium PDF export
- Multiple timetables
- Settings and preferences

**Public Access:**
- Landing page
- Quick Start mode
- Standard PDF export
- Basic timetable creation

---

## Upcoming Features

### Planned Enhancements

**Grid Features:**
- Drag and drop cells
- Copy/paste cells
- Undo/redo functionality
- Cell comments/notes
- Room assignment tracking

**Generation:**
- Custom constraints
- Multi-week schedules
- Rotation schedules
- Conflict highlighting
- Optimization suggestions

**Export:**
- Excel export
- CSV export
- iCal format
- Google Calendar integration
- Print optimization

**Collaboration:**
- Share timetables
- Team editing
- Comments and feedback
- Version history
- Change tracking

**Mobile:**
- Native mobile app
- Offline support
- Touch gestures
- Mobile-optimized UI

**Analytics:**
- Tutor workload reports
- Room utilization
- Schedule efficiency
- Conflict analysis
- Usage statistics

---

## Technical Specifications

### Technology Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS

**State Management:**
- React hooks (useState, useEffect)
- Custom hooks (useGridState, useStorage)
- Zustand (database store)
- Session/Local storage

**UI Components:**
- Shadcn/ui
- Radix UI primitives
- Lucide icons
- Tabler icons

**Utilities:**
- UUID generation
- PDF generation (jsPDF)
- Date/time handling
- JSON processing

**Typography:**
- 21 custom fonts loaded
- Font utility classes
- Web font optimization
- Fallback font stacks

### Available Fonts

The application includes 21 professionally selected fonts for various use cases:

**Display & Headings:**
- **Audiowide** - Bold, futuristic display font
- **Orbitron** - Geometric, tech-inspired
- **Michroma** - Modern, clean display
- **Syncopate** - Condensed, impactful
- **Tektur** - Technical, structured
- **Goldman** - Bold, attention-grabbing
- **Zen Tokyo Zoo** - Playful, unique

**Body & UI:**
- **Montserrat** - Clean, versatile sans-serif (default)
- **Nunito Sans** - Friendly, readable
- **Titillium Web** - Modern, professional
- **Mozilla Text** - Optimized for readability
- **Oswald** - Condensed, efficient

**Monospace:**
- **Fira Code** - Code-friendly with ligatures

**Decorative:**
- **CalSans** - Stylish, contemporary
- **Rubik Distressed** - Textured, vintage
- **Rubik Moonrocks** - Playful, textured
- **Special Gothic Expanded One** - Wide, bold
- **Winky Rough** - Hand-drawn feel
- **Tagesschrift** - Newspaper-style

**Script & Calligraphy:**
- **Snell BT** - Elegant script
- **Desirable Calligraphy** - Formal, decorative

**Usage:**
```tsx
// CSS Class
<h1 className="orbitron">Timetablely</h1>

// Inline Style
<p style={{ fontFamily: 'Montserrat' }}>Text</p>

// Tailwind
<div className="font-['Nunito_Sans']">Content</div>
```

### Browser Support

**Recommended:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Features:**
- ES6+ JavaScript
- CSS Grid
- Flexbox
- Local/Session Storage
- Modern APIs

---

## Feature Comparison

### Quick Start vs Full Access

| Feature | Quick Start | Authenticated |
|---------|-------------|---------------|
| Tutors | 12 max | Unlimited |
| Courses | 11 max | Unlimited |
| Columns | 12 max | Unlimited |
| Generations | 2/session | Unlimited |
| Data Persistence | ❌ | ✅ |
| Templates | ❌ | ✅ |
| AI Generation | ❌ | ✅ |
| Premium PDF | ❌ | ✅ |
| Multiple Timetables | ❌ | ✅ |
| Cell Coloring | ✅ | ✅ |
| Cell Merging | ✅ | ✅ |
| Time Duration | ✅ | ✅ |
| Standard PDF | ✅ | ✅ |

---

**Version:** 2.0  
**Last Updated:** November 2024  
**Platform:** Web Application  
**License:** Proprietary
