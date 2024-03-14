import { useEffect, useRef, useState } from "react";
import {
  DownArrowIcon,
  EmptyStarIcon,
  MemoIcon,
  PlusIcon,
  StarIcon,
  UpArrowIcon,
} from "../../components/Icons";
import "./content.css";
import { supabase } from "../../lib/supabase";

export default function App() {
  const [isClose, setClose] = useState(false);
  const [isMemo, setMemo] = useState(false);
  const [nowMemo, setNowMemo] = useState<any>([]);
  const [nowDescription, setDescription] = useState("");
  const [isStarModal, setStarModal] = useState(false);
  const descriptionRef = useRef<any>("");
  const memoRef = useRef<any>("");
  const [isHasUrl, setHasUrl] = useState(false);

  useEffect(() => {
    getUrl();
  }, []);

  const matchUrl = async (data: any) => {
    let hasUrlArray = data.filter((data: any) => {
      if (data.url === window.location.href) {
        return true;
      }
    });
    if (hasUrlArray.length >= 1) {
      setHasUrl(true);
      setDescription(hasUrlArray[0].description);
    } else {
      setHasUrl(false);
    }
  };

  const getUrl = async () => {
    const { data } = await supabase.from("url").select("*");
    matchUrl(data);
    getMemo();
  };

  const getMemo = async () => {
    const { data, error } = await supabase
      .from("url")
      .select(`*, memo(*)`)
      .eq("url", window.location.href);

    if (error) throw new Error(`에러!! ${error.message}`);
    if (data) {
      setNowMemo(data[0]?.memo);
    }
  };

  const createMemo = async () => {
    const { data, error } = await supabase
      .from("memo")
      .insert([{ url: window.location.href, memo: memoRef.current }])
      .select();
    console.log(data, error);
    memoRef.current = "";
    setMemo(false);
    getMemo();
  };

  const starUrl = async () => {
    const { data, error } = await supabase
      .from("url")
      .insert([{ url: window.location.href }])
      .select();
    console.log(data, error);
    descriptionRef.current = "";
    getUrl();
    setStarModal(true);
  };
  const updateDescription = async () => {
    const { error } = await supabase
      .from("url")
      .update({
        description: descriptionRef.current,
      })
      .eq("url", window.location.href);
    console.log(error);
    descriptionRef.current = "";
    getUrl();
    setStarModal(false);
  };

  const deleteStar = async () => {
    const { error } = await supabase
      .from("url")
      .delete()
      .eq("url", window.location.href);
    if (error) throw new Error(`에러!! ${error.message}`);
    setStarModal(false);
    getUrl();
    setDescription("");
    setMemo(false);
  };

  const deleteMemo = async (memoId: number) => {
    const { error } = await supabase.from("memo").delete().eq("id", memoId);
    if (error) throw new Error(`에러!! ${error.message}`);
    getMemo();
  };

  return (
    <>
      <div className="bookmark-content-wrap">
        {isClose ? (
          <UpArrowIcon onClick={() => setClose((prev) => !prev)} />
        ) : (
          <DownArrowIcon onClick={() => setClose((prev) => !prev)} />
        )}
        <div className="star-wrap">
          {nowDescription}
          {!isHasUrl ? (
            <EmptyStarIcon onClick={starUrl} />
          ) : (
            <StarIcon onClick={deleteStar} />
          )}
        </div>
        <div>
          {isHasUrl && !nowDescription && (
            <div className="description-wrap">
              <input
                placeholder="즐겨찾기 설명"
                onChange={(e) => {
                  console.log(e.target.value);
                  descriptionRef.current = e.target.value;
                }}
              ></input>
              <div className="icon-wrap" onClick={updateDescription}>
                <PlusIcon />
              </div>
            </div>
          )}
        </div>
        {isClose && (
          <>
            {(isHasUrl || isStarModal) && (
              <div>
                {nowMemo.length >= 1 && (
                  <div>
                    {nowMemo.map((data: any) => {
                      return (
                        <div key={data.id}>
                          <div>{data.memo}</div>
                          <div onClick={() => deleteMemo(data.id)}>X</div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div
                  className="icon-wrap"
                  onClick={() => setMemo((prev) => !prev)}
                >
                  <MemoIcon />
                </div>
              </div>
            )}

            {isMemo && (
              <div className="description-wrap">
                <textarea
                  placeholder="공부해보세요"
                  onChange={(e) => {
                    memoRef.current = e.target.value;
                  }}
                />
                <div className="icon-wrap" onClick={createMemo}>
                  <PlusIcon />
                </div>
                {/* <div>복사기능</div> */}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
