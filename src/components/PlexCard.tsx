import { useLanyard, Activity, LanyardData } from "react-use-lanyard";

function PlexCard() {
	const { loading, status } = useLanyard({
		userId: "574669003755356162",
		socket: true,
	});

    const getImageUrl = (raw: string): string => {
        return `https://${raw.split('https/')[1]}`
    }

    const getActivity = (status: LanyardData): Activity => {
        let act = {} as Activity;
        status.activities.forEach((activity: Activity) => {
            if (activity.application_id == "413407336082833418") {
                act = activity;
            }
        });

        return act;
    }

    const err = (
        <div className="focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 p-3 rounded-md border border-gray-800 dark:border-gray-400 shadow flex flex-row max-w-sm">
            <img
                height={45}
                width={45}
                alt="Idle"
                className="rounded shadow max-h-[45px]"
                src="/img/idle-plex.png"
            />
            <div className="my-auto ml-4">
                <div className="font-semibold text-sm sm:text-regular">
                    Not watching anything
                </div>
                <p className="text-xxs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current h-[1.1em] inline" viewBox="0 0 32 32"><path d="M15.527 0H6.24l10.239 16L6.24 32h9.287L25.76 16L15.527 0z"/></svg> Plex
                </p>
            </div>
        </div>
    );
    if (loading) return err;

    let act: Activity = getActivity(status as LanyardData);
    try {
        if (typeof act.application_id !== 'undefined' && act.application_id != null && act.state != "") {
            return (
                <div className="focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 p-3 rounded-md border border-gray-800 dark:border-gray-400 shadow flex flex-row max-w-sm">
                    <img
                        height={45}
                        width={45}
                        alt={act.assets.large_text}
                        className="rounded shadow max-h-[45px]"
                        src={getImageUrl(act.assets.large_image)}
                    />
                    <div className="my-auto ml-4">
                        <div className="font-semibold text-sm sm:text-regular">
                            {act.state}
                        </div>
                        <p className="text-xxs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current h-[1.1em] inline" viewBox="0 0 32 32"><path d="M15.527 0H6.24l10.239 16L6.24 32h9.287L25.76 16L15.527 0z"/></svg> {act.details} on Plex
                        </p>
                    </div>
                </div>
            )
        } else {
            return err;
        }
    } catch (e) {
        return err;
    }
}

export default PlexCard;