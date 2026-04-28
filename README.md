# Anilao Municipal Police Station Website

A modern, full-stack website for the Anilao Municipal Police Station built with Node.js, Express, and React. Features include geolocation mapping, online crime reporting, service information, directories, policies, and real-time weather updates.

## Features

### Core Functionality
- **Station Information**: Detailed information about the police station, chief, and personnel
- **Interactive Map**: Leaflet.js integration showing the station's geolocation with directions
- **Online Crime Reporting**: Secure form for submitting incident reports
- **Directories**: Complete contact information for all departments and divisions
- **Services**: Comprehensive list of police services with requirements and processing times
- **Policies**: Accessible police policies and guidelines
- **News & Announcements**: Latest updates and community news
- **Emergency Hotline**: Prominent emergency contact information (911)
- **Weather Integration**: Real-time local weather conditions

### Technical Features
- **Node.js/Express Backend**: RESTful API with comprehensive endpoints
- **React Frontend**: Modern, responsive design with React Router
- **TailwindCSS**: Advanced styling with custom police-themed color palette
- **Leaflet Maps**: Free, open-source mapping solution
- **OpenWeather API**: Weather data integration (optional)
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Modern UI**: Glassmorphism effects, gradients, and smooth animations

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Navigate to the project directory**
   ```bash
   cd C:\Users\Anilao_Engineering\CascadeProjects\anilao-police-station
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Configure environment variables**
   
   Edit the `.env` file in the root directory:
   ```
   PORT=5000
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   ```

   **Note**: The application works without API keys using mock data. For production:
   - Get a free OpenWeather API key from: https://openweathermap.org/api
   - Google Maps is optional as we use Leaflet (free) for mapping

5. **Start the backend server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Start the React frontend** (in a new terminal)
   ```bash
   cd client
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Station Information
- `GET /api/station` - Get station details, contact info, and coordinates

### Weather
- `GET /api/weather` - Get current weather conditions for Anilao

### Directories
- `GET /api/directories` - Get all department directories and contacts

### Services
- `GET /api/services` - Get all police services with requirements

### Policies
- `GET /api/policies` - Get all police policies and guidelines

### Crime Reporting
- `POST /api/report` - Submit a crime report
  - Body: `{ name, contact, incident, date, location, description }`

### News
- `GET /api/news` - Get latest news and announcements

## Project Structure

```
anilao-police-station/
├── server.js                 # Express server and API routes
├── package.json              # Backend dependencies
├── .env                      # Environment variables
├── client/
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── About.js
│   │   │   ├── Directories.js
│   │   │   ├── EmergencyBanner.js
│   │   │   ├── Footer.js
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── MapSection.js
│   │   │   ├── News.js
│   │   │   ├── Policies.js
│   │   │   ├── ReportCrime.js
│   │   │   ├── Services.js
│   │   │   └── StationInfo.js
│   │   ├── App.js           # Main React app
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles with Tailwind
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS configuration
└── README.md                # This file
```

## Customization

### Update Station Information
Edit the `policeStationData` object in `server.js` to update:
- Station name and address
- Contact numbers
- Personnel count
- Station chief name
- GPS coordinates

### Update Directories
Edit the `directories` array in the `/api/directories` route in `server.js`.

### Update Services
Edit the `services` array in the `/api/services` route in `server.js`.

### Update Policies
Edit the `policies` array in the `/api/policies` route in `server.js`.

### Update News
Edit the `news` array in the `/api/news` route in `server.js`.

### Update Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      police: {
        dark: '#1e3a5f',
        blue: '#2563eb',
        light: '#3b82f6',
        accent: '#f59e0b'
      }
    }
  }
}
```

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **CORS**: Cross-origin resource sharing
- **Axios**: HTTP client for API calls
- **dotenv**: Environment variable management

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Leaflet**: Interactive maps
- **React Leaflet**: React components for Leaflet
- **Axios**: HTTP client

## API Keys (Optional)

### OpenWeather API (Free)
1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Get your API key
4. Add it to the `.env` file: `OPENWEATHER_API_KEY=your_key_here`

Without the API key, the app will use mock weather data.

## Deployment

### Build for Production
```bash
cd client
npm run build
```

### Deploy Backend
Deploy the `server.js` to any Node.js hosting platform (Heroku, Vercel, Railway, etc.).

### Deploy Frontend
The built React app in `client/build` can be served by the Express server or deployed separately to Netlify, Vercel, or similar platforms.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Considerations

- All crime reports are logged server-side
- Implement rate limiting for the report endpoint in production
- Add authentication for admin features
- Use HTTPS in production
- Validate and sanitize all user inputs
- Implement CSRF protection for forms

## Future Enhancements

- User authentication for report tracking
- Admin dashboard for managing reports
- SMS notifications for reported incidents
- Integration with PNP national database
- Multi-language support (Filipino/English)
- Mobile app version
- Live chat support
- Document upload for evidence
- Anonymous reporting option

## Support

For issues or questions, contact:
- Email: anilao.pnp@gmail.com
- Phone: (033) 123-4567
- Emergency: 911

## License

This project is for the Anilao Municipal Police Station. All rights reserved.

## Credits

Developed for the Anilao Municipal Police Station to serve and protect the community with modern technology.

---

**Note**: This is a demonstration website. For production use, ensure all sensitive data is properly secured and all API keys are kept private.
