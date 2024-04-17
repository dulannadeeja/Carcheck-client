import { CellContext } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { TData } from "../PendingAccounts";

type NoteProps = CellContext<TData, string>;

function Note(props: NoteProps) {
  const initialValue = props.row.original.note;
  const [note, setNote] = useState("");

  useEffect(() => {
    setNote(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    props.table.options.data.map((row) => {
      if (row.email === props.row.original.email) {
        row.note = note;
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        value={note}
        onBlur={onBlur}
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  );
}

export default Note;
