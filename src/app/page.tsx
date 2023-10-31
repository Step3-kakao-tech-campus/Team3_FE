import { Suspense } from "react";
import InnerContainer from "@/components/atoms/InnerContainer";
import SearchedLocationDisplay from "@/components/atoms/SearchedLocationDisplay";
import PostFilter from "@/components/molecules/PostFilter";
import PostList from "@/components/molecules/PostList";
import RegionSearchBar from "@/components/molecules/RegionSearchBar";
import { PageSearchParams } from "@/types/pageSearchParams";
import Link from "next/link";
import { BsPen } from "react-icons/bs";
import PostCardSkeleton from "@/components/molecules/PostCard/Skeleton";

export default function Home({ searchParams }: PageSearchParams) {
  return (
    <main>
      <InnerContainer>
        {/* 배너 이미지 추가 */}
        <div className="main-contents flex flex-col gap-2 m-10">
          <RegionSearchBar searchParams={searchParams} />
          <div className="flex justify-between mt-6">
            <PostFilter searchParams={searchParams} />
            <Link
              href="/create"
              className="px-2 py-1 ring-gray-400 ring-inset font-bold filter hover:brightness-95 bg-thunder text-white rounded-full"
            >
              <BsPen className="inline mr-1" />
              <span className="font-normal">글쓰기</span>
            </Link>
          </div>
          <SearchedLocationDisplay searchParams={searchParams} />
          <Suspense fallback={<PostCardSkeleton />}>
            <PostList searchParams={searchParams} />
          </Suspense>
        </div>
      </InnerContainer>
    </main>
  );
}
