/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, renderHook, act, fireEvent } from '@testing-library/react';
import Register from '../src/components/Register';
import TodoTableForDelete from '../src/components/TodoTableForDelete';
import TodoTableForUpdate from '../src/components/TodoTableForUpdate';
import { ContentHook, DueDateHook, TodoHook } from '../src/hooks/CustomHooks';
import '@testing-library/jest-dom'

// test("Hooks test", async () => {
//   const { result } = renderHook(() => MyCustomHook());
//   expect(result.current.count).toBe(0);
//   await act(() => result.current.Increment());
//   expect(result.current.count).toBe(1);
//   const Increment = jest.fn();
//   const { getByText } = render(<DummyRender count={0} Increment={Increment}/>);
//   await act(() => userEvent.click(getByText(/Increment/)));
//   expect(Increment).toHaveBeenCalledTimes(1);
// });

// test('renders a message', () => {
//   const { asFragment, getByText } = render(<Greeting />);
//   expect(getByText('Hello, World!')).toBeInTheDocument();
//   expect(asFragment()).toMatchInlineSnapshot(`
//     <h1>Hello, World!</h1>
//   `);
// });

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

describe("DOM Operation", () => {

  describe("For Create Component", () => {
    const SetContent = jest.fn();
    const SetDueDate = jest.fn();
    const CreateTodo = jest.fn();

    test("When clicking a button in Register Component, CreateTodo function is called.", async () => {
      const { getByText } = render(
        <Register SetContent={ SetContent } SetDueDate={ SetDueDate } CreateTodo={ CreateTodo } />
      );
      fireEvent.click(getByText(/To create/));
      expect(CreateTodo).toHaveBeenCalledTimes(1);
    });

    test("When entering value to a textarea in Register Component, SetContent function is called and then argument value is set to content-state.", async () => {
      const { getByTestId } = render(
        <Register SetContent={ SetContent } SetDueDate={ SetDueDate } CreateTodo={ CreateTodo } />
      );
      fireEvent.change(getByTestId("SetContent"), { target: { value: 'bar' } });
      expect(SetContent).toHaveBeenCalledTimes(1);
      const { result } = renderHook(() => ContentHook());
      expect(result.current.content).toBe("");
      await act(() => result.current.SetContent("foo"));
      expect(result.current.content).toBe("foo");
    });

    test("When entering value to a input in Register Component, SetDueDate function is called and then argument value is set to dueDate-state.", async () => {
      const { getByTestId } = render(
        <Register SetContent={ SetContent } SetDueDate={ SetDueDate } CreateTodo={ CreateTodo } />
      );
      fireEvent.change(getByTestId("SetDueDate"), { target: { value: 'bar' } });
      expect(SetDueDate).toHaveBeenCalledTimes(1);
      const { result } = renderHook(() => DueDateHook());
      expect(result.current.dueDate).toBe("");
      await act(() => result.current.SetDueDate("hoge"));
      expect(result.current.dueDate).toBe("hoge");
    });
  });

  describe("For Delete Component", () => {
    const todos = [{ id: 1, content: "myTask", due_date: "2023-01-31" }];
    const DeleteTodo = jest.fn();
    test("When clicking a todo in TodoTableForDelete Component, DeleteTodo function is called.", () => {
      const { getByTestId } = render(
        <TodoTableForDelete todos={todos} DeleteTodo={DeleteTodo} />
      );
      fireEvent.click(getByTestId("DeleteTodo"));
      expect(DeleteTodo).toHaveBeenCalledTimes(1);
    });
  });

  describe("For Todo Component", () => {
    const todos = [{ id: 1, content: "myTask", due_date: "2023-01-31" }];
    const SetContent = jest.fn();
    const SetDueDate = jest.fn();
    const UpdateContent = jest.fn();
    const UpdateDueDate = jest.fn();

    test("When occurring each event set to DOM, specified function is called.", () => {
      const { getByTestId } = render(
        <TodoTableForUpdate todos={todos} SetContent={SetContent} SetDueDate={SetDueDate} UpdateContent={UpdateContent} UpdateDueDate={UpdateDueDate} />
      );
      const inputForContent = getByTestId("UpdateContent");
      fireEvent.change(inputForContent, { target: { value: 'bar' } });
      expect(SetContent).toHaveBeenCalledTimes(1);
      fireEvent.blur(inputForContent);
      expect(UpdateContent).toHaveBeenCalledTimes(1);
      const inputForDueDate = getByTestId("UpdateDueDate");
      fireEvent.change(inputForDueDate, { target: { value: 'foo' } });
      expect(SetDueDate).toHaveBeenCalledTimes(1);
      fireEvent.blur(inputForDueDate);
      expect(UpdateDueDate).toHaveBeenCalledTimes(1);
    });

    test("SetContent function correctly works.", async () => {
      const { result } = renderHook(() => TodoHook());
      expect(result.current.content).toBe("");
      expect(result.current.isChangedContent).toBe(false);
      await act(() => result.current.SetContent("foo"));
      expect(result.current.content).toBe("foo");
      expect(result.current.isChangedContent).toBe(true);
    });

    test("SetDueDate function is correctly works.", async () => {
      const { result } = renderHook(() => TodoHook());
      expect(result.current.dueDate).toBe("");
      expect(result.current.isChangedDueDate).toBe(false);
      await act(() => result.current.SetDueDate("bar"));
      expect(result.current.dueDate).toBe("bar");
      expect(result.current.isChangedDueDate).toBe(true);
    });
  });
});