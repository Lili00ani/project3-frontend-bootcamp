# Rocket Academy Coding Bootcamp: Project 3 Frontend

## Event Link

Event Link is a mobile-oriented platform designed to facilitate event management for both users and administrators. With its intuitive user interface and robust administrative tools, Event Link simplifies the process of organizing and participating in events.

# Features

## User Side

View and Search: Users can browse through a variety of events using keywords and filters based on categories. This feature is accessible even before logging in, allowing users to discover events effortlessly.
Interactive Maps: Integrated maps provide users with the location of event venues, helping them plan their attendance efficiently.
Booking Management: Users can make bookings for both free and paid events. Paid events utilize Stripe for secure transactions. Upon successful payment, users receive email notifications confirming their booking.
Booking History: Users have access to their booking history, allowing them to keep track of past and upcoming events they've registered for.

## Admin Side

Event Creation: Administrators have the capability to create new events, providing details such as event name, date, location, and ticket availability.
Booking Tracking: Admins can monitor who has booked their events and track the number of available slots in real-time. This feature helps ensure efficient management of event capacity.
User Insights: Administrators can view the email addresses of users who have booked their events, along with the number of tickets purchased by each user.
Usage
To utilize Event Link, simply access the platform from your mobile device's browser. Users can start exploring events immediately, while administrators can log in to access the administrative dashboard.

## Technologies Used

Frontend: MUI
Backend: Node.js, Express.js, Nodemailer,
Database: Sequelize
Payment Processing: Stripe API
Mapping: Google Maps API

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
