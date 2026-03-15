import RatingContainer from "./components/rating/RatingContainer";
import { InfoLabel, InfoValue } from "./components/common/Info";
import { Accordion } from "./components/accordion/Accordion";

function App() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>1주차 패턴 실습</h1>

      <section style={{ marginBottom: "40px" }}>
        <h3>1. SRP (단일 책임 원칙)</h3>
        <div style={{ border: "1px solid #ddd", padding: "10px" }}>
          <InfoLabel text="이름" />
          <InfoValue text="배수현" />
        </div>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h3>2. Presentational vs Container</h3>
        <RatingContainer />
      </section>

      <section>
        <h3>3. Compound Component (Accordion)</h3>
        <Accordion.Root>
          <Accordion.Item value="react">
            <Accordion.Trigger value="react">React란 무엇인가요?</Accordion.Trigger>
            <Accordion.Panel value="react">사용자 인터페이스를 만들기 위한 라이브러리입니다.</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="pattern">
            <Accordion.Trigger value="pattern">왜 패턴을 쓰나요?</Accordion.Trigger>
            <Accordion.Panel value="pattern">유지보수가 쉽고 깔끔한 코드를 짜기 위해서입니다!</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      </section>
    </div>
  );
}

export default App;
