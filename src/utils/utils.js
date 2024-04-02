export const formatPrice = (price) => {
    return price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    });
};

export const validatePhoneInput = (input) => {
    return !isNaN(input) && input.length <= 14;
};

export const formatDateAndTime = (dateInput) => {
    const date = new Date(dateInput);
    return date.toLocaleString("id-ID", {
        hour12: false,
    });
};

export const formatDateAndTimeWithOffset = (
    dateString,
    dayOffset = 1,
    hourOffset = 24
) => {
    const dateWithoutTZ = new Date(dateString?.replace("Z", ""));
    const newDate = new Date(dateWithoutTZ);
    newDate.setDate(newDate.getDate() + dayOffset);
    newDate.setHours(newDate.getHours() + hourOffset);

    return newDate.toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "long",
    });
};
