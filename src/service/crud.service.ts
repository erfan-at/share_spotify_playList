import Model from '../models/index'
import moment from "jalali-moment"

export default {

    create: async (schema, data) => {
        try {
            const newData = new Model[schema](data)
            return await newData.save();
        } catch (err) {
            console.log('err from @create crudService zone')
            console.log(err)
            throw err
        }
    },

    getOne: async (schema, dataId, populate) => {
        try {
            console.log("start")


            const dataSchema = Model[schema]
            const data = await dataSchema.findById(dataId)
                .populate(populate)
                .lean();
            // data.createdAt = moment(data.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
            // data.updatedAt = moment(data.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
            return data
        } catch (err) {
            console.log(err)
            console.log('err from @getOne crudService zone')
            throw err
        }
    },

    getAll: async (schema, condition, populate, sort, select) => {
        // try {
        //     const dataSchema = Object.keys(Model)
        //         .filter(key => schema.includes(key))
        //         .reduce((obj, key) => {
        //             obj[key] = Model[key];
        //             // return obj;
        //             return Object.values(obj)[0]
        //         }, {});
        //     const posts = await dataSchema.find(condition)
        //         .populate(populate)
        //         .sort(sort)
        //         .select(select)
        //         .lean();
        //     return posts
        // } catch (err) {
        //     console.log(err)
        //     console.log('err from @getAll crudService zone')
        //     throw err
        // }
    },

    find: async (schema, condition, populate, sort, select) => {
        // try {
        //     const dataSchema = Object.keys(Model)
        //         .filter(key => schema.includes(key))
        //         .reduce((obj, key) => {
        //             obj[key] = Model[key];
        //             // return obj;
        //             return Object.values(obj)[0]
        //         }, {});
        //     const data = await dataSchema.find(condition)
        //         .populate(populate)
        //         .sort(sort)
        //         .select(select)
        //         .lean();
        //     data.createdAt = moment(data.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
        //     data.updatedAt = moment(data.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
        //     return data
        // } catch (err) {
        //     console.log(err)
        //     console.log('err from @find  crudService zone')
        //     throw err
        // }
    },

    update: async (schema, data, dataId, populate, select) => {
        // try {
        //     const dataSchema = Object.keys(Model)
        //         .filter(key => schema.includes(key))
        //         .reduce((obj, key) => {
        //             obj[key] = Model[key];
        //             // return obj;
        //             return Object.values(obj)[0]
        //         }, {});
        //     const updatedData = await dataSchema.findByIdAndUpdate(dataId, data)
        //         .populate(populate)
        //         .select(select)
        //         .lean();
        //     // updatedData.updatedAt = moment(updatedData.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
        //     // updatedData.createdAt = moment(updatedData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
        //     return updatedData
        // } catch (err) {
        //     console.log(err)
        //     console.log('err from @update crudService zone')
        //     throw err
        // }
    },

    delete: async (schema, dataId, data) => {
        // try {
        //     const dataSchema = Object.keys(Model)
        //         .filter(key => schema.includes(key))
        //         .reduce((obj, key) => {
        //             obj[key] = Model[key];
        //             // return obj;
        //             return Object.values(obj)[0]
        //         }, {});
        //     await dataSchema.findByIdAndUpdate(dataId, data)
        //     return true
        // } catch (err) {
        //     console.log(err)
        //     console.log('err from @delete crudService zone')
        //     throw err
        // }
    },

}