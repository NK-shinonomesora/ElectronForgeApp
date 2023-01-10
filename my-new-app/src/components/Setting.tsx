import React from 'react';
import Header from './Header';
import NotificationInterval from './NotificationInterval';
import { NotificationIntervalHook } from '../hooks/CustomHooks';

const Setting: React.FC = () => {
  const { interval, SetInterval, UpdateNotification } = NotificationIntervalHook();

  return (
    <>
    <Header />
    <NotificationInterval
      SetInterval={ SetInterval }
      UpdateNotification={ UpdateNotification }
    />
    </>
  )
}

export default Setting;