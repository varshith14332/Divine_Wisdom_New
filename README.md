# 🌟 Divine Wisdom

> *AI-powered spiritual guidance combining ancient wisdom from the Bhagavad Gita with modern psychology*

Divine Wisdom is a beautiful, production-ready full-stack web application that provides personalized spiritual and psychological guidance through AI. It bridges timeless teachings from the Bhagavad Gita with evidence-based psychological principles to help users navigate modern life challenges.

## ✨ Features

- 🤖 **AI Wisdom Chat** - Interactive conversations that blend ancient wisdom with modern psychology
- 📖 **Bhagavad Gita Integration** - Authentic teachings adapted to contemporary life
- 🧠 **Psychology-Based Insights** - Evidence-based approaches for personal growth
- 🎨 **Futuristic Design** - Beautiful, responsive UI with spiritual aesthetics
- 🌗 **Dark/Light Mode** - Seamless theme switching
- 💾 **Save Insights** - Keep meaningful conversations and wisdom for reflection
- 🔐 **Authentication** - Secure user accounts with email/password and social login
- 📱 **Fully Responsive** - Perfect experience across all devices
- ⚡ **Production Ready** - Optimized for deployment and scalability

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety throughout the application
- **Vite** - Lightning-fast development and build tool
- **React Router 6** - Client-side routing with SPA architecture
- **TailwindCSS 3** - Utility-first CSS framework with custom spiritual theme
- **Radix UI** - Headless, accessible UI components
- **Lucide React** - Beautiful, customizable icons
- **Framer Motion** - Smooth animations and transitions

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Backend type safety
- **Zod** - Schema validation

### Database & Auth (Ready for Integration)
- **MongoDB Atlas** - Cloud database (configured for integration)
- **JWT Authentication** - Token-based authentication system
- **bcrypt** - Password hashing

### Deployment
- **Netlify** - Optimized for Netlify deployment
- **Vite Build** - Optimized production builds
- **Environment Variables** - Secure configuration management

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/divine-wisdom/app.git
cd divine-wisdom
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
# Database
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# AI API (Configure your AI service)
OPENAI_API_KEY=your_openai_api_key
# or
ANTHROPIC_API_KEY=your_anthropic_api_key

# App Configuration
NODE_ENV=development
PORT=8080
```

### 4. Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### 5. Build for Production
```bash
npm run build
```

### 6. Start Production Server
```bash
npm start
```

## 📁 Project Structure

```
divine-wisdom/
├── client/                    # React frontend
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components (shadcn/ui)
│   │   ├── header.tsx       # Navigation header
│   │   ├── footer.tsx       # Footer component
│   │   ├── theme-provider.tsx # Theme management
│   │   └── theme-toggle.tsx # Dark/light mode toggle
│   ├── pages/               # Route components
│   │   ├── Index.tsx        # Homepage
│   │   ├── Chat.tsx         # AI chat interface
│   │   ├── Login.tsx        # Authentication
│   │   ├── Signup.tsx       # User registration
│   │   ├── About.tsx        # About page
│   │   ├── Contact.tsx      # Contact form
│   │   ├── Profile.tsx      # User profile
│   │   ├── Settings.tsx     # User settings
│   │   ├── Saved.tsx        # Saved insights
│   │   └── NotFound.tsx     # 404 page
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── App.tsx              # Main app component with routing
│   └── global.css           # Global styles and theme
├── server/                   # Express backend
│   ├── routes/              # API route handlers
│   │   └── auth.ts          # Authentication routes
│   └── index.ts             # Server configuration
├── shared/                   # Shared types and utilities
│   └── api.ts               # API type definitions
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # TailwindCSS configuration
├── vite.config.ts           # Vite frontend configuration
├── vite.config.server.ts    # Vite backend configuration
└── README.md                # This file
```

## 🎨 Design System

Divine Wisdom features a custom spiritual design system with:

- **Golden Wisdom Gradient** - Primary brand colors inspired by divine light
- **Cosmic Purple & Mystical Cyan** - Accent colors for depth and tranquility
- **Custom Animations** - Subtle, meaningful animations (divine-pulse, cosmic-float, wisdom-glow)
- **Responsive Typography** - Clear, readable fonts optimized for wisdom content
- **Accessibility First** - WCAG compliant color contrasts and keyboard navigation

## 🔌 API Integration

### Authentication Endpoints
```typescript
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
POST /api/auth/logout      # User logout
GET  /api/auth/me          # Get current user
```

### Wisdom Chat Endpoints
```typescript
POST /api/chat/message     # Send message to AI
GET  /api/chat/history     # Get chat history
POST /api/chat/save        # Save insight
GET  /api/insights/saved   # Get saved insights
```

### User Management
```typescript
GET  /api/user/profile     # Get user profile
PUT  /api/user/profile     # Update profile
GET  /api/user/settings    # Get user settings
PUT  /api/user/settings    # Update settings
```

## 🌐 Deployment

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist/spa`
4. Add environment variables in Netlify dashboard

### Manual Deployment
```bash
npm run build
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Run tests
npm test

# Type checking
npm run typecheck

# Code formatting
npm run format.fix
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - Zod schema validation
- **CORS Protection** - Configured CORS policies
- **Environment Variables** - Secure configuration management
- **Data Privacy** - End-to-end encryption for sensitive data

## 🎯 Key Components

### AI Chat Interface (`client/pages/Chat.tsx`)
- Real-time AI conversations
- Source attribution (Bhagavad Gita vs Psychology)
- Message saving and exporting
- Responsive design with smooth animations

### Authentication (`client/pages/Login.tsx`, `client/pages/Signup.tsx`)
- Beautiful spiritual-themed forms
- Password strength validation
- Social login integration ready
- Comprehensive error handling

### Theme System (`client/components/theme-provider.tsx`)
- Seamless dark/light mode switching
- Persistent theme preferences
- System theme detection
- Smooth transitions

### Wisdom Management (`client/pages/Saved.tsx`)
- Search and filter saved insights
- Tag-based organization
- Export functionality
- Category grouping

## 🌟 Philosophy

Divine Wisdom is built on the principle that ancient spiritual wisdom and modern psychological science can work together to help people live more fulfilling lives. The application:

- **Honors Tradition** - Authentic representation of Bhagavad Gita teachings
- **Embraces Science** - Evidence-based psychological approaches
- **Maintains Inclusivity** - Welcoming to people of all backgrounds
- **Ensures Privacy** - Respectful handling of personal spiritual journeys
- **Promotes Growth** - Focus on practical, applicable guidance

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💫 Inspiration

> *"Yoga is a light, which once lit will never dim. The better your practice, the brighter your flame."*  
> — Bhagavad Gita 6.19

Divine Wisdom was created to make this eternal flame of wisdom accessible to everyone, regardless of their spiritual background or technical expertise.

## 📞 Support

- **Documentation**: [Divine Wisdom Docs](https://docs.divinewisdom.ai)
- **Community**: [Discord Server](https://discord.gg/divinewisdom)
- **Issues**: [GitHub Issues](https://github.com/divine-wisdom/app/issues)
- **Email**: support@divinewisdom.ai

---

**Built with 💜 by the Divine Wisdom Team**

*Bridging ancient wisdom with modern technology for a more enlightened world.*
