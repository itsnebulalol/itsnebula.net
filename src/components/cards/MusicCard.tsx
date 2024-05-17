import { useLastFM } from 'use-last-fm'

export const MusicCard = () => {
    const truncate = (str: string, n: number) => str.length > n ? str.substr(0, n - 1) + '...' : str;
    const lastFM = useLastFM('itsnebulalol', "df402328b78cd306c726ac744981e67a", 5000, 'large');

    if (['connecting', 'error'].includes(lastFM.status)) return null;

    return (
        <a
            href={lastFM.status === 'playing' ? lastFM.song.url : 'https://last.fm/itsnebulalol'}
            rel="noopener noreferrer"
            target="_blank"
            className="focus:outline-none transition duration-300 ease-in-out transform hover:scale-[1.025] p-3 rounded-md bg-gray-300 dark:bg-gray-800 text-black dark:text-white shadow flex flex-row max-w-sm"
        >
            {lastFM.status === 'idle' && (
                <img
                    height={45}
                    width={45}
                    alt="Song cover art"
                    placeholder="blur"
                    className="rounded shadow max-h-[45px]"
                    src="/img/idle-music.png"
                />
            )}
            {lastFM.status === 'playing' && (
                <img
                    height={45}
                    width={45}
                    alt={lastFM.song.name}
                    className="rounded shadow max-h-[45px]"
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
                    {lastFM.status === 'playing' ?
                    `${truncate(lastFM.song.artist, 35)}` :
                    'Click to open last.fm'}
                </p>
            </div>
        </a>
    )
}