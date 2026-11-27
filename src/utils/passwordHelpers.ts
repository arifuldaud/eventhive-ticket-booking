

import bcrypt from "bcrypt"

const hashPassword =async(plainPassword:string) => {

 return await bcrypt.hash(plainPassword,8);

};

const compareHash = async (plainPassword:string,hashPassword:string) => {

return await bcrypt.compare(plainPassword,hashPassword);

};


export const passwordHelpers = {
    compareHash,hashPassword
};