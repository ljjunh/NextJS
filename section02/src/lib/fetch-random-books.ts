// async쓰는 이유 : 비동기 함수임을 선언, 비동기함수는 항상 Promise를 반환, async 함수 내에서 await 키워드 사용할수있음
// HTTP 요청은 시간이 걸리는 작업이니까 비동기적으로 처리해야함
import { BookData } from "@/types";

// 비동기 처리를 통해 이 함수가 실행되는 동안 다른 코드가 블로킹(해당 Promise가 해결될때까지 함수 내부에서 잠시 실행을 멈춤) 되지 않음
export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url = `https://onebite-books-server-main-flax.vercel.app/book/random`;

  try {
    // fetch함수는 Promise를 반환하고 await은 이 Promise가 해결될때까지 기다림
    // await을 안쓰면 response.json, response.ok 이런거 못씀 프로미스는 그 데이터를 미래에 제공하겠다는 약속이니까 해결될때까지 기다려야함
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    // JSON 파싱작업도 시간이 걸릴 수 있으므로 비동기적으로 처리
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
