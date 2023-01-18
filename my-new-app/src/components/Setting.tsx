import React, { useEffect, useState } from 'react';
import Header from './Header';
import NotificationInterval from './NotificationInterval';
import { NotificationIntervalHook } from '../hooks/CustomHooks';

const Setting: React.FC = () => {
  const { SetInterval, UpdateNotification, setViewInterval, viewInterval } = NotificationIntervalHook();

  useEffect(() => {
    (async () => {
      const res = await window.sql.selectNotification();
      setViewInterval(res.interval);
    })();
  }, []);

  return (
    <>
    <Header />
    <p>通知が期限の何分前から出されるかを調整できます</p>
    <p>※現在の通知タイミング"{viewInterval}分前"から</p>
    <NotificationInterval
      SetInterval={ SetInterval }
      UpdateNotification={ UpdateNotification }
    />
    </>
  )
}

export default Setting;