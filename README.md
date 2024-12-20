# Clipwise.ai

# AI Video Script Generator

A powerful web application that generates AI-powered video scripts using the x.ai API. The application features a dynamic text input field, file upload capabilities, and link processing to enhance AI prompts.

## Features

- 🤖 AI-powered script generation using x.ai API
- 📝 Dynamic text input with rich editing capabilities
- 📁 File upload support (documents, images)
- 🔗 External link processing
- 💾 Save and retrieve generated scripts
- 📱 Fully responsive design
- 🌍 Multi-language support
- 📤 Export scripts to different formats

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8+
- Node.js 16+
- npm or yarn
- Virtual environment tool (virtualenv or venv)

## Backend Setup (Django)

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Django and required dependencies:
```bash
pip install django djangorestframework django-cors-headers python-dotenv Pillow
```

3. Set up environment variables:
Create a `.env` file in the backend directory:
```env
DEBUG=True
SECRET_KEY=your-secret-key
X_AI_API_KEY=your-x-ai-api-key
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ORIGIN_WHITELIST=http://localhost:5173
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Start the Django development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

## Frontend Setup (React + Vite)

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Running Both Services

To run both the frontend and backend simultaneously:

1. Open two terminal windows/tabs
2. In the first terminal:
```bash
# Backend
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python manage.py runserver
```

3. In the second terminal:
```bash
# Frontend
cd frontend
npm run dev
```

## Project Structure

```
project/
├── backend/
│   ├── api/
│   ├── core/
│   ├── scripts/
│   └── manage.py
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## API Endpoints

- `POST /api/generate-script/` - Generate a new script
- `GET /api/scripts/` - List saved scripts
- `POST /api/scripts/` - Save a script
- `GET /api/scripts/<id>/` - Retrieve a specific script
- `PUT /api/scripts/<id>/` - Update a script
- `DELETE /api/scripts/<id>/` - Delete a script

## Development Guidelines

1. Backend:
   - Follow PEP 8 style guide
   - Write tests for new features
   - Document API endpoints using docstrings
   - Handle errors gracefully

2. Frontend:
   - Follow React best practices
   - Use TypeScript for type safety
   - Implement proper error handling
   - Write unit tests for components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [x.ai API](https://x.ai/api) for AI script generation
- [Django](https://www.djangoproject.com/) for the backend framework
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Result Screenshot 

![648dc747-8d03-45c8-a349-3c4f8dd82f8e](https://github.com/user-attachments/assets/97fd2abf-e1aa-4d67-8c29-0793cb763814)

![109f4ebd-33b6-4186-a9fa-9c25d1903f36](https://github.com/user-attachments/assets/7f04a9bc-8c98-4043-b65d-faef5670ed07)

