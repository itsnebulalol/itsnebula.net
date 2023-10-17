import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context: any) {
    return rss({
        title: 'Nebula\'s Blog',
        description: 'Nebula is a developer from the US.',
        site: "https://itsnebula.net",
        items: await pagesGlobToRssItems(import.meta.glob('./blog/*.md')),
        customData: `<language>en-us</language>`,
    });
}