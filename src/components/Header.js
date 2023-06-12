import "./Header.css";
import { React } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

export default function Header() {
  return (
    <nav className="headerContainer">
      <ul className="lists">
        <li>Coins</li>
        <li>Exchanges</li>
        <li>Swap</li>
      </ul>
      <img
        className="logoMain"
        src="https://coincap.io/static/logos/black.svg"
        alt="logo"
        width="100"
      />
      <ul className="lists">
        <li>USD</li>
        <li>English</li>
        <li>
          <SearchIcon />
        </li>
        <li>
          <SettingsSuggestIcon />
        </li>
      </ul>
    </nav>
  );
}
