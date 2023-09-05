import {format} from "date-fns"
export const couponData = {
    code: null,
    percentage: null,
    expiresAt: null,
    isPublic: true,
}

export const tomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1)

    return format(new Date(tomorrow), 'yyyy-MM-dd').toString();
}