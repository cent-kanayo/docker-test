import React from "react";

const Notes = ({ notes, deletePost }) => {
  if (notes.length < 1) return <h1>No notes yet!</h1>;
  return (
    <div>
      <article
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {notes.map((note) => (
          <div
            key={note._id}
            style={{
              background: "white",
              boxShadow: "0 0 0 2px rgba(0,0,0,0.4)",
              padding: "4px",
              margin: "20px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>{note.title}</h3>
              <p>{note.body}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                style={{
                  padding: "8px 16px",
                  color: "white",
                  background: "red",
                  border: "none",
                  marginTop: "10px",
                }}
                onClick={() => deletePost(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </article>
    </div>
  );
};

export default Notes;
