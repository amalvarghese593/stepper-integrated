import React from "react";

function TabNavItem({ id, activeTab, setActiveTab, title }) {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li className={activeTab === id ? "active" : ""} onClick={handleClick}>
      {title}
    </li>
  );
}

export default TabNavItem;
