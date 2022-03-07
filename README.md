# 💨 AirQuality Viewer

This project is broken up into a front end and back end, the front end
running on VueJS, and the backend running on Node/Express/MongoDB.

## ⚙️ To Install

Copy the repo and install as follows:

1. Backend
   1. Navigate to server folder: `cd server`
   2. Run `npm install` to install npm dependencies
   3. Ensure mongoDB is [installed and running](https://stackoverflow.com/a/70838271/6685623) locally
   4. `npm start` will start backend server and connect to mongo DB
2. Frontend
   1. Navigate to frontend folder: `cd client`
   2. Run `npm install` to install dependencies
   3. Run `npm run dev` to start development server
   4. Load [http://localhost:3000](https://localhost:3000)

## 💻 Technologies

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [MongooseJS](https://mongoosejs.com/)
- [VueJS](https://vuejs.org/)
- [Bootstrap](https://getbootstrap.com/)

## 🧸 Features

- User login
- User registration
- Password salting
- Backend Validations
- (Some) Frontend validation
- AQI Features:
  - View AQI for set location
  - View set threshold and AQI comparison
- Custom CSS / stylings for 💅 polish

### 🔮 Future Feature Ideas & Improvements

- Test cases for:
  - 1. Component testing via Cypress
  - 2. Backend API testing via Jest
  - NOTE: I did wish to add tests for the front end components and backend routes, but have not used Cypress or Jest before and was getting a little tripped up. For the sake of getting things deployed, I tabled this for now and would iterate on this as a fast-follow. Ideally, I'd ensure a test scenario for User creation via `/api/user`, as well as ensure login and other routes work as expected. Additionally, I'd provide test cases for components to ensure sample data provided renders correctly as props/data within the component itself.
- Better setup for prod vs dev environment
  - e.g process.env.NODE_ENV === 'production' vs 'development' and set paths variables / appropriately
- Refactor more template into child components
- Color code visuals for when limit is above/below threshold
- Add [Google Locations Typeahead API](https://developers.google.com/maps/documentation/javascript/places-autocomplete) to populate search results by City using autocomplete
  - Note: This will ensure cities with the same name, e.g, "Portland, OR" and "Portland, ME" are distinct
- Validations:
  - Front end validations on all forms for better UI experience
  - Validate email format on register (require domain ending etc)
  - Enforce strong password when registering
  - Add TOS (e.g, GDPR) and enforce
- Add password reset functionality
- Add Map UI so user can see their location AQI in regards to surrounding cities, etc.
- Add more weather components
- Add more graphics / branding / information about interpreting weather data
- Add ability for user to edit their information / delete their account (with confirmation)
