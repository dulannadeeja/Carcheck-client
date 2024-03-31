import React, { useState } from "react";
import Input from "../../../components/ui/Input";

const MAX_TITLE_LENGTH = 80;

function Title() {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_TITLE_LENGTH) {
      setTitle(e.target.value);
    }
  };

  return (
    <div className="flex flex-col ">
      <h3 className="text-lg uppercase font-medium my-4">title</h3>
      <Input
        placeholder="Title"
        className="border-gray-200 bg-gray-100"
        onChange={handleTitleChange}
        value={title}
      />
      <p className="self-end">
        {title.length}/{MAX_TITLE_LENGTH}
      </p>
    </div>
  );
}

export default Title;
