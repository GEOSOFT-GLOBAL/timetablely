# AI Timetable Generation with Gemini AI

This feature allows you to generate optimal timetables using Google's Gemini AI.

## Setup

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure the API Key

You have two options:

#### Option A: Through the UI (Recommended)

1. Navigate to the Timetables page
2. Click the "AI Generate" button
3. Enter your API key in the dialog
4. Click "Save & Generate"

Your API key will be saved in your browser's localStorage for future use.

#### Option B: Environment Variable

1. Create a `.env.local` file in the project root
2. Add your API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

## How It Works

The AI timetable generator:

1. **Analyzes Your Data**: Reads your subjects, teachers, and constraints
2. **Optimizes Schedule**: Uses AI to create an optimal weekly timetable
3. **Respects Constraints**:

   - Teacher availability and max periods per day
   - Subject priority levels (HIGH, MEDIUM, LOW)
   - Required periods per week for each subject
   - Blocked time slots (breaks, lunch, etc.)
   - Avoids consecutive periods when specified

4. **Smart Distribution**:
   - High-priority subjects get better time slots
   - Subjects are distributed evenly across the week
   - Teachers are not overloaded

## Usage

1. **Add Your Data**:

   - Add tutors (teachers) with their availability
   - Add courses (subjects) with periods per week and priority
   - Add sessions (classes) if needed

2. **Generate Timetable**:

   - Click "AI Generate" button
   - Wait for AI to process (usually 5-10 seconds)
   - Review the generated timetable

3. **Regenerate if Needed**:
   - Click "AI Generate" again for a different arrangement
   - The AI may produce different optimal solutions

## Comparison: AI vs Regular Generation

### AI Generation

- **Pros**:
  - More intelligent optimization
  - Better handling of complex constraints
  - Considers multiple factors simultaneously
  - Can produce more balanced schedules
- **Cons**:
  - Requires API key
  - Takes a few seconds to generate
  - Requires internet connection
  - May have API usage limits

### Regular Generation

- **Pros**:
  - Instant generation
  - No API key required
  - Works offline
  - No usage limits
- **Cons**:
  - Uses simpler algorithm
  - May not handle complex constraints as well

## Troubleshooting

### "Rate limit exceeded"

This means you've made too many requests in a short time:

- **Free Tier Limits**: 15 requests per minute, 1,500 per day
- **Solution**: Wait 30-60 seconds and try again
- **Alternative**: Use the regular "Generate" button (no AI, instant)
- **Long-term**: Consider upgrading to a paid plan for higher limits

### "AI Generation Failed"

- Check your API key is correct
- Ensure you have internet connection
- Verify your API key has not exceeded quota
- Try again in a few moments

### "Invalid API key"

- Double-check you copied the entire API key
- Make sure there are no extra spaces
- Generate a new API key from Google AI Studio if needed

### "Please add subjects to the database first"

- You need to add at least one subject before generating

### Unexpected Results

- Ensure all your data is correct (teacher availability, periods per week, etc.)
- Check that blocked slots are properly marked
- Try regenerating for a different arrangement

## API Key Security

- Your API key is stored locally in your browser
- It is never sent to any server except Google's Gemini API
- You can clear it anytime by clearing browser localStorage
- For production use, consider implementing server-side API key management

## Cost & Rate Limits

- **Free Tier**: 15 requests per minute, 1,500 requests per day
- Gemini API has a free tier with generous limits
- Check [Google AI Pricing](https://ai.google.dev/pricing) for current rates
- Typical timetable generation uses minimal tokens
- If you hit rate limits, wait 30-60 seconds or use regular generation

## Support

For issues or questions:

- Check the console for detailed error messages
- Ensure your database has valid data
- Try the regular generation first to verify your data is correct
