export function getReadingTime(content: string | undefined) {
    if (!content || typeof content === 'undefined') return 1;
    const clean = content.replace(/<\/?[^>]+(>|$)/g, '');
    const numberOfWords = clean.split(/\s/g).length;
    return Math.ceil(numberOfWords / 200);
}
