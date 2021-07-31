import * as yup from 'yup'
export const userSchema = yup.object().shape({
        name:yup.string().required(),
        lastName:yup.string().required(),
        gender:yup.string().required(),
        dob:yup.date().required(),
        race:yup.string().required(),
        nationality:yup.string().required(),
        religion:yup.string().required(),
        idcard:yup.string().min(13).max(13).required(),
        idstart:yup.date().required(),
        idend:yup.date().required(),
        adress:yup.string().min(10).required(),
        phone:yup.string().min(10).max(10).required(),
        email:yup.string().email().required(),
        type:yup.string().required(),
        type1:yup.string().required(),
        locations:yup.string().required(),
        promosion:yup.string().required(),
        imageSelected:yup.string().required(),
        inputfild:yup.string().required(),
        storeName:yup.string().required()
})
export const adminSchema = yup.object().shape({
        score1:yup.number().max(70).required(),
        score2:yup.number().max(15).required(),
        score3:yup.number().max(15).required(),
        bordOpenion:yup.string().required()  
})
export const adminSchemaAttendant = yup.object().shape({
        topic:yup.string().required(),
        topicDetial:yup.string().required(),
        dateACT:yup.string().required(),
        date:yup.string().required(),  
        time:yup.string().required(),   
        action:yup.string().required(),  
})
