import React from "react";
import {render, screen} from "@testing-library/react";
import UseEffectRender from "./UseEffectRender";

describe("useEffect rendering", () => {
  it("Should render only after async function resolved", async () => {
    render(<UseEffectRender/>);
    expect(screen.queryByText(/I am/)).toBeNull();
    expect(await screen.findByText(/I am/)).toBeInTheDocument();//testing libraryのタイムアウトは約4秒くらい。それ以上時間がかかる場合はタイムアウトのエラーがでる
  })
})

// getByは条件に合致したノード（DOMツリーを形成する一つ一つのオブジェクトをノードという）を返す。ノードが見つからない場合は説明付きの例外をスローする。基本的な形
// queryByは条件に合致した最初のノードを返す。見つからない場合はnullを返す。複数見つかった場合は例外を投げる。存在しない要素をテストする際に使用する。nullを返すカラね
// findByは条件に合致したresolveのpromiseを返す。1000ms以内に見つからなければrejectを返す。UIが変化するのを待つなど、非同期処理の際に使用する