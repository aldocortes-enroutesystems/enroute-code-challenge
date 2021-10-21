const dateParser = (date) => {
    const isValidDate = Date.parse(date);
    if(isNaN(isValidDate)) { return null; }
    var d = date.getDate();
    var m = date.getMonth() +1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
};

const getRandomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
    dateParser,
    getRandomRange
}