import Model from '../models/index'
import moment from "jalali-moment"

export default {

    create: async (schema: string, data: any) => {
        try {
            const newData = new Model[schema](data)
            return await newData.save();
        } catch (err) {
            console.log('err from @create crudService zone')
            console.log(err)
            throw err
        }
    },

    findById: async (schema: string, dataId: any, populate: any) => {
        try {
            const dataSchema = Model[schema]
            // const data = await dataSchema.findById(dataId)
                const data = await dataSchema.findOne({ _id: dataId })

                .populate(populate)
            // .lean();
            // data.createdAt = moment(data.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
            // data.updatedAt = moment(data.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
            if (data) {
                return data
            } else { return undefined }
        } catch (err) {
            console.log(err)
            console.log('err from @getOne crudService zone')
            // throw err
            return undefined 
        }
    },

    findOneRecord: async (schema: string, condotion: any, populate: any) => {
        try {
            const dataSchema = Model[schema]
            const data = await dataSchema.findOne(condotion)
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

    getAll: async (schema: string, condition: any, populate: any, sort: any, select: any) => {
        try {
            const dataSchema = Model[schema]
            const posts = await dataSchema.find(condition)
                .populate(populate)
                .sort(sort)
                .select(select)
                .lean();
            return posts
        } catch (err) {
            console.log(err)
            console.log('err from @getAll crudService zone')
            throw err
        }
    },

    find: async (schema: string, condition: any, populate: any, sort: any, select: any) => {
        try {
            const dataSchema = Model[schema]
            const data = await dataSchema.find(condition)
                .populate(populate)
                .sort(sort)
                .select(select)
                .lean();
            data.createdAt = moment(data.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
            data.updatedAt = moment(data.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
            return data
        } catch (err) {
            console.log(err)
            console.log('err from @find  crudService zone')
            throw err
        }
    },

    updateById: async (schema: string, data: any, dataId: any, populate: any, select: any) => {
        try {
            const dataSchema = Model[schema]
            const updatedData = await dataSchema.findByIdAndUpdate(dataId, data, { new: true })
                .populate(populate)
                .select(select)
                .lean();
            // updatedData.updatedAt = moment(updatedData.updatedAt, "X").format("jYYYY/jMM/jDD HH:mm")
            // updatedData.createdAt = moment(updatedData.createdAt, "X").format("jYYYY/jMM/jDD HH:mm")
            return updatedData
        } catch (err) {
            console.log(err)
            console.log('err from @update crudService zone')
            throw err
        }
    },

    delete: async (schema: string, dataId: any, data: any) => {
        try {
            const dataSchema = Model[schema]
            await dataSchema.findByIdAndUpdate(dataId, data)
            return true
        } catch (err) {
            console.log(err)
            console.log('err from @delete crudService zone')
            throw err
        }
    },

}