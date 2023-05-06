import { useLanyard, Activity, LanyardData } from "react-use-lanyard";

function VSCodeCard() {
    const truncate = (str: string, n: number) => str.length > n ? str.substr(0, n - 1) + '...' : str;
    
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
            if (activity.application_id == "782685898163617802") {
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
                alt="Idling"
                className="rounded shadow max-h-[45px]"
                src="/img/idle-vscode.png"
            />
            <div className="my-auto ml-4">
                <div className="font-semibold text-sm sm:text-regular">
                    Idling
                </div>
                <p className="text-xxs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current h-[1.1em] inline" viewBox="0 0 32 32"><path d="m11.72 18.685l-6.883 5.184L2 22.922L9 16L2 9.077l2.837-.947l6.883 5.184l11.433-11.3L30 4.922v22.155l-6.847 2.909ZM15.287 16l7.865 5.923V10.076Z"/></svg> Visual Studio Code
                </p>
            </div>
        </div>
    );
    if (loading) return err;

    let act: Activity = getActivity(status as LanyardData);
    try {
        if (act.details != "Idling" && typeof act.application_id !== 'undefined' && act.application_id != null && typeof act.state !== 'undefined' && typeof act.assets !== 'undefined') {
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
                            {act.state.split(":")[0]}
                        </div>
                        <p className="text-xxs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current h-[1.1em] inline" viewBox="0 0 32 32"><path d="m11.72 18.685l-6.883 5.184L2 22.922L9 16L2 9.077l2.837-.947l6.883 5.184l11.433-11.3L30 4.922v22.155l-6.847 2.909ZM15.287 16l7.865 5.923V10.076Z"/></svg> Visual Studio Code
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

export default VSCodeCard;