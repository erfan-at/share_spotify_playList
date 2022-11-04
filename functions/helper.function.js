module.exports = {
    fixInputObject: (data) => {
        if (data.id) {
            data = { ...data, id: +data.id }
            return data
        }
    }
}