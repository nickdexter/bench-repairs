export function timeAgo(timestamp: string | Date): string {
    const now = new Date();
    const past = new Date(timestamp);
    const elapsed = now.getTime() - past.getTime();

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    if (isNaN(elapsed) || elapsed < 0) {
        return 'Just now';
    }

    if (elapsed < msPerMinute) {
        const seconds = Math.floor(elapsed / 1000);
        return seconds <= 1 ? 'Just now' : `${seconds} seconds ago`;
    } else if (elapsed < msPerHour) {
        const minutes = Math.floor(elapsed / msPerMinute);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (elapsed < msPerDay) {
        const hours = Math.floor(elapsed / msPerHour);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (elapsed < msPerMonth) {
        const days = Math.floor(elapsed / msPerDay);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (elapsed < msPerYear) {
        const months = Math.floor(elapsed / msPerMonth);
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        const years = Math.floor(elapsed / msPerYear);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
}