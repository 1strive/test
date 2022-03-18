import { Tag, Input } from "antd";
import React from 'react';

class App extends React.Component {
  state = {
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    inputValue: "",
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    this.setState({ tags });
  };


  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputValue: "",
    });
  };


  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
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

  render() {
    const { tags, inputValue } = this.state;
    const tagChild = tags.map(this.forMap);
    return (
      <>
        <div style={{ marginBottom: 16 }}>
            {tagChild}
        </div>
          <Input
            type="text"
            style={{ width: 330 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
          <span>{inputValue.length}/10</span>
      </>
    );
  }
}
export default App