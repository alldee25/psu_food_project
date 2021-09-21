import * as yup from 'yup'
export const addMenuValidate = yup.object().shape({
    foodName:yup.string().required(),
    foodType:yup.string().required(),
    foodPrice:yup.string().required(),
    image:yup.object().required(),
})
export const editMenuValidate = yup.object().shape({
    foodName:yup.string().required(),
    foodType:yup.string().required(),
    foodPrice:yup.number().required(),
})
export const addLeaveValidate = yup.object().shape({
        displayValue:yup.string().required(),
            detial:yup.string().required(),
            from:yup.string().required(),
            to:yup.string().required(),
            today:yup.string().required(),
})