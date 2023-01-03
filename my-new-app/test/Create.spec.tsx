/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HashRouter as Router } from "react-router-dom";
import Register from '../src/components/Register';
import { InsertTodo } from '../src/database/db';
import '../src/@types/database';

// jest.mock('../src/components/Create', () => {
//   const originalModule = jest.requireActual('../src/components/Create');
//   return {
//     __esModule: true,
//     ...originalModule,
//     //default: jest.fn(() => 'mocked baz'),
//     CreateTodo: jest.fn(() => 'mocked CreateTodo'),
//   };
// });

// jest.spyOn(window.sql, 'insertTodo').mockResolvedValue(1 as never);

const SetTodo = jest.fn();
const SetDueDate = jest.fn();
const CreateTodo = jest.fn();

test('When clicking a button in Create Component, InsertTodo function in a db.ts file is called.', async () => {
  const renderResult: RenderResult = render(
    <Register SetTodo={SetTodo} SetDueDate={SetDueDate} CreateTodo={CreateTodo} />
  );
  const button = screen.getByTestId("createTodoButton");
  await userEvent.click(button);
  expect(CreateTodo).toHaveBeenCalledTimes(1);
});
