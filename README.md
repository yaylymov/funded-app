# Welcome to the Funded App
I used Python FastAPI for the Backend and JavaScript React for the Frontend.
I used Tailwind CSS for design and Redux for state management.
I used [Vite](https://vite.dev/) to create the React Frontend project.

## For development:
### Setup the virtual environment for the backend

Run these commands: 
1. `python -m venv env` \
2. `source env/bin/activate` \
3. `pip install fastapi uvicorn openpyxl`

Run this command in the funded-backend directory to install required python libraries: 

`pip install -r requirements.txt`

### Setup the virtual environment for the frontend

Run these commands: 
1. `npm install`
2. `npm install axios react-router-dom`
3. `npm install -D tailwindcss`

## Frontend
Run this command to launch the frontend:

`npm run dev`

## Backend
Run this command to launch the backend:

`uvicorn main:app --reload`


## Limitations
I haven't implemented the Login Logic.
So there is no functionality to login or register.
You can just type any valid email and it won't happen anything.
I don't save or use your email
whatsoever.

### !!! Add to my List button !!!
The Add to my List button in the Results and Identify pages does nothing.


## Personal setup
I used Linux Ubuntu as my development OS and PyCharm as an IDE
