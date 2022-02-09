import axios from "axios";
import { Divider } from "semantic-ui-react";
import { parseCookies } from "nookies";

const index = () => {
  return <>
    Home Page
  </>;
}

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