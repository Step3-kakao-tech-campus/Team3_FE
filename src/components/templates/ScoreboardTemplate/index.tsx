import RecordFilter from "@/components/molecules/RecordFilter";
import RecordOverview from "@/components/molecules/RecordOverview";
import RecordSearchBar from "@/components/molecules/RecordSearchBar";
import RecordCardList from "@/components/organisms/RecordCardList";

function ScoreboardTemplate({ userId }: { userId: number }): JSX.Element {
  return (
    <div className="scoreboard flex flex-col gap-5">
      <RecordOverview userId={userId} />
      <h2 className="title text-xl">참여 기록</h2>
      <RecordFilter />
      <RecordSearchBar />
      <RecordCardList />
    </div>
  );
}

export default ScoreboardTemplate;
