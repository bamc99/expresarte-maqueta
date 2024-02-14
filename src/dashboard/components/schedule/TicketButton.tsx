
export const TicketButton = ({
    duration,
    title
}: {
    duration: number
    title: string
}) => {

    const calcDivHeight = (duration: number) => {
        const defaultPixels = 44;

        const result = (duration / 60) * defaultPixels;

        return result;
    }

    const divHeight = calcDivHeight(duration);

    return (
        <div className={`h-[${divHeight}px]`}>
            <span>{title}</span>
        </div>
    )
}
