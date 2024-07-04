import bcrypt from 'bcrypt'

export const hashPassword = async(password)=>{
    try {
        const rounds =10;
        const passwordHashed = await bcrypt.hash(password,rounds)
        return passwordHashed
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async(password,passwordHashed)=>{
    return bcrypt.compare(password,passwordHashed)
}