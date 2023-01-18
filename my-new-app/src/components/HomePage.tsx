import React from "react";
import Header from "./Header";

const HomePage: React.FC = () => {
  return (
    <>
    <Header />
    <h2>本Todo管理アプリについて</h2>
    <ol>
      <li>新しくタスクを登録する時は"Create"ページから</li>
      <li>登録済みのタスクは"Todo"ページから閲覧/編集が可能</li>
      <li>完了済みのタスクは"Complete"ページに蓄積</li>
      <li>"Setting"ページからタスクの通知タイミングを調整可能</li>
    </ol>
    </>
  )
}

export default HomePage;