import { Tag, Input } from "antd";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { useSetState } from 'ahooks';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // state = {
  //   tags: ["Tag 1", "Tag 2", "Tag 3"],
  //   inputVisible: false,
  //   inputValue: "",
  // };

  const [state, setState] = useSetState({
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    inputVisible: false,
    inputValue: "",
  });

  const handleClose = (removedTag) => {
    const tags = state.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    setState({ tags });
  };

  const showInput = () => {
    setState({ inputVisible: true }, () => {
      console.log(this);
     return this.input.focus()
    }
    );
  };

  const handleInputChange = (e) => {
    setState({ inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { tags } = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
  };

  const saveInputRef = (input) => {
    console.log(input);
    this.input = input;
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const { tags, inputVisible, inputValue } = state;
  const tagChild = tags.map(forMap);
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: "from",
            duration: 100,
          }}
          onEnd={(e) => {
            if (e.type === "appear" || e.type === "enter") {
              e.target.style = "display: inline-block";
            }
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>
      </div>
      {inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} className="site-tag-plus">
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};
