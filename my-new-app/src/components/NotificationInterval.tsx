import React from 'react';

interface NotificationIntervalProp {
  SetInterval: (newInterval: string) => void
  UpdateNotification: () => void
}

const NotificationInterval: React.FC<NotificationIntervalProp> = ({ SetInterval, UpdateNotification }) => {
  return (
    <>
    <input
      type="number"
      max="60"
      min="1"
      step="1"
      placeholder="1以上60以下の数字を入力"
      onChange={(e) => SetInterval(e.target.value)}
    >
    </input>
    <button onClick={() => UpdateNotification()}>通知タイミングを変更</button>
    </>
  )
}

export default NotificationInterval;