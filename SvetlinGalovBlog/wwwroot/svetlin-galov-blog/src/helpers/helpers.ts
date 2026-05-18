const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const monthName = date.toLocaleString("en-US", { month: "long" });

    return `${monthName} ${year}`;
}

const toTitleCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export { formatDate };