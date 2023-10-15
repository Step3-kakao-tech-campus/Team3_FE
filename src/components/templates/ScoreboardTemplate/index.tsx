import RecordSummary from "@/components/atoms/RecordSummary";
import RecordFilter from "@/components/molecules/RecordFilter";
import RecordSearchBar from "@/components/molecules/RecordSearchBar";
import RecordCardList from "@/components/organisms/RecordCardList";

function ScoreboardTemplate(): JSX.Element {
  return (
    <div className="scoreboard flex flex-col gap-5">
      <h1 className="title text-2xl">{"김볼링"}님의 기록</h1>
      <RecordSummary data={{ game: 20, average: 160, maximum: 180, minimum: 110 }} />
      <h2 className="title text-xl">참여 기록</h2>
      <RecordFilter />
      <RecordSearchBar />
      <RecordCardList />
    </div>
  );
}

export default ScoreboardTemplate;
