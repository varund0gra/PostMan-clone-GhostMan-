import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Mainpage from './Mainpage';
function Tabrender() {
    const [activeTab, setActiveTab] = useState(1);
    const [tabs, setTabs] = useState([{ id: 1 }]);
    const addTab = () => {
        const newTab = { id: tabs.length + 1 };
        setTabs([...tabs, newTab]);
        setActiveTab(newTab.id);
              };
      //Close tab functionality
      const closeTab = (tabId) => {
        const newupdateTab = tabs.filter((tab) => tab.id !== tabId);
        setTabs(newupdateTab);
        if (activeTab === tabId) {
          setActiveTab(newupdateTab.length > 0 ? newupdateTab[0].id : null)
        }
      };
  return (
    <>
    <div>
      <ul className="nav nav-tabs">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <a
              className={`nav-link ${tab.id === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              Tab {tab.id}
              {tab.id !== 1 && (
                <button className="close ml-2" onClick={() => closeTab(tab.id)}>
                  X
                </button>
              )}
            </a>
          </li>
        ))}
        <li className="nav-item ml-auto">
          <a className="nav-link" onClick={addTab}>
            <FontAwesomeIcon icon={faPlus} />
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            className={`tab-pane fade ${
              tab.id === activeTab ? "show active" : ""
            }`}
            key={tab.id}
          >
            <Mainpage />
               </div>
        ))}
      </div>
    </div>

    </>
  )
}

export default Tabrender
