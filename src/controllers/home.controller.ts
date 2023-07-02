import Service from '../service/index'
import Model from '../models/index'
import resBuilder from "../library/responseBuilder";
import chalk from 'chalk';

export default {

    ping: (req: any, res: any) => {
        return resBuilder.success(res, "", "pong")
    },

    home: (req: any, res: any) => {
        return resBuilder.success(res, "", "pong")
    },

}