# PDF Export Feature

Export your timetables as professional PDF documents.

## How to Export

1. Navigate to the **Timetables** page
2. Create or generate your timetable
3. Click the **"Export PDF"** button in the Grid Controls panel
4. The PDF will be automatically downloaded to your device

## PDF Features

### Layout
- **Automatic Orientation**: Portrait for 6 or fewer columns, Landscape for more
- **Professional Formatting**: Clean grid layout with headers and styling
- **Responsive Design**: Adjusts to fit your timetable size

### Content
- **Title**: "Weekly Timetable" (customizable)
- **Subtitle**: "Master Schedule" (optional)
- **Generation Date**: Automatically added
- **Time Slots**: All your configured time periods
- **Days**: Monday through Friday
- **Cell Contents**: All subjects, teachers, and notes

### Styling
- **Color-coded Headers**: Blue headers for easy reading
- **Alternating Rows**: Light gray alternating rows for clarity
- **Bold Day Labels**: Highlighted day column
- **Page Numbers**: Footer with page numbers
- **Professional Fonts**: Clean, readable typography

## Export Options

### JSON Export
- Click **"Export JSON"** for raw data
- Useful for backups or data analysis
- Copies to clipboard and logs to console

### PDF Export
- Click **"Export PDF"** for printable document
- Perfect for distribution and printing
- Professional formatting included

## Use Cases

### For Teachers
- Print and post in classrooms
- Share with students and parents
- Keep physical copies for reference

### For Administrators
- Distribute to staff
- Archive schedules
- Present in meetings

### For Students
- Print personal schedules
- Share with family
- Keep in binders

## Customization

The PDF export can be customized by modifying `src/lib/pdf-export.ts`:

```typescript
exportTimetableToPDF({
  cellContents,
  columnCount,
  columnDurations,
  defaultSlotDuration,
  hiddenCells,
  title: "Your Custom Title",        // Change title
  subtitle: "Your Custom Subtitle",  // Change subtitle
});
```

## Technical Details

- **Library**: jsPDF with autoTable plugin
- **Format**: A4 paper size
- **Quality**: High-resolution output
- **File Size**: Optimized for sharing
- **Compatibility**: Works in all modern browsers

## Troubleshooting

### PDF Not Downloading
- Check browser popup blocker settings
- Ensure JavaScript is enabled
- Try a different browser

### Content Cut Off
- Reduce number of columns if possible
- Use landscape orientation (automatic for 7+ columns)
- Adjust cell content to be more concise

### Formatting Issues
- Ensure all cell contents are properly formatted
- Check that merged cells are correctly configured
- Verify time labels are set correctly

## Tips

1. **Before Exporting**: Review your timetable for accuracy
2. **File Naming**: PDFs are named with timestamp for easy organization
3. **Multiple Exports**: You can export different versions with different settings
4. **Print Settings**: Use "Fit to Page" when printing for best results

## Future Enhancements

Planned features:
- Custom color schemes
- Logo/branding support
- Multiple page layouts
- Export individual class schedules
- Batch export for all classes
