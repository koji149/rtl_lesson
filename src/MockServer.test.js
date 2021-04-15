import React from "react"
import {render, screen, cleanup} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {rest} from "msw"
import {setupServer} from "msw/node"
import MockServer from "./MockServer"

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req,res,ctx)=>{
    return res(ctx.status(200), ctx.json({username: "Bred dummy"}));
  })
)

beforeAll(() => server.listen())//テストファイルの最初の一回に実行される
afterEach(() => {
  server.resetHandlers()
  cleanup();
})//各テストケースが呼び出される毎に実行

afterAll(()=>server.close());//テストファイルの最後の一回に実行される

describe("Mocking API", () => {
  it("[Fetch success]Should display fetched data correctly and button disabled", async()=>{
    render(<MockServer/>);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText("Bred dummy")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("disabled")//disabeld属性がbuttonに存在するかどうか
  })
  it("[Fetch failure]Should display error msg, no render heading and button abled", async()=>{
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/users/1", (req,res,ctx)=>{
        return res(ctx.status(404));
      })
    )//server.useによってこのit内のみserverの設定が変更される
    render(<MockServer/>);
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("Fetching Failed !")
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled")
  })
})