

export const EnvConfiguration = ()=>({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGO_DB,
    jwtsecret: process.env.JWT_SECRET,
    port: process.env.PORT || 3002 ,
    defaultlimit: +process.env.DEFAULT_LIMIT || 10 
})
// ()=({}) //UNA FUNCION QUE RETORNA UN OBJETO 