import React from "react";

const custom = () => {
  return (
    <div className="ui three doubling stackable cards">
      <div className="ui card">
        <div className="image">
          <div className="ui placeholder">
            <div className="square image"></div>
          </div>
        </div>
        <div className="content">
          <div className="ui placeholder">
            <div className="header">
              <div className="very short line"></div>
              <div className="medium line"></div>
            </div>
            <div className="paragraph">
              <div className="short line"></div>
            </div>
          </div>
        </div>
        <div className="extra content">
          <div className="ui disabled primary button">Add</div>
          <div className="ui disabled button">Delete</div>
        </div>
      </div>
    </div>
  );
};

export default custom;
