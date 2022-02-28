// import { Divider } from "semantic-ui-react";
import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { baseURL } from "./util/auth";
import { NoPosts } from "./components/layout/NoData";
import CreatePost from "./components/post/CreatePost";
import { Segment } from "semantic-ui-react";
import CardPost from "./components/post/CardPost";

const index = ({ user, postData, errorLoading }) => {
  const [posts, setPosts] = useState(postData);
  const [showToastr, setShowToastr] = useState(false);

  //* UseEffects ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  useEffect(() => {
    document.title = `Welcome, ${user.name.split(" ")[0]}`;
  }, []);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

  if (!posts || errorLoading) return <NoPosts />;

  return (
    <>
      {/* SHOWTOASTR STUFF */}
      <Segment className="posts-segment">
        <CreatePost user={user} setPosts={setPosts} />
        {!posts || errorLoading ? (
          <NoPosts />
        ) : (
          posts.map((post) => (
            <CardPost
              key={post._id}
              post={post}
              user={user}
              setPosts={setPosts}
              setShowToastr={setShowToastr}
            />
          ))
        )}
      </Segment>
    </>
  );
};

index.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseURL}/api/v1/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { postData: res.data };
  } catch (error) {
    console.log(error);
    return { errorLoading: true };
  }
};

export default index;

// const index = ({ posts, token }) => {
//   return (
//     <>
//       <h1>{token}</h1>
//       {posts.map((post) => {
//         return (
//           <div key={post.id}>
//             <h1>{post.title}</h1>
//             <p>{post.body}</p>
//             <Divider />
//           </div>
//         );
//       })}
//     </>
//   );
// };

// index.getInitialProps = async (ctx) => {
//   const cookie = parseCookies(ctx);
//   const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//   // console.log(ctx);
//   return { posts: res.data, token: cookie.token };
// };
