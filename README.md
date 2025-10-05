# Learning Roadmap Platform

A highly interactive and visually engaging frontend for a personalized learning roadmap platform, inspired by Duolingo's gamified approach to learning.

## Features

### 🎯 Core Functionality
- **Onboarding Flow**: Welcome screen, career goal selection, and self-assessment
- **Interactive Roadmap**: Visual skill tree with progress tracking
- **Skill Details**: Resource linking and learning materials
- **Assessment System**: Interactive quizzes with instant feedback
- **Gamification**: Progress bars, streaks, and achievement tracking

### 🎨 Design Highlights
- **Duolingo-inspired UI**: Clean, motivating, and game-like interface
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for engaging transitions
- **Modern Styling**: Tailwind CSS with custom components

### 🛠 Technology Stack
- **React 18**: Modern React with hooks and functional components
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth interactions
- **Lucide React**: Beautiful, customizable icons

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── OnboardingFlow.js    # Multi-step onboarding process
│   ├── Dashboard.js         # Main roadmap view with progress
│   ├── SkillModal.js        # Skill details and resources
│   └── Assessment.js        # Interactive quiz component
├── App.js                   # Main application component
├── index.js                 # React entry point
└── index.css               # Global styles and Tailwind imports
```

## Key Components

### OnboardingFlow
- Welcome screen with platform introduction
- Career path selection with visual cards
- Self-assessment for skill personalization

### Dashboard
- Visual roadmap with skill nodes
- Progress tracking and user profile
- Streak counter and achievement display

### SkillModal
- Detailed skill information
- Curated learning resources
- Action buttons for assessments

### Assessment
- Interactive quiz interface
- Instant feedback on answers
- Results screen with celebration animations

## Customization

### Adding New Career Paths
Edit the `careerPaths` array in `OnboardingFlow.js`:

```javascript
const careerPaths = [
  {
    id: 'your-path',
    title: 'Your Career Path',
    icon: YourIcon,
    color: 'bg-your-color',
    skills: ['Skill 1', 'Skill 2', 'Skill 3']
  }
];
```

### Modifying Roadmap Data
Update the `roadmapData` object in `Dashboard.js` to customize learning paths.

### Styling
- Colors: Modify `tailwind.config.js` for theme customization
- Components: Update CSS classes in `src/index.css`

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.