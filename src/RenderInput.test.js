import React from "react"
import {render, screen, cleanup} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import RenderInput from "./RenderInput"

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<RenderInput/>)
    expect(screen.getByRole("button")).toBeTruthy()
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy();
  })
})

describe("Input form onChange event", () => {
  it("Should update input value correctly", () => {
    render(<RenderInput/>);
    const inputValue = screen.getByPlaceholderText("Enter");//placeholder取得
    userEvent.type(inputValue, "test")//inputにtestと入力
    expect(inputValue.value).toBe("test");//しっかりuseStateによって値が変わっているか
  })
})

describe("Console button conditionaly triggered", () => {
  it("Should not trigger output function", () => {
    const outputConsole = jest.fn();
    render(<RenderInput outputConsole={outputConsole}/>)
    userEvent.click(screen.getByRole("button"))
    expect(outputConsole).not.toHaveBeenCalled()
  })
  it("Should trigger output function", () => {
    const outputConsole = jest.fn();//ダミー（モック関数）作成
    render(<RenderInput outputConsole={outputConsole}/>)//propsで渡す処理のtest.ver
    const inputValue = screen.getByPlaceholderText("Enter");//placeholder取得
    userEvent.type(inputValue, "test")//inputにtestと入力
    userEvent.click(screen.getByRole("button"))
    expect(outputConsole).toHaveBeenCalledTimes(1)
    })
    
})