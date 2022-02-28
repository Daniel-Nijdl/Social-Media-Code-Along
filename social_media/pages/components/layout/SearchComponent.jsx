import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import { useState } from "react";
import { List, Image, Search } from "semantic-ui-react";
import { baseURL } from "../../util/auth";
let cancel;

const SearchComponent = () => {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const { value } = e.target;
    if (value === " ") return;
    setText(value);
    if (value) {
      setLoading(true);
      try {
        cancel && cancel();

        const token = cookie.get("token");
        const res = await axios.get(`${baseURL}/api/v1/search/${value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: new axios.CancelToken((canceler) => {
            cancel = canceler;
          }),
        });

        if (res.data.length === 0) {
          setResults([]);
          return setLoading(false);
        }

        setResults(res.data);
      } catch (error) {
        console.log("Error Searching @ Search Component", error);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Search
        // style={{ marginTop: ".5rem" }}
        loading={loading}
        results={results || null}
        value={text}
        placeholder="Find other users..."
        onBlur={() => {
          results.length > 0 && setResults([]);
          loading && setLoading(false);
          setText("");
        }}
        onSearchChange={handleChange}
        resultRenderer={ResultRenderer}
        onResultSelect={(_, data) => Router.push(`/${data.result.username}`)}
      />
    </>
  );
};

const ResultRenderer = ({ _id, profilePicURL, name }) => {
  return (
    <>
      <List key={_id}>
        <List.Item>
          <Image
            style={{
              objectFit: "contain",
              height: "1.5rem",
              width: "1.5rem",
            }}
            src={profilePicURL}
            alt="Profile Pic"
            avatar
          />
          <List.Content header={name} as="a" />
        </List.Item>
      </List>
    </>
  );
};

export default SearchComponent;
