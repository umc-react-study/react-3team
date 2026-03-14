import Card from "../component/Card";
import DarkModeToggle from "../component/DarkModeToggle";

export default function Homepage() {
  return (
    <DarkModeToggle>
      {(dark: boolean) => (
        <div className="flex flex-col items-center gap-6 w-full max-w-xl">
          
          {/* Card 1: 오늘의 명언 */}
          <Card darkMode={dark}>
            <Card.Header>오늘의 명언 ✨</Card.Header>
            <Card.Body>
              <p className="italic">
                "행복은 습관이다. 그것을 몸에 배게 하라." – 존 드라이든
              </p>
            </Card.Body>
          </Card>

          {/* Card 2: 오늘의 날씨 */}
          <Card darkMode={dark}>
            <Card.Header>오늘의 날씨 ☀️</Card.Header>
            <Card.Body>
              <p>서울: 맑음, 9°C</p>
              <p>따뜻하게 입고 외출하세요!</p>
            </Card.Body>
          </Card>

          {/* Card 3: 추천 영화 */}
          <Card darkMode={dark}>
            <Card.Header>오늘의 추천 영화 🎬</Card.Header>
            <Card.Body>
              <p>"인셉션 (Inception)" – 꿈과 현실의 경계를 탐험하는 흥미진진한 영화</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">평점: ★★★★☆</p>
            </Card.Body>
          </Card>

          {/* Card 4: 오늘의 추천 책 */}
          <Card darkMode={dark}>
            <Card.Header>오늘의 추천 책 📚</Card.Header>
            <Card.Body>
              <p><strong>『그릿(Grit)』 – 앤절라 더크워스</strong></p>
              <p className="mt-1">
                성공은 재능보다는 끈기와 열정에서 나온다는 메시지를 전하는 책.  
                자신이 목표한 일을 꾸준히 이어가는 힘을 배우고 싶다면 추천!
              </p>
            </Card.Body>
          </Card>

        </div>
      )}
    </DarkModeToggle>
  );
}