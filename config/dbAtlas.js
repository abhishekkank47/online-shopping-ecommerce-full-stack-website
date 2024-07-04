import mongoose from 'mongoose'

const dbAtlas = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGOATLAS_URL)
        console.log(`MONGODB CONNECTED SUCCESFULLY\nDATABASE HOST: ${conn.connection.host}`)
    } catch (error) {
        console.log(`ERROR IN MONGODB CONNECTION ${error}`)
    }
}

export default dbAtlas;