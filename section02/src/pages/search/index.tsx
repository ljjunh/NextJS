import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <div>
      <Head>
        <title>북스 - 검색결과</title>
        {/* 소셜미디어에 공유될 때 표시될 이미지 */}
        <meta property="og:image" content="/thumbnail.png" />
        {/*브라우저 탭에 표시되는 페이지 제목, 검색엔진결과에서의 페이지 제목 */}
        <meta property="og:title" content="북스 - 검색결과" />
        {/* 소셜미디어에 공유될때 표시될 간단한 설명 */}
        <meta
          property="og:description"
          content="북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      {books?.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
