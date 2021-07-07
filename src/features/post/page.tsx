import { observer } from "mobx-react";
import { Spin } from "antd";

import { capitalize } from "../../utils";
import { useBusinessLogic } from "./useBusinessLogic";

export const PostPage = observer(() => {
  const { post, loading } = useBusinessLogic();

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>{capitalize(post?.title || "")}</h1>
          <div>
            <p>{capitalize(post?.body || "")}</p>
            <p>{post?.user?.username}</p>
          </div>
        </>
      )}
    </div>
  );
});
