import RecordSummary from "@/components/atoms/RecordSummary";
import RecordCard from "@/components/molecules/RecordCard";
import RecordFilter from "@/components/molecules/RecordFilter";
import RecordSearchBar from "@/components/molecules/RecordSearchBar";

function ScoreboardTemplate() {
  const dummy = {
    id: 2,
    title: "오늘 7시에 부산대 락볼링장에서 게임하실분~~",
    dueTime: "2023-09-07T21:00:00",
    districtName: "부산광역시 금정구 장전2동",
    startTime: "2023-09-09T19:00:00",
    currentNumber: 1,
    isClose: true,
    scores: [
      {
        id: 1,
        score: 180,
        scoreImage: "/score-images/1.jpg",
      },
      {
        id: 2,
        score: 210,
        scoreImage: null,
      },
    ],
    members: [
      {
        id: 2,
        name: "최볼링",
        profileImage: null,
        isRated: true,
      },
      {
        id: 3,
        name: "이볼링",
        profileImage: null,
        isRated: false,
      },
      {
        id: 4,
        name: "최볼링",
        profileImage: null,
        isRated: true,
      },
      {
        id: 1,
        name: "김볼링",
        profileImage: null,
        isRated: false,
      },
    ],
  };
  return (
    <div className="scoreboard flex flex-col gap-5">
      <h1 className="title text-2xl">{"김볼링"}님의 기록</h1>
      <RecordSummary game={20} average={160} maximum={180} minimum={110} />
      <h2 className="title text-xl">참여 기록</h2>
      <RecordFilter />
      <RecordSearchBar />
      <RecordCard data={dummy} />
    </div>
  );
}

export default ScoreboardTemplate;
