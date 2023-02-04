'use strict'
let appConfig = require('../config/application');
const path = require('path');
const Model = require('./../models/index');
// const { async } = require('../controllers/index').profile;

module.exports = {

    createDirection: function (role, type, id, userId) {
        if (process.env.DEBUG) destination = './upload/lsdkfjdlfkj/'
        else destination = 'lsdkfjdlfkj/'
        let promiseCheck = new Promise(function (resolve, reject) {
            if (id) {
                var final = path.join(destination, role, type, id)
                resolve({ code: 200, final: final })
            } else {
                var final = path.join(destination, role, type, userId)
                resolve({ code: 200, final: final })
            }
        })
        return promiseCheck
    },

    createRawUrl: function (role, typee, id, name) {
        if (id) {
            var final = path.join(role, typee, id, name)
            return (final)
        } else {
            var final = path.join(role, typee, userId, name)
            return (final)
        }
    },

    createURL: function (files) {
        var demandFiles
        try {
            demandFiles = files.length ? files
                .map(function (x) {
                    if (x) {
                        if (x.url) {
                            return {
                                id: x._id,
                                name: x.name,
                                size: x.size,
                                type: x.type,
                                showName: x.showName,
                                title: x.title,
                                url: config.tanzesh3CDNPrivate + x.rawUrl,
                            }
                        } else null
                    } else null
                }) : []
        } catch (error) {
            console.log(error)
            demandFiles = []
        }
        return (demandFiles)
    },

    createSingleURL: function (file) {
        var demandFiles
        try {
            demandFiles = Object.keys(file).length ? new Object({
                id: file._id,
                name: file.name,
                size: file.size,
                type: file.type,
                showName: file.showName,
                title: file.title,
                url: config.tanzesh3CDNPrivate + file.rawUrl,
            }) : []
        } catch (error) {
            console.log(error)
            demandFiles = []
        }
        return (demandFiles)
    },

    createFileUpload: async (file) => {
        try {
            if (file.length == 1) {
                const newfile = new Model.File(file[0])
                await newfile.save(err, file)
                // if (err) { resolve({ code: 409, text: 'فایل در سامانه به ثبت نرسید' }) }
                return ({ code: 201, id: [file.id] })
            } else {
                await Model.File.insertMany(file)
                return ({ code: 201, id: files.map(a => a.id) })
            }
        } catch (err) {
            console.log(err)
            return ({ code: 409, text: 'فایل ها در سامانه به ثبت نرسیدند ' })
        }
    },
}