import { useLastFM } from 'use-last-fm'

export const ActivityCard = () => {
    const truncate = (str: string, n: number) => str.length > n ? str.substr(0, n - 1) + '...' : str;
    // The last.fm api keys aren't even private :skull:
    const lastFM = useLastFM('itsnebulalol', "df402328b78cd306c726ac744981e67a", 5000, 'large');

    if (['connecting', 'error'].includes(lastFM.status)) return null;

    return (
        <a
            href={lastFM.status === 'playing' ? lastFM.song.url : 'https://last.fm/itsnebulalol'}
            rel="noopener noreferrer"
            target="_blank"
            className="focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 p-3 rounded-md border border-gray-800 dark:border-gray-400 shadow flex flex-row max-w-sm"
        >
            {lastFM.status === 'idle' && (
                <img
                    height={45}
                    width={45}
                    alt="Song cover art"
                    placeholder="blur"
                    className="rounded shadow"
                    src="/img/song.webp"
                />
            )}
            {lastFM.status === 'playing' && (
                <img
                    height={45}
                    width={45}
                    alt={lastFM.song.name}
                    className="rounded shadow"
                    src={lastFM.song.art}
                />
            )}
            <div className="my-auto ml-4">
                <div className="font-semibold text-sm sm:text-regular">
                    {lastFM.status === 'playing' ?
                    `Listening to ${truncate(lastFM.song.name, 25)}` :
                    'Not listening to anything'}
                </div>
                <p className="text-xxs">
                    Apple Music
                </p>
            </div>
        </a>
    )
}