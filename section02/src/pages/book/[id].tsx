import fetchOneBook from "@/lib/fetch-one-book";
import style from "@/pages/book/[id].module.css";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [
      // url파라미터 값들은 반드시 문자열로 설정해야함
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
    // 경로 설정읋 하지 않은 동적경로일때
    // false : 404 Notfound
    // blocking : SSR방식으로 실시간 페이지 생성, 페이지가 생성될때까지 아무것도 안보임
    // true : SSR방식 + 데이터가 없는 폴백 상태의 페이지부터 반환, 데이터는 후속처리
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>북스</title>
          {/* 소셜미디어에 공유될 때 표시될 이미지 */}
          <meta property="og:image" content="/thumbnail.png" />
          {/*브라우저 탭에 표시되는 페이지 제목, 검색엔진결과에서의 페이지 제목 */}
          <meta property="og:title" content="북스" />
          {/* 소셜미디어에 공유될때 표시될 간단한 설명 */}
          <meta
            property="og:description"
            content="북스에 등록된 도서들을 만나보세요"
          />
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  }

  if (!book) return "문제가 발생했습니다 다시 시도하세요";
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <>
      <Head>
        <title>{title}</title>
        {/* 소셜미디어에 공유될 때 표시될 이미지 */}
        <meta property="og:image" content={coverImgUrl} />
        {/*브라우저 탭에 표시되는 페이지 제목, 검색엔진결과에서의 페이지 제목 */}
        <meta property="og:title" content={title} />
        {/* 소셜미디어에 공유될때 표시될 간단한 설명 */}
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
