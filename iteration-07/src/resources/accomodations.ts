import { object, string, number, date, ValidationError, boolean } from 'yup';
import { Request, Response } from 'express'
import prisma from '../client';

import fs from "fs";
import path from "path";


/**
 * schema for validating accomoditation object before updating in database
 */
const accomodationUpdateSchema = object({
    name: string().required(),
    description: string().min(10).default("Popis bude přidaný"),
    mainPhoto: string().required(),
    location: string().required(),
    addedAt: date().required(),
    price: number().positive().required(),
  });

/**
 * Requires full object except any ids for update and results in updated accommodation.
 * following URL syntax: /api/accomodations?id=xxx
 */
export const change = async (req: Request, res: Response) => {
    const id = req.query.id
    if (id === undefined) {
        return res.status(400).send({
            status: "error",
            data: {},
            message: "No Accomodation ID given"
        });
    }
    
    try {
        const data = await accomodationUpdateSchema.validate(req.body);
        const accomodation = await prisma.accomodation.update({
            data: data,
            where: {
                id: String(id)
            }
        })
        return res.status(201).send({
            status: "success",
            data: accomodation,
            message: "Accomodation updated"
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


/**
 * schema for validating accomoditation object before inserting into database
 */
const accomodationSchema = object({
  name: string().required(),
  description: string().min(10).default("Popis bude přidaný"),
  mainPhoto: string().required(),
  location: string().required(),
  addedAt: date().required(),
  userId: string().required(),
  price: number().positive().required(),
});

/**
 * Adds new accommodation into database.
 */
export const create = async (req: Request, res: Response) => {
    try {
        const data = await accomodationSchema.validate(req.body);
        const accomodation = await prisma.accomodation.create({
        data
        });
        
        return res.status(201).send({
        status: "success",
        data: accomodation,
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


/**
 * Allows clients to query accommodations by the price, which is between some range of numbers.
 * filtering by price using following URL syntax: /api/accomodations?price[gte]=10&price[lte]=100
 * else 
 * Returns a list of accommodations
 * /api/accomodations
 */
export const get = async (req: Request, res: Response) => {
    let minPrice: number = 0;
    let maxPrice: number = Number.MAX_VALUE;
    const price = req.query.price || {}
    const id = req.params.id;
    
    for (const [key, value] of Object.entries(price)) {
        if (key === "lte") {
            maxPrice = Number(value);
        } else if (key === "gte") {
            minPrice = Number(value);
        }
    }

    try {
        const accomodations = await prisma.accomodation.findMany({
            where: {
                price: {
                    lte: maxPrice,
                    gte: minPrice
                }
            }
        });

        return res.send({
            status: "sucess",
            data: accomodations
        })
    } catch {
        return res.status(500).send({
            status: "error",
            data: {},
            message: "Something went wrong"
        });
    }
}

export const web = async (req: Request, res: Response) => {
    const id = req.path.substring(1);
    if (id !== "") {
        return webAccomodation(req, res, id)
    }
    
    
    const accomodations = await prisma.accomodation.findMany();
    const result = accomodations.map((acc) =>
        `<div class="item">
          <div class="image">
            <img src="../assets/${acc.mainPhoto}" />
          </div>
          <div class="content">
            <a class="header" href="${acc.id}">
              ${acc.name}</a>
            <div class="meta">
              <span class="price">\$${acc.price}/night</span>
            </div>
            <div class="description">
              ${acc.description}<span>
                </span>
            </div>
            <div class="extra">${acc.location}</div>
          </div>
        </div>`
        )

    fs.readFile(path.resolve("./public/index.html"), "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("An error occurred");
        }
        
        return res.send(
          data.replace(
            '<div class="ui items"></div>',
            `<div class="ui items">${result.join("")}</div>`
          )
        );
      });
}

export const webAccomodation = async (req: Request, res: Response, id: string) => {
    const accommodation = await prisma.accomodation.findUnique({
        where: {
            id: id
        }
    });

    const author = await prisma.user.findUnique({
        where: {
            id: (accommodation?.userId || "")
        }
    })
    const result =
        `<div class="ui fluid card">
            <div class="image">
                <img src="../assets/${accommodation?.mainPhoto}">
            </div>
            <div class="content">
                <div class="header">${accommodation?.name}</div>
                <div class="meta">
                <span class="right floated time">${accommodation?.addedAt.toLocaleDateString()}</span>
                <span class="category">${accommodation?.location}</span>
                <span class="price">$${accommodation?.price}/night</span>
                </div>
                <div class="description">
                ${accommodation?.description}
                </div>
            </div>
            <div class="extra content">
                <div class="right floated author">
                <img class="ui avatar image" src="../assets/${author?.avatar}"><span>${author?.name}</span>
                </div>
            </div>
        </div>`
    ;

    fs.readFile(path.resolve("./public/accomodation.html"), "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("An error occurred");
        }
        
        return res.send(
          data.replace(
            '<div class="ui fluid card"></div>',
            `<div class="ui fluid card">${result}</div>`
          )
        );
      });
}
