import Service from '../service/index'
import Model from '../models/index'
import responseBuilder from "../library/responseBuilder";
import chalk from 'chalk';

export default {

    ping: (req: any, res: any) => {
        return responseBuilder.success(res, "", "pong")
    },

    home: (req: any, res: any) => {
        return responseBuilder.success(res, "", "pong")
    },

}