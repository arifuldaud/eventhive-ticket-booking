
import { ICreateEvent } from "./event.interface";
import { eventRepository } from "./event.repository";


const createEvent = async (payload: ICreateEvent, organizerId: number) => {

const result = await eventRepository.createEvent(payload,organizerId);

return result;
}

export const eventService ={
    createEvent,
}