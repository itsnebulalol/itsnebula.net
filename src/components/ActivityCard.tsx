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
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current h-[1.1em] inline" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg> Apple Music
                </p>
            </div>
        </a>
    )
}