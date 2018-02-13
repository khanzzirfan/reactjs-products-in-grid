export function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function currencyFormat(numberString) {
    var num = parseFloat(numberString);
    if (num === NaN)
        return numberString;
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export function getCustomisedRelativeDate(dateString) {
    if (!isDate(dateString))
        return dateString;

    let dateObject = new Date(Date.parse(dateString));
    let timeDiff = getTimeDiff(dateObject);

    let numberValue = timeDiff.replace(/[^\d]+/g, '');
    if (timeDiff.includes("day") && numberValue > 7) {
        return dateObject.toLocaleDateString("en-NZ");
    }
    else
        return timeDiff;
}


/**
 * Checks if a value is a valid date.
 *
 * @param  {*} value - The value.
 * @return {Boolean}
 */
export function isDate(value) {
    switch (typeof value) {
        case 'number':
            return true;
        case 'string':
            return !isNaN(Date.parse(value));
        case 'object':
            if (value instanceof Date) {
                return !isNaN(value.getTime());
            }
        default:
            return false;
    }
}


/**
 * Get a string describing the difference between two timestamps.
 *
 * @var {Date} time To retrieve relative descriptive string for.
 *
 * @return string indicating how far in the past or future the date is
 */
function getTimeDiff(time) {
    var diff = (new Date()).getTime() - time.getTime();

    return getTimeDiffDescription(diff, 'day', 86400000) ||
        getTimeDiffDescription(diff, 'hour', 3600000) ||
        getTimeDiffDescription(diff, 'minute', 60000) ||
        getTimeDiffDescription(diff, 'second', 1000) ||
        'just now';
}

function getTimeDiffDescription(diff, unit, divisor) {
    var unitAmount = (diff / divisor).toFixed(0);

    if (unitAmount > 0) {
        return unitAmount + ' ' + unit + (unitAmount == 1 ? '' : 's') + ' ago';
    } else if (unitAmount < 0) {
        return 'in ' + Math.abs(unitAmount) + ' ' + unit + (unitAmount == -1 ? '' : 's');
    } else {
        return null;
    }
}