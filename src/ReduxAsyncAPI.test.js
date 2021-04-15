import React from "react"
import {render, screen, cleanup} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {rest} from "msw"
import {setupServer} from "msw/node"
import {Provider} from "react-redux"
import {configureStore} from "@reduxjs/toolkit"
import customCounterReducer from "../src/features/customCounter/customCounterSlice";

import ReduxAsync from "./ReduxAsync"

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req,res,ctx)=>{
    return res(ctx.status(200), ctx.json({username: "Bred dummy"}));
  })
)

beforeAll(()=>server.listen());
afterEach(()=>{
  server.restoreHandlers();
  cleanup();
});
afterAll(()=>server.close())

describe("Redux Async API Mocking", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer
      }
    })
  })
  it("[Fetch success] Should display username in h3 tag", async () => {
    render(<Provider store={store}>
      <ReduxAsync/>
    </Provider>);
    expect(screen.queryByRole("heading")).toBeNull()
    userEvent.click(screen.getByText("fetchJSON"));
    expect(await screen.findByText("Bred dummy")).toBeInTheDocument()
  })
  it("[Fetch failed] Should display anonymous in h3 tag", async () => {
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/users/1", (req,res,ctx)=>{
        return res(ctx.status(404));
      })
    )//server.useによってこのit内のみserverの設定が変更される
    render(<Provider store={store}>
      <ReduxAsync/>
    </Provider>);
    expect(screen.queryByRole("heading")).toBeNull()
    userEvent.click(screen.getByText("fetchJSON"));
    expect(await screen.findByText("anonymous")).toBeInTheDocument()
  })
})