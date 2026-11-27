import { pool } from "./db";


// users Table Create 
const usersTableQuery =`
CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role VARCHAR(25) NOT NULL DEFAULT 'attendee'
CHECK (role IN ('attendee', 'organizer')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const eventsTableQuery =`
CREATE TABLE IF NOT EXISTS events (
id SERIAL PRIMARY KEY,
title VARCHAR(155) NOT NULL,
description TEXT NOT NULL,
category VARCHAR(40) NOT NULL,
date TIMESTAMP NOT NULL,
location VARCHAR(100) NOT NULL,
total_seats INTEGER NOT NULL CHECK (total_seats > 0),

available_seats INTEGER NOT NULL CHECK (available_seats >= 0 AND
(available_seats <= total_seats)), 
price NUMERIC(10,2) NOT NULL CHECK(price>=0),

organizer_id INTEGER NOT NULL REFERENCES users(id),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`



const bookingsTableQuery =`
CREATE TABLE IF NOT EXISTS bookings (
id SERIAL PRIMARY KEY,
event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
attendee_id INTEGER NOT NULL REFERENCES users(id),

tickets_booked INTEGER NOT NULL CHECK (tickets_booked > 0),

status VARCHAR(25) NOT NULL DEFAULT 'confirmed'
CHECK (status IN ('confirmed', 'cancelled')),

total_price NUMERIC(10,2) NOT NULL ,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`







export const initDatabase = async() =>{

    await pool.query(usersTableQuery);
    console.log("Database Table is Created");
};