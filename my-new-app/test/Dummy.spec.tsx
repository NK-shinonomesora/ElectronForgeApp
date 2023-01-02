/**
 * @jest-environment jsdom
 */

import React, { createContext } from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { HashRouter as Router } from "react-router-dom"
import Create, { CreateTodo } from "../src/components/Create";
import Dummy from '../src/components/Dummy';
import { InsertTodo } from '../src/database/db';
import '../src/@types/database';

jest.mock('../src/components/Create', () => {
  const originalModule = jest.requireActual('../src/components/Create');
  return {
    __esModule: true,
    ...originalModule,
    //default: jest.fn(() => 'mocked baz'),
    CreateTodo: jest.fn(() => 'mocked CreateTodo'),
  };
});

type DummyFunc = () => void
interface CreateProp {
  DummyFunc: DummyFunc
}

const DummyFunc = jest.fn();
const CreateContext = createContext<CreateProp | null>(null);

// jest.spyOn(window.sql, 'insertTodo').mockResolvedValue(1 as never);

test('When clicking a button in Create Component, InsertTodo function in a db.ts file is called.', async () => {
  const renderResult: RenderResult = render(
    <Router>
      {/* <CreateContext.Provider value={{ DummyFunc }}> */}
        <Dummy />
      {/* </CreateContext.Provider> */}
    </Router>
  );
  //const button = screen.getByTestId("createTodoButton");
  // await userEvent.click(button);
  // expect(DummyFunc).toHaveBeenCalledTimes(1);
});
