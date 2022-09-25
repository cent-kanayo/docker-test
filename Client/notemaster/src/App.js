import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Notes from "./components/Notes";
function App() {
  const [note, setNote] = useState({
    title: "",
    body: "",
  });

  const [notes, setNotes] = useState([]);

  const postNote = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/posts",
        note
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/posts");
      setNotes(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (item) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/posts/${item}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNote((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title && note.body) {
      postNote();
    }
    fetchPosts();
    setNote({
      title: "",
      body: "",
    });
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <Header />
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "8px 15%",
          gap: "40px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            width: "400px",
            padding: "2rem",
            boxShadow: "0 0 4px rgba(0,0,0,0.5)",
            margin: "10px auto",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <label htmlFor="">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter note title"
                value={note.title}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                id="body"
                cols="30"
                rows="10"
                placeholder="Enter note body"
                value={note.body}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                color: "white",
                background: "purple",
                border: "none",
                marginTop: "10px",
              }}
            >
              Submit
            </button>
          </form>
        </div>
        <Notes notes={notes} deletePost={deletePost} />
      </section>
    </div>
  );
}

export default App;
