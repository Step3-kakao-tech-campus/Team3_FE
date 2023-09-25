import { MdAlarm } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import Badge from "@/components/atoms/Badge";
import Image from "next/image";
import formatDateToString from "@/utils/formatDateToString";

export interface PostData {
  id: number;
  title: string;
  dueTime: Date;
  startTime: Date;
  districtName: string;
  userName: string;
  profileImage: string | null;
  isClose: boolean;
  currentNumber: number;
}

interface Props {
  data: PostData;
}

function PostCard({ data }: Props) {
  return (
    <section className="post-card flex flex-col gap-6 p-7 rounded-2xl shadow hover:scale-[103%] transition">
      <div className="post-title-upper">
        <Badge isClose={data.isClose} />
        <span className="text-sm mx-2">
          <MdPeopleAlt className="inline mr-1 text-neutral-400" />
          <span>참석 </span>
          <span className="text-[#37D629]">{data.currentNumber}</span>
        </span>
        <span className="text-neutral-400">
          <span className="mr-1">모집마감</span>
          <span>{formatDateToString(data.dueTime)}</span>
        </span>
      </div>
      <div className="post-title-wrapper">
        <h1 className="post-title text-2xl">{data.title}</h1>
      </div>
      <div className="post-title-lower flex w-full justify-between">
        <div className="post-info-wrapper text-neutral-400">
          <p className="district-name">
            <MdLocationPin className="inline" />
            <span>{data.districtName}</span>
          </p>
          <p className="start-time">
            <MdAlarm className="inline" />
            <span>{formatDateToString(data.startTime)}</span>
          </p>
        </div>
        <div className="user-profile flex items-center h-10">
          {/* // Image 컴포넌트로 외부 경로 이미지 로드시 next.config.js를 설정해 줘야해서 일단 img 태그로 구현 */}
          {/* <Image alt="유저 프로필 이미지" src={data.profileImage ? `임시APIURL${profileImage}` : "기본이미지경로"} fill={true}/> */}
          <img
            alt="유저 프로필 이미지"
            src={
              data.profileImage
                ? `임시APIURL${data.profileImage}`
                : "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
            }
            className="user-profile-image rounded-full h-full"
          />
          <span className="user-name text-2xl mx-1">{data.userName}</span>
        </div>
      </div>
    </section>
  );
}

export default PostCard;
