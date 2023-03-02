import Service from '../service/index'
import Model from '../models/index'
import resBuilder from "../library/responseBuilder";
import { response } from "express";

export default {

    ping: (req: any, res: any) => {
        return resBuilder.success(res, "", "pong")
    },

    home: (req: any, res: any) => {
        return resBuilder.success(res, "", "pong")
    },

}