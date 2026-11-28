import { pool } from "../../config/db";
import { ICreateEvent } from "./event.interface";

const createEvent = async (payload: ICreateEvent, organizerId: number) => {
    const {
        title,
        description,
        category,
        date,
        location,
        total_seats,
        price
    } = payload;

    const result = await pool.query(
        `INSERT INTO events
        (title, description, category, date, location, total_seats, available_seats, price, organizer_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
            title,
            description,
            category,
            date,
            location,
            total_seats,
            total_seats,
            price,
            organizerId
        ]
    );

    return result.rows[0];
};

export const eventRepository = {
    createEvent
};