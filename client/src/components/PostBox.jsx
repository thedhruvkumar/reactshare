import React, { useState } from "react";
import {usePostContext} from "../context/posts/posts";
import { Button, Flex, TextArea } from "@radix-ui/themes";

export const PostBox = () => {
  const PostState = usePostContext();
  const { createPost, posts, setPosts } = PostState;
  const [data, setData] = useState("");
  const handleCreate = async () => {
    await createPost(data).then(() => setData(""));
  };
  const handleChange = (e) => {
    setData(e.target.value);
  };

  return (
    <>
      <div className=" w-[100%] bg-white rounded-lg h-auto p-2 shadow-2xl">
        <div className="w-[100%]">
          <div className="flex justify-between items-center p-5">
            <Flex direction="column" gap="3" style={{ width: `100%` }}>
              <TextArea
                size="3"
                rows={5}
                variant="soft"
                onChange={handleChange}
                value={data}
                placeholder="Write a Post..."
              />
              <Button
                color="indigo"
                size="3"
                variant="solid"
                onClick={handleCreate}
              >
                Post
              </Button>
            </Flex>
          </div>
        </div>
      </div>
    </>
  );
};
