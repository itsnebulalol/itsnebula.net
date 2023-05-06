import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function get(context: any) {
    return rss({
        title: 'Blog | Nebula',
        description: 'Nebula is a developer from the US.',
        site: "https://itsnebula.net",
        items: await pagesGlobToRssItems(import.meta.glob('./blog/*.md')),
        customData: `<language>en-us</language>`,
    });
}