/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../src/components/Register';
import '@testing-library/jest-dom'

const Greeting: React.FC = () => {
  return (
    <h1>Hello, World!</h1>
  )
}

test('renders a message', () => {
  const { asFragment, getByText } = render(<Greeting />);
  expect(getByText('Hello, World!')).toBeInTheDocument();
  expect(asFragment()).toMatchInlineSnapshot(`
    <h1>Hello, World!</h1>
  `);
});

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

// const SetTodo = jest.fn();
// const SetDueDate = jest.fn();
// const CreateTodo = jest.fn();

// describe("DOM Operation", () => {
//   test("When clicking a button in Create Component, the CreateTodo function is called.", async () => {
//     const renderResult: RenderResult = render(
//       <Register SetTodo={ SetTodo } SetDueDate={ SetDueDate } CreateTodo={ CreateTodo } />
//     );
//     const button = screen.getByTestId("createTodoButton");
//     await userEvent.click(button);
//     expect(CreateTodo).toHaveBeenCalledTimes(1);
//   });
// });