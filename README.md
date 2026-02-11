# Deliveroo - Courier Service Platform

#### Date 11/2/2026

## Project overview

Deliveroo is a full-stack courier service web application that enables users to create, manage, and track parcel deliveries in real time. It features secure JWT-based authentication, role-based access control, and interactive map tracking. The system is built with FastAPI, React, and PostgreSQL.

## Authors
- Judy Ogachi
- Collins Kiaritha
- Jeremy Kimutai
- Joseph Kimuhu
- Martin Mbatia

## Features Overview

### User Features
1. **Registration & Login** - Secure JWT-based authentication
2. **Dashboard** - Overview of deliveries with charts and statistics
3. **Create Parcel** - Multi-step form with quote calculation
4. **Parcel Management** - View, edit destination, cancel parcels
5. **Real-time Tracking** - Status updates and location tracking

### Admin Features
1. **Admin Dashboard** - Manage all system parcels
2. **Status Management** - Update parcel status and location
3. **User Management** - View all users and their parcels
4. **System Analytics** - Overview of platform performance

### Security Features
1. **Password Hashing** - bcrypt for secure password storage
2. **JWT Authentication** - Stateless authentication
3. **Role-based Access** - Admin vs User permissions
4. **Input Validation** - Pydantic schemas for API validation
5. **Security Headers** - CORS, rate limiting, trusted hosts

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **OpenStreetMap** - Distance/route calculations

### Frontend
- **React** - UI framework
- **JavaScript** - Flexibility/dynamic typing
- **Material-UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL
- Git

### 1. Clone Repository
```bash
git clone git@github.com:Bonarerijt/project_deliveroo.git
cd project_deliveroo
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Initialize database
python init_database.py

# Start backend server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 4. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Deployed link: https://project-deliveroo-two.vercel.app/

## Demo Accounts

### Admin Account
- Email: `admin@deliveroo.com`
- Password: `admin123`
- Access: Full admin dashboard, can manage all parcels

### User Account
- Email: `user@deliveroo.com`
- Password: `user123`
- Access: Create and manage own parcels

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/deliveroo
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
SENDGRID_API_KEY=your-sendgrid-api-key
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Parcels
- `GET /parcels/` - Get user's parcels
- `POST /parcels/` - Create new parcel
- `GET /parcels/{id}` - Get parcel details
- `PUT /parcels/{id}/destination` - Update destination
- `PUT /parcels/{id}/cancel` - Cancel parcel
- `GET /parcels/{id}/route` - Get route information

### Admin
- `GET /parcels/all` - Get all parcels (admin only)
- `PUT /parcels/{id}/admin` - Update parcel status/location (admin only)

## Development Notes

### Google Maps Integration
- Basic structure implemented
- Requires valid Google Maps API key
- Currently uses mock data for development
- Ready for production with proper API key

### Email Notifications
- Sends notifications on status/location changes

### Database
- PostgreSQL with proper relationships
- Includes demo data for testing
- Migration-ready structure

## Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check PostgreSQL is running
   - Verify DATABASE_URL in .env
   - Run `python init_database.py`

2. **Frontend can't connect to backend**
   - Ensure backend is running on port 8000
   - Check REACT_APP_API_URL in frontend .env

3. **Authentication issues**
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify SECRET_KEY is set

4. **Database connection errors**
   - Verify PostgreSQL credentials
   - Check database exists
   - Run database initialization script

## Production Deployment

### Backend
1. Set ENVIRONMENT=production
2. Use production database
3. Set proper SECRET_KEY
4. Configure CORS for production domain
5. Use production WSGI server (gunicorn)

### Frontend
1. Build production bundle: `npm run build`
2. Serve static files
3. Configure production API URL
4. Set up proper domain/SSL

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## Acknowledgments
- Our technical mentors for their guidance, insightful feedback, and continuous support throughout the development process.
- Moringa School for the opportunity to build this platform
- The open-source community for the amazing tools and libraries
- All team members for their dedication and hard work

## License

MIT License - see [LICENSE] file for details