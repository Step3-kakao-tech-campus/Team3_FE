/* eslint-disable @typescript-eslint/no-use-before-define */
interface Props {
  data: {
    game: number;
    average: number;
    maximum: number;
    minimum: number;
  };
}
function RecordSummary({ data }: Props): JSX.Element {
  return (
    <div className="record-summary grid gap-[5%] grid-cols-2 md:grid-cols-4 sm">
      <Card text="Game" number={data.game} />
      <Card text="Average" number={data.average} />
      <Card text="Maximum" number={data.maximum} />
      <Card text="Minimum" number={data.minimum} />
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
