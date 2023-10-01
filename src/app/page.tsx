"use client";

import InnerContainer from "@/components/atoms/InnerContainer";
import PostFilter from "@/components/molecules/PostFilter";
import RegionSearchBar from "@/components/molecules/RegionSearchBar";
import { PageSearchParams } from "@/types/pageSearchParams";

export default function Home({ searchParams }: PageSearchParams) {
  return (
    <main>
      <InnerContainer>
        <RegionSearchBar searchParams={searchParams} />
        <PostFilter searchParams={searchParams} />
      </InnerContainer>
    </main>
  );
}
