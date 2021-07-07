import { observer } from "mobx-react";
import { Card } from "antd";
import { Link } from "react-router-dom";

import { useBusinessLogic } from "./useBusinessLogic";
import "./styles.css";
import { capitalize } from "../../utils";

export const PostsPage = observer(() => {
  const { posts, loading } = useBusinessLogic();

  return (
    <div className="Posts_Wrapper">
      <h1 className="Posts_Title">Posts Page</h1>

      <div className="Posts_Cards_Wrapper">
        {loading
          ? [0, 1, 2, 3, 4, 5, 6].map((i) => (
              <Card
                key={i}
                style={{ width: 300, marginTop: 16 }}
                loading={loading}
                className="Posts_Cards_Item"
              >
                <Card.Meta
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            ))
          : posts?.map((post) => (
              <Card
                key={post.id}
                title={capitalize(post.title)}
                extra={<Link to={`/posts/${post.id}`}>More</Link>}
                style={{ width: 300 }}
                className="Posts_Cards_Item"
              >
                <p>{post.body}</p>
                <p>By: {post.user.username}</p>
              </Card>
            ))}
      </div>
    </div>
  );
});
