# Timetablely Usage Guide

Welcome to Timetablely! This guide will help you create and manage school timetables efficiently.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Quick Start Mode](#quick-start-mode)
3. [Database Setup](#database-setup)
4. [Managing Tutors](#managing-tutors)
5. [Managing Courses](#managing-courses)
6. [Managing Sessions (Classes)](#managing-sessions-classes)
7. [Working with the Timetable Grid](#working-with-the-timetable-grid)
8. [Time Duration Settings](#time-duration-settings)
9. [Cell Formatting](#cell-formatting)
10. [Automated Generation](#automated-generation)
11. [Templates](#templates)
12. [Special Blocks](#special-blocks)
13. [Exporting Timetables](#exporting-timetables)
14. [Tips & Best Practices](#tips--best-practices)

---

## Getting Started

### First Steps

1. Visit the Timetablely landing page
2. Choose your path:
   - **Quick Start** - Try immediately without signup (limited features)
   - **Sign Up** - Create account for full access
3. Start building your timetable

### Navigation

**Public Access:**

- **Landing Page** - Introduction and features
- **Quick Start** - Try the app without signup

**Authenticated Users:**

- **Dashboard** (`/app/dashboard`) - Overview and quick actions
- **Tutors** (`/app/tutors`) - Manage teaching staff
- **Courses** (`/app/courses`) - Manage subjects/courses
- **Sessions** (`/app/sessions`) - Manage classes/groups
- **Timetables** (`/app/timetables`) - View and edit timetables
- **Templates** (`/app/templates`) - Save and load timetable layouts
- **Special Blocks** (`/app/special-blocks`) - Define breaks, lunch, assemblies
- **Walkthrough** (`/app/walkthrough`) - In-app help guide
- **Settings** (`/app/settings`) - Account and preferences

---

## Quick Start Mode

### What is Quick Start?

Quick Start allows you to try Timetablely without creating an account. Perfect for:

- Testing the app before committing
- Creating simple timetables quickly
- Learning how the system works

### Quick Start Features

**Available:**

- Add up to 12 tutors
- Add up to 11 courses
- Create up to 12 time columns
- Generate timetable (2 times per session)
- Edit cells, merge, and color
- Export to PDF (Standard format)
- Adjust time durations
- Editable class name

**Limitations:**

- No data persistence (lost on page refresh)
- Limited generations per session
- Standard PDF export only
- No AI-powered generation
- Cannot save templates

### Using Quick Start

1. Click **Quick Start** on landing page
2. Enter a class name (default: "My Class")
3. Add tutors with names and emails
4. Add courses and assign tutors
5. Set time durations if needed
6. Click **Generate** to create timetable
7. Edit, merge, and color cells as needed
8. Export to PDF when done

### Upgrading from Quick Start

When ready for full features:

1. Click **Sign Up** button
2. Create your account
3. Access unlimited features
4. Save and manage multiple timetables

---

---

## Database Setup

Before creating timetables, set up your database with:

1. **Tutors** - Add all teaching staff
2. **Courses** - Define all subjects to be taught
3. **Sessions** - Create class groups
4. **Special Blocks** - Define recurring breaks/events

Complete database setup ensures accurate automated timetable generation.

---

## Managing Tutors

### Adding a Tutor

1. Navigate to **Tutors** section
2. Click **Add Tutor** or **Quick Create**
3. Enter tutor details:
   - Name
   - Maximum periods per day
   - Availability preferences

### Setting Availability

- Mark unavailable time slots to prevent scheduling conflicts
- Set maximum teaching periods per day
- Define preferred teaching times (optional)

### Editing/Deleting

- Click on a tutor to edit details
- Use delete option to remove tutors no longer needed

---

## Managing Courses

### Creating a Course

1. Go to **Courses** section
2. Click **Add Course**
3. Fill in course details:
   - Course name
   - Assigned tutor
   - Periods per week
   - Priority level (HIGH, MEDIUM, LOW)

### Priority Levels

- **HIGH** - Scheduled first, gets optimal time slots
- **MEDIUM** - Scheduled after high-priority courses
- **LOW** - Scheduled last, fills remaining slots

### Advanced Options

- Set preferred time slots
- Avoid consecutive periods (if needed)
- Assign multiple tutors (if supported)

---

## Managing Sessions (Classes)

### Creating a Session

1. Navigate to **Sessions** section
2. Click **Add Session**
3. Enter session details:
   - Class name (e.g., "Grade 10A", "Form 3B")
   - Assign relevant courses

### Assigning Courses

- Each session can have multiple courses
- Select courses from your course database
- Sessions help organize timetables by class groups

---

## Working with the Timetable Grid

### Grid Overview

The timetable grid displays:

- **5 days** - Monday through Friday (rows)
- **Customizable time slots** - Adjustable duration (columns)
- **Interactive cells** - Click, edit, merge, and color
- **Responsive design** - Works on desktop and tablet

### Basic Cell Operations

#### Selecting Cells

- **Single click** - Select a cell (turns blue)
- **Click multiple cells** - Select multiple cells for batch operations
- **Click empty space** - Deselect all

#### Editing Cell Content

- **Double-click** a cell to edit
- Type your content (supports multi-line with Shift+Enter)
- Press **Enter** to save or **Esc** to cancel
- Content can include course names, tutor names, or custom text

#### Cell Menu

- Hover over a cell with content
- Click the three-dot menu icon
- Access formatting options:
  - Edit text
  - Toggle vertical/horizontal orientation
  - Set alignment (left, center, right)
  - Change background color
  - Clear color

### Merging Cells

1. Select multiple cells forming a rectangle
2. Click **Merge Cells** button in controls
3. Merged cells create larger time blocks
4. Useful for:
   - Double periods
   - Extended activities
   - Lunch breaks
   - Assembly time

### Column Controls

#### Accessing Column Menu

- Hover over any time header
- Click the three-dot menu icon that appears

#### Column Operations

- **Edit Duration** - Change specific time slot length
- **Add Column** - Insert new time slot after current
- **Delete Column** - Remove time slot (minimum 1 required)

### Grid Controls Panel

Located in the sidebar or above the grid:

- **Default Slot Duration** - Set duration for new columns
- **Merge Cells** - Merge selected rectangular cells
- **Color Selected Cells** - Apply colors to multiple cells at once
- **Export JSON** - Export timetable data
- **Export PDF** - Generate PDF document
- **Reset Grid** - Clear all content and start fresh

---

## Time Duration Settings

### Default Slot Duration

Set the default time length for all new columns:

1. Find **Time Settings** card (or Default Duration control)
2. Click **Edit** button
3. Enter duration in minutes (5-480)
4. Press **Enter** or click save (✓)
5. All new columns will use this duration

**Common Durations:**

- 30 minutes - Short periods
- 40 minutes - Standard periods
- 45 minutes - Common in many schools
- 60 minutes - Hour-long classes

### Individual Column Duration

Customize specific time slots:

1. Hover over column header
2. Click three-dot menu
3. Select **Edit Duration**
4. Enter custom duration
5. Press **Enter** to save

**Use Cases:**

- Shorter morning periods
- Extended lab sessions
- Flexible lunch periods
- Variable activity times

### Time Labels

- Automatically calculated based on durations
- Start time + duration = end time
- Displayed in column headers
- Updates in real-time when durations change

---

## Cell Formatting

### Background Colors

**Individual Cell:**

1. Hover over cell
2. Click three-dot menu
3. Scroll to "Background Color"
4. Choose from preset colors or use custom color picker
5. Click "Clear Color" to remove

**Multiple Cells:**

1. Select multiple cells
2. Click **Color Selected Cells** in controls
3. Choose color from palette
4. All selected cells update instantly

**Color Palette:**

- White, Gray, Yellow, Red, Orange
- Green, Blue, Purple, Pink, Light Pink
- Custom colors via color picker

### Text Orientation

Toggle between horizontal and vertical text:

1. Open cell menu (three-dot icon)
2. Click **Vertical** or **Horizontal**
3. Text rotates 90 degrees
4. Useful for narrow columns or long text

### Text Alignment

Set text alignment within cells:

1. Open cell menu
2. Choose alignment:
   - **Left** - Text aligns to left edge
   - **Center** - Text centers (default)
   - **Right** - Text aligns to right edge

### Multi-line Text

- Press **Shift+Enter** while editing to add line breaks
- Useful for displaying:
  - Course name on first line
  - Tutor name on second line (in parentheses)
  - Room number or notes

---

## Automated Generation

### Standard Generation

**Requirements:**

- At least one tutor added
- At least one course created
- Courses assigned to tutors

**Steps:**

1. Navigate to **Timetables** section
2. Click **Generate** button
3. Choose:
   - Generate for all sessions
   - Generate for specific session
4. System automatically fills timetable

**Algorithm:**

- Schedules high-priority courses first
- Respects tutor availability
- Honors blocked cells (breaks, lunch)
- Avoids tutor conflicts
- Distributes courses evenly across the week
- Considers maximum periods per day per tutor

### AI-Powered Generation

**Available for:** Authenticated users with API key

**Features:**

- Intelligent scheduling optimization
- Better conflict resolution
- Considers more constraints
- Produces more balanced timetables

**Setup:**

1. Get Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Generate with AI** button
3. Enter API key when prompted
4. Key is saved locally for future use

**Benefits:**

- Smarter course distribution
- Better tutor workload balancing
- Fewer manual adjustments needed
- Handles complex scheduling scenarios

### After Generation

- Review the generated timetable
- Make manual adjustments by double-clicking cells
- Apply colors for visual organization
- Save as template for future use
- Export to PDF or JSON

### Generation Limits

**Quick Start Mode:**

- 2 generations per browser session
- Resets when you close the tab

**Authenticated Users:**

- Unlimited generations
- No session restrictions

---

## Templates

### Saving a Template

1. Create or edit a timetable layout
2. Click **Save as Template**
3. Enter:
   - Template name
   - Description (optional)
4. Click **Save**

### What Templates Save

- Cell contents
- Merged cells
- Grid layout
- Column durations
- Special formatting

### Applying a Template

1. Go to **Templates** section
2. Browse saved templates
3. Click **Apply** on desired template
4. Template loads into current timetable

### Managing Templates

- **Edit** - Update template details
- **Delete** - Remove unused templates
- **Duplicate** - Create variations

---

## Special Blocks

### Purpose

Special blocks define recurring non-teaching periods:

- Breaks
- Lunch
- Assembly
- Devotion
- Sports
- Custom events

### Adding Special Blocks

1. Navigate to **Special Blocks** section
2. Click **Add Block**
3. Enter block name (e.g., "Lunch", "Break")
4. Save

### Using Special Blocks

- When editing timetable, type block name in cells
- Blocked cells are excluded from automated scheduling
- Helps maintain consistent break times

### Common Blocks

- Morning break
- Lunch period
- Assembly time
- Sports/PE periods
- Study hall
- Homeroom

---

## Tips & Best Practices

### Before You Start

- Complete database setup before generating timetables
- Verify tutor availability is accurate
- Set realistic maximum periods per tutor
- Define all special blocks upfront

### Scheduling Strategy

- Use HIGH priority for core subjects
- Set MEDIUM priority for important electives
- Use LOW priority for flexible courses
- Mark tutor unavailability to avoid conflicts

### Working Efficiently

- Save frequently used layouts as templates
- Use merge cells for double periods
- Double-click for quick manual edits
- Export timetables regularly for backup

### Optimization

- Balance tutor workload across days
- Avoid scheduling difficult subjects late in the day
- Leave buffer periods for flexibility
- Consider student attention spans when placing subjects

### Troubleshooting

**Generation fails or incomplete:**

- Check tutor availability
- Verify course periods per week are realistic
- Ensure enough time slots available
- Reduce maximum periods per tutor if needed

**Conflicts after generation:**

- Manually adjust by double-clicking cells
- Check for tutor double-booking
- Verify special blocks are properly set

**Layout issues:**

- Reset grid and start fresh
- Apply a template as starting point
- Adjust column durations for consistency

---

## Keyboard Shortcuts

(If implemented in future versions)

- **Ctrl + S** - Save timetable
- **Ctrl + Z** - Undo
- **Ctrl + Y** - Redo
- **Delete** - Clear selected cells
- **Esc** - Cancel editing
- **Enter** - Save cell edit

---

## Exporting Timetables

### PDF Export

**Standard Export (Free):**

- Basic layout and formatting
- Includes all timetable content
- Suitable for printing
- Available in Quick Start mode

**Premium Export (Paid):**

- Enhanced design and styling
- Professional appearance
- Additional customization options
- Requires paid account

**Steps to Export:**

1. Complete your timetable
2. Click **Export PDF** button
3. Choose export type (Standard or Premium)
4. PDF downloads automatically
5. Open and print or share

**PDF Contents:**

- Timetable title (class name)
- All time slots and days
- Cell content with formatting
- Colors (if supported by viewer)
- Merged cells properly displayed

### JSON Export

Export timetable data for:

- Backup purposes
- Integration with other systems
- Data analysis
- Custom processing

**Steps:**

1. Click **Export JSON** button
2. Data copies to clipboard
3. Also logged to browser console
4. Paste into text editor to save

**JSON Structure:**

- Cell positions and content
- Time slot information
- Merged cell data
- Formatting details

---

## Tips & Best Practices

### Before You Start

- **Quick Start Users:** Remember your data isn't saved - export when done
- Complete database setup before generating timetables
- Verify tutor availability is accurate
- Set realistic maximum periods per tutor
- Define all special blocks upfront

### Scheduling Strategy

- Use **HIGH** priority for core subjects (Math, English, Science)
- Set **MEDIUM** priority for important electives
- Use **LOW** priority for flexible courses
- Mark tutor unavailability to avoid conflicts
- Balance difficult subjects throughout the day

### Working Efficiently

- **Use Colors:** Organize by subject type or department
- **Save Templates:** Reuse successful layouts
- **Merge Cells:** Create double periods for labs or activities
- **Quick Edit:** Double-click for fast manual adjustments
- **Export Regularly:** Backup your work frequently

### Time Management

- Set appropriate default duration (usually 40-45 minutes)
- Adjust individual columns for special periods
- Account for passing time between classes
- Include buffer periods for flexibility
- Consider student attention spans when scheduling

### Optimization

- Balance tutor workload across days
- Avoid scheduling difficult subjects late in the day
- Distribute popular tutors evenly
- Leave some free periods for planning
- Consider room availability (if tracking)

### Quick Start Specific

- **Work within limits:** 12 tutors, 11 courses, 12 columns
- **Use generations wisely:** Only 2 per session
- **Export before leaving:** Data doesn't persist
- **Sign up when ready:** Unlock unlimited features

### Troubleshooting

**Generation fails or incomplete:**

- Check tutor availability
- Verify course periods per week are realistic
- Ensure enough time slots available
- Reduce maximum periods per tutor if needed
- Try AI generation for complex scenarios

**Conflicts after generation:**

- Manually adjust by double-clicking cells
- Check for tutor double-booking
- Verify special blocks are properly set
- Use colors to identify conflicts visually

**Layout issues:**

- Reset grid and start fresh
- Apply a template as starting point
- Adjust column durations for consistency
- Check merged cells aren't causing problems

**Quick Start limitations:**

- Reached tutor limit? Sign up for unlimited
- Used all generations? Close and reopen tab (new session)
- Need to save? Create an account
- Want AI generation? Requires authentication

---

## Keyboard Shortcuts

**Cell Editing:**

- **Enter** - Save cell edit
- **Esc** - Cancel editing
- **Shift+Enter** - New line in cell

**Duration Editing:**

- **Enter** - Save duration
- **Esc** - Cancel duration edit

**Navigation:**

- **Click** - Select cell
- **Double-click** - Edit cell
- **Hover** - Show cell menu

---

## Support & Feedback

For additional help:

- Use the in-app **Walkthrough** guide
- Check the Dashboard for quick tips
- Try **Quick Start** to learn the basics
- Review generated timetables carefully before finalizing
- Export frequently to avoid data loss

### Getting Help

- **Quick Start Users:** All features are self-explanatory with tooltips
- **Authenticated Users:** Access full documentation in app
- **Technical Issues:** Check browser console for errors
- **Feature Requests:** Contact through app settings

---

**Version:** 2.0  
**Last Updated:** November 2024  
**New in 2.0:** Quick Start mode, Cell coloring, Time duration controls, Enhanced PDF export
