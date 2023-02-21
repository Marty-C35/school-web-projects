import { Request, Response } from 'express';
import { object, string, boolean, ValidationError, number, date } from 'yup';
import { reservations } from '.';
import prisma from '../client';

/**
 * Reservation schema
 */
const reservationSchema = object({
  from: date().required(),
  to: date().required(),
  guestCount: number().required(),
  reservedAt: date().required(),
  accomodationId: string().required(),
  userId: string().required()
});

/**
 * Deletes reservation by marking it with cancelledAt,
 * only reservations that are not currently happening can be cancelled.
 * Guest cannot cancel old reservations.
 */
export const cancel = async (req: Request, res: Response) => {
    const id = req.query.id
    if (id === undefined) {
        return res.status(400).send({
            status: "error",
            data: {},
            message: "No Reservation ID given"
        });
    }
    
    try {
        const accomodations = await prisma.reservations.findMany({
            where: {
                id: String(id),
                canceledAt: null,
                from: {
                    gt: new Date()
                }
            }
        });
        if (accomodations.length === 0) {
            return res.status(400).send({
                status: "error",
                data: {},
                message: "No Reservation to cancel"
            });
        }

        const accomodation = await prisma.reservations.update({
            data: {
                canceledAt: new Date(),
            },
            where: {
                id: String(id)
            }
        })
        return res.status(201).send({
            status: "success",
            data: accomodation,
            message: "Accomodation updated"
        })
    } catch {
        return res.status(500).send({
            status: "error",
            data: {},
            message: "Something went wrong"
        });
    }
}

/**
 * Partially updates reservation and marks it as paid.
 */
export const pay = async (req: Request, res: Response) => {
    const id = req.query.id
    if (id === undefined) {
        return res.status(400).send({
            status: "error",
            data: {},
            message: "No Reservation ID given"
        });
    }
    
    try {
        const accomodations = await prisma.reservations.findMany({
            where: {
                id: String(id),
                isPaid: false
            }
        });
        if (accomodations.length === 0) {
            return res.status(400).send({
                status: "error",
                data: {},
                message: "No Reservation to pay"
            });
        }

        const accomodation = await prisma.reservations.update({
            data: {
                isPaid: true
            },
            where: {
                id: String(id)
            }
        })
        return res.status(201).send({
            status: "success",
            data: accomodation,
            message: "Accomodation updated"
        })
    } catch {
        return res.status(500).send({
            status: "error",
            data: {},
            message: "Something went wrong"
        });
    }
}

export const patch = async (req: Request, res: Response) => {
    if (req.body.canceledAt !== undefined) {
        return reservations.cancel(req, res)
    } else if (req.body.isPaid !== undefined) {
        return reservations.pay(req, res)
    }
    return res.status(500).send({
        status: "error",
        data: {},
        message: "Something went wrong"
    });
}

/**
 * Adds new reservation into the database only if there's no other paid reservation within that time range.
 * The guestCount needs to be higher than 1. API sets reservedAt date. And time range must be in future.
 */
export const create = async (req: Request, res: Response) => {
    try {
        const data = await reservationSchema.validate(req.body);
        if (data.guestCount < 1) {
            return res.status(400).send({
                status: "error",
                data: {},
                message: "Minimum guest count is 1"
            });
        }
        if (data.from > data.to) {
            throw new ValidationError("invalid date")
        }
        const colisions = await prisma.reservations.findMany({
            where: {
                accomodationId: data.accomodationId,
                isPaid: true,
                canceledAt: null,
                OR: [{
                    from: {
                        gte: data.from,
                        lte: data.to
                    },
                    to: {
                        gte: data.from,
                        lte: data.to
                    }
                }]
            }
        })

        if (colisions.length !== 0) {
            return res.status(400).send({
                status: "error",
                data: {},
                message: "Accomodation already reserved"
            });
        }
        const reservation = await prisma.reservations.create({
            data
        });
        
        return res.status(201).send({
        status: "success",
        data: reservation,
        message: "Accomodation added to system"
        })

    } catch (e) {
        if (e instanceof ValidationError) {
            return res.status(400).send({
                status: "error",
                data: {},
                message: "Given parameters are not valid"
            });
        }
        return res.status(500).send({
            status: "error",
            data: {},
            message: "Something went wrong"
        });
    }
}
