import * as React from 'react';
import { Tab } from './tab';

export interface ITabsProps {
  activeTabLabel?: string;
  children: React.ReactComponentElement<typeof Tab>[];
  activeTabChanged?(label: string, tab?: React.ReactComponentElement<typeof Tab>): void;
}

class Tabs extends React.Component<ITabsProps, any> {

  private _setActiveTab(tab: React.ReactComponentElement<typeof Tab>) {
    if (this.props.activeTabChanged) {
      this.props.activeTabChanged(tab.props.label, tab);
    }
  }

  public render() {
    const activeTab = this.props.activeTabLabel 
      ? (this.props.children.find(tabEl => tabEl.props.label === this.props.activeTabLabel) ?? this.props.children[0])
      : this.props.children[0];
    return <div className="slrc-tab-container">
      <div className="slrc-tab-headers">
        {this.props.children.map(tab => 
          <div key={"slrc-tab-header-" + tab.props.label} className={"slrc-tab-header " + (tab === activeTab ? "active-slrc-tab-header" : "")}
            onClick={() => this._setActiveTab(tab)}
          >
            {tab.props.label}
          </div>
        )}
      </div>
      {activeTab}
    </div>
  }
}

export { Tabs };
