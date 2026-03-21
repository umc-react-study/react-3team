// 헤더 (네비게이션)
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/redux">Redux</NavLink>
        <NavLink to="/context">Context</NavLink>
        <NavLink to="/zustand">Zustand</NavLink>
      </nav>
    </header>
  );
}
