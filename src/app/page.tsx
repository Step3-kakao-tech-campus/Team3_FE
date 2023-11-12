import InnerContainer from "@/components/atoms/InnerContainer";
import SearchedLocationDisplay from "@/components/atoms/SearchedLocationDisplay";
import PostFilter from "@/components/molecules/PostFilter";
import RegionSearchBar from "@/components/molecules/RegionSearchBar";
import { PageSearchParams } from "@/types/pageSearchParams";
import Link from "next/link";
import { BsPen } from "react-icons/bs";
import HydratePostList from "@/components/molecules/PostList/HydratePostList";

export default function Home({ searchParams }: PageSearchParams) {
  return (
    <main>
      <InnerContainer>
        {/* 배너 이미지 추가 */}
        <div className="main-contents flex flex-col gap-2 m-10 md:mt-4 md:m-2">
          <RegionSearchBar searchParams={searchParams} />
          <div className="flex justify-between mt-6">
            <PostFilter searchParams={searchParams} />
            <Link
              href="/create"
              className="px-2 py-1 ring-gray-400 ring-inset font-bold filter hover:brightness-95 bg-thunder text-white rounded-full md:text-sm"
            >
              <BsPen className="inline mr-1" />
              <span className="font-normal">글쓰기</span>
            </Link>
          </div>
          <SearchedLocationDisplay searchParams={searchParams} />
          <HydratePostList searchParams={searchParams} />
        </div>
      </InnerContainer>
    </main>
  );
}
