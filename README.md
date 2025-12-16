# Feedback Viewer - Gauz24

A modern, interactive feedback analysis dashboard built with Next.js, React, and Supabase. Features include 3D backgrounds, dark/light theme support, and advanced heatmap visualizations.

## 🚀 Features

- **Interactive Feedback Viewer**: Browse and analyze customer feedback with detailed breakdowns
- **Advanced Heatmap Visualization**: View sentiment patterns across themes and intents
- **Individual & Aggregate Views**: Switch between single feedback analysis and aggregate patterns
- **3D Background Effects**: Powered by React Three Fiber for immersive UI
- **Dark/Light Theme**: Seamless theme switching with next-themes
- **Responsive Design**: Built with Tailwind CSS for all screen sizes
- **Type-Safe**: Full TypeScript support

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd feedback-viewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application expects the following Supabase tables:

### `feedbacks`
- `id` (uuid, primary key)
- `feedback_id` (text, unique)
- `clean_text` (text)
- `clean_text_confidence` (numeric)
- `one_liner_summary` (text)
- `one_liner_summary_confidence` (numeric)
- `feedback_language` (text)
- `feedback_language_confidence` (numeric)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `reasons`
- `id` (uuid, primary key)
- `feedback_id` (text, foreign key → feedbacks.feedback_id)
- `extracted_reason_text` (text)
- `reason_label` (text)
- `reason_label_confidence` (numeric)
- `theme_label` (text)
- `theme_confidence` (numeric)
- `reason_sentiment_score` (numeric)
- `reason_sentiment_score_confidence` (numeric)
- `reason_intent` (text)
- `reason_intent_confidence` (numeric)
- `reason_evidence_snippets` (text[])
- `reason_evidence_snippets_confidence` (numeric)
- `reason_suggested_action` (text)
- `reason_order` (integer)

### `emotion_scores`
- `id` (uuid, primary key)
- `reason_id` (uuid, foreign key → reasons.id)
- `anger` (numeric)
- `frustration` (numeric)
- `sadness` (numeric)
- `joy` (numeric)
- `sarcasm` (numeric)
- `emotion_confidence` (numeric)

### `entities`
- `id` (uuid, primary key)
- `reason_id` (uuid, foreign key → reasons.id)
- `entity_text` (text)
- `entity_type` (text)
- `entity_confidence` (numeric)
- `entity_order` (integer)

### `provenance`
- `id` (uuid, primary key)
- `feedback_id` (text, foreign key → feedbacks.feedback_id)
- `source_type` (text)
- `source_id` (text)
- `source_url` (text)
- `collected_at` (timestamp)

## 📁 Project Structure

```
feedback-viewer/
├── app/                        # Next.js App Router
│   ├── api/                   # API routes
│   │   ├── feedback/         # Single/random feedback endpoint
│   │   └── feedbacks/        # All feedbacks endpoint
│   ├── heatmap/              # Heatmap page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   ├── feedback/             # Feedback display components
│   ├── heatmap/              # Heatmap visualization components
│   ├── theme/                # Theme provider and toggle
│   └── ui/                   # Reusable UI components
├── hooks/                     # Custom React hooks
├── lib/                       # Utility libraries (Supabase, etc.)
├── types/                     # TypeScript type definitions
├── utils/                     # Helper functions
├── public/                    # Static assets
└── .env.example              # Environment variables template
```

## 🎨 Key Components

- **FeedbackViewer**: Main component for displaying individual feedback
- **HeatmapVisualization**: Interactive heatmap for sentiment analysis
- **BackgroundScene3D**: Animated 3D background with particles
- **ThemeToggle**: Dark/light mode switcher

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Intent Icons

The heatmap uses specific icons for different intent types:
- ⚡ **app_performance** - Performance issues
- ⭐ **value_delivery** - Value and delivery
- 💡 **feature_content** - Feature requests
- 🔐 **login_latent** - Login issues
- 💳 **payment_latent** - Payment problems
- 📦 **poor_packaging** - Packaging concerns
- 🩺 **service_quality** - Service quality feedback

## 📊 Heatmap Features

- **Sentiment Color Coding**: Red (negative) to Green (positive)
- **Size Variants**: Based on evidence count (small, medium, large)
- **Interactive Tooltips**: Hover for detailed information
- **Theme Grouping**: Left-side categorization
- **Responsive Grid**: CSS Grid-based layout

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## 🚨 Security Notes

- Never commit `.env.local` to version control
- The `.env.example` file is provided as a template
- Supabase keys should be kept secure and not shared publicly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of Gauz24 and is proprietary software.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI powered by [Tailwind CSS](https://tailwindcss.com/)
- 3D effects by [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- Database by [Supabase](https://supabase.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Gauz24** - Modern Feedback Analytics Platform
