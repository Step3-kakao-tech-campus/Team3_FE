/* eslint-disable @typescript-eslint/no-use-before-define */
interface Props {
  game: 20;
  average: 160;
  maximum: 180;
  minimum: 110;
}
function RecordSummary({ game, average, maximum, minimum }: Props) {
  return (
    <div className="record-summary grid gap-[5%] grid-cols-2 md:grid-cols-4 sm">
      <Card text="Game" number={game} />
      <Card text="Average" number={average} />
      <Card text="Maximum" number={maximum} />
      <Card text="Minimum" number={minimum} />
    </div>
  );
}

export default RecordSummary;

function Card({ text, number }: { text: string; number: number }) {
  return (
    <div className="card relative min-h-[80px] rounded-md shadow-lg bg-white py-1 px-2">
      <span className="text-sm leading-none">{text}</span>
      <span className="text-xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {number}
      </span>
    </div>
  );
}
