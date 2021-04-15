import React from "react"
import {render, cleanup, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {Provider} from "react-redux"
import Redux from "./Redux"
import {configureStore} from "@reduxjs/toolkit"
import customCounterReducer from "../src/features/customCounter/customCounterSlice"

afterEach(() => {
  cleanup()
})

describe("Redux Integration Test", () => {
  let store;
  beforeEach(()=>{
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer
      }
    })
  })
  it("Should display value increment by 1 per click", ()=> {
    render(<Provider store={store}>
      <Redux/>
    </Provider>)
    userEvent.click(screen.getByText("+"))
    userEvent.click(screen.getByText("+"))
    userEvent.click(screen.getByText("+"))
    expect(screen.getByTestId("count-value")).toHaveTextContent(3)
  })
  it("Should display value decrement by 1 per click", ()=> {
    render(<Provider store={store}>
      <Redux/>
    </Provider>)
    userEvent.click(screen.getByText("-"))
    userEvent.click(screen.getByText("-"))
    expect(screen.getByTestId("count-value")).toHaveTextContent(-2)
  })
  it("Should display value with increment by amount", ()=> {
    render(<Provider store={store}>
      <Redux/>
    </Provider>)
    userEvent.type(screen.getByPlaceholderText("Enter"), "30")
    userEvent.click(screen.getByText("IncrementByAmount"))

    expect(screen.getByTestId("count-value")).toHaveTextContent(30)
  })
})
