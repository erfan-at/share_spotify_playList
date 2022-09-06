var moment = require("moment");
const Activity = require("../models/activity.model")

module.exports = {

    recordActivity: function (userId, endPoint, body) {
        let promiseCheck = new Promise(function (resolve, reject) {
            // await Activity.create({
            //     "userId": req.userId,
            //     "endPoint": req.originalUrl ? req.originalUrl : '',
            //     "body": req.body ? JSON.stringify(req.body) : '',
            // })
            axios.post(config.manageContactHostActivity, {
                userId: userId,
                endPoint: endPoint ? endPoint : "",
                body: body ? JSON.stringify(body) : "",
            }).then(function (responsePost) {
                if (responsePost.status == 201) {
                    resolve({ code: 201, text: "Activity is submitted." });
                } else resolve({ code: 500, text: "لطفا دوباره تلاش کنید." });
            }).catch(function (error) {
                console.log(error);
                resolve({ code: 500, text: "لطفا دوباره تلاش کنید." });
            });
        });
        return promiseCheck;
    },
    //     recordActivity: function (userId, endPoint, body) {
    //         let promiseCheck = new Promise(function (resolve, reject) {
    //             Activity.create({
    //                 "userId": userId,
    //                 "endPoint": endPoint ? endPoint : '',
    //                 "body": body ? JSON.stringify(body) : '',
    //                 "date": moment(new Date()).format('X'),
    //                 "softDelete": false
    //             }).exec((err, activity) => {
    //                 if (activity) {
    //                     resolve({ code: 201, text: "Activity is submitted." });
    //                 } else {
    //                     console.log(err)
    //                     resolve({ code: 500, text: "لطفا دوباره تلاش کنید." });
    //                 }
    //             })
    //         })
    //         return promiseCheck;
    //     }
}