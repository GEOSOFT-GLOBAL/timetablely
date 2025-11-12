# Timetablely Usage Guide

Welcome to Timetablely! This guide will help you create and manage school timetables efficiently.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Database Setup](#database-setup)
3. [Managing Tutors](#managing-tutors)
4. [Managing Courses](#managing-courses)
5. [Managing Sessions (Classes)](#managing-sessions-classes)
6. [Working with the Timetable Grid](#working-with-the-timetable-grid)
7. [Automated Generation](#automated-generation)
8. [Templates](#templates)
9. [Special Blocks](#special-blocks)
10. [Tips & Best Practices](#tips--best-practices)

---

## Getting Started

### First Steps

1. Launch Timetablely in your browser
2. Navigate through the sidebar to access different sections
3. Start by setting up your database (tutors, courses, sessions)
4. Use the Dashboard for quick overview and access

### Navigation

The sidebar provides access to:
- **Dashboard** - Overview and quick actions
- **Tutors** - Manage teaching staff
- **Courses** - Manage subjects/courses
- **Sessions** - Manage classes/groups
- **Timetables** - View and edit timetables
- **Templates** - Save and load timetable layouts
- **Special Blocks** - Define breaks, lunch, assemblies
- **Walkthrough** - In-app help guide

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
- **5 days** - Monday through Friday
- **Customizable time slots** - Adjustable duration
- **Rows** - Time periods
- **Columns** - Days of the week

### Basic Cell Operations

#### Selecting Cells
- **Single click** - Select a cell (turns blue)
- **Click multiple cells** - Select multiple cells
- **Click empty space** - Deselect all

#### Editing Cell Content
- **Double-click** a cell to edit
- Type your content
- Press **Enter** to save or **Esc** to cancel

#### Cell Formatting
- Toggle vertical text orientation
- Set alignment (left, center, right)
- Cells can display course names, tutor names, or custom text

### Merging Cells

1. Select multiple cells forming a rectangle
2. Click **Merge Cells** button in controls
3. Merged cells create larger time blocks
4. Useful for double periods or extended activities

### Column Controls

#### Accessing Column Menu
- Hover over any time header
- Click the menu icon that appears

#### Column Operations
- **Edit Duration** - Change time slot length
- **Add Column** - Insert new time slot after current
- **Delete Column** - Remove time slot

#### Setting Default Duration
- Use grid controls to set default slot duration
- New columns will use this duration
- Common durations: 30, 40, 45, 60 minutes

### Grid Controls Panel

Located above the timetable grid:

- **Default Slot Duration** - Set duration for new columns
- **Merge Cells** - Merge selected rectangular cells
- **Export** - Export timetable data
- **Reset Grid** - Clear all content and start fresh

---

## Automated Generation

### Generating Timetables

1. Ensure database is complete (tutors, courses, sessions)
2. Navigate to **Timetables** section
3. Click **Generate** button
4. Choose:
   - Generate for all sessions
   - Generate for specific session

### How It Works

The automated system:
- Respects tutor availability
- Honors blocked cells (breaks, lunch)
- Schedules high-priority courses first
- Avoids tutor conflicts
- Distributes courses evenly across the week
- Considers maximum periods per day per tutor

### After Generation

- Review the generated timetable
- Make manual adjustments by double-clicking cells
- Save as template for future use

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

## Support & Feedback

For additional help:
- Use the in-app **Walkthrough** guide
- Check the Dashboard for quick tips
- Review generated timetables carefully before finalizing

---

**Version:** 1.0  
**Last Updated:** November 2025
