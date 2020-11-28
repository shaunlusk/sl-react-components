import React from 'react';
import './App.scss';
import { DateDisplay, NumberDisplay, Tabs, Tab, TimeDisplay, Modal } from './components';
import { CodeDemo } from './components/code-demo/code-demo';

interface Demo {
  name: string;
  items: DemoItem[];
  comment?: string;
}

interface DemoItem {
  comment: string;
  fn: () => React.ReactNode;
  functionReplace? : string;
}

interface ActivatableDemo {
  name: string;
  items: ActivatableDemoItem[];
  comment?: string;
}

interface ActivatableDemoItem extends DemoItem {
  activate: () => void;
}

interface AppState {
  selectedTab: string;
  demos: Demo[];
  showModal: boolean;
  activatableDemos: ActivatableDemo[];
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      selectedTab: 'Tab 1',
      demos: [
        {name:"DateDisplay",
          items: [
            {comment: "Simple Timestamp-style date.", fn: () => <DateDisplay datetime={new Date()} format="YYYYMMDD"></DateDisplay>},
            {comment: "U.S.A Style", fn: () => <DateDisplay datetime={new Date('1960-12-01')} format="MM/DD/YY"></DateDisplay>},
            {comment: "ISO", fn: () => <DateDisplay datetime={new Date()} format="YYYY-MM-DD"></DateDisplay>},
          ]
        },
        {name:"NumberDisplay",
          items: [
            {comment: "Basic Usage", fn: () => <NumberDisplay number={5} decimalPlaces={0}></NumberDisplay>},
            {comment: "Rounded Floating Point", fn: () => <NumberDisplay number={3.1415927} decimalPlaces={3}></NumberDisplay>}
          ]
        },
        {name:"TimeDisplay",
        items: [
          {comment: "Basic Usage", fn: () => <TimeDisplay datetime={new Date()}></TimeDisplay>},
          {comment: "24-Hour Display", fn: () => <TimeDisplay datetime={new Date('2020-11-27T19:30:00')} twentyFourHourDisplay={true}></TimeDisplay>}
        ]
        },
        {name:"Tabs",
        comment:"Requires a function to update the activeTabLabel Property.",
        items: [
          {comment: "Basic Usage", fn: () => (
            <Tabs activeTabLabel={this.state.selectedTab} activeTabChanged={this.handleChangeTab.bind(this)}>
              <Tab label='Tab 1'>Tab 1 Content</Tab>
              <Tab label='Tab 2'>Tab 2 Content</Tab>
            </Tabs>
          
          ),
          functionReplace: ' <function to handle tab change> '}
        ]
        },
      ],
      showModal: false,
      activatableDemos: [
        {name:"Modal",
          items: [
            {comment: "Basic Usage", activate: () => this.setState({showModal:true}), functionReplace:' <function that sets optional "show" property to false> ', fn: () => <Modal title="Sample Modal" buttonText="Close" handleClose={this.handleCloseModal.bind(this)} show={this.state.showModal}>Sample Modal Dialogue.  Just close it.</Modal>},
          ]
        }
      ]
    };
  }

  handleChangeTab(newTab: string) {
    this.setState({selectedTab: newTab});
  }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>SL-React-Components Demo Page</h1>        
        </header>
        <div className="demos">
          {this.state.demos.map(demo => (
            <div className="demo" key={demo.name}>
              <h2>{demo.name}</h2>
              {demo.comment ? <h4>{demo.comment}</h4> : null}
              {demo.items.map((item, idx) => (
                <div className="demo-items" key={`${demo.name}-${idx}`}>
                  <div className="demo-items-comment">{item.comment}</div>
                  <div className="demo-items-code-header">Code:</div>
                  <div className="demo-items-code"><CodeDemo element={item.fn()} functionReplace={item.functionReplace}></CodeDemo></div>
                  <div className="demo-items-result-header">Result:</div>
                  <div className="demo-items-result">{item.fn()}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {this.state.activatableDemos.map(demo => (
            <div className="demo" key={demo.name}>
              <h2>{demo.name}</h2>
              {demo.comment ? <h4>{demo.comment}</h4> : null}
              {demo.items.map((item, idx) => (
                <div className="demo-items" key={`${demo.name}-${idx}`}>
                  <div className="demo-items-comment">{item.comment}</div>
                  <div className="demo-items-code-header">Code:</div>
                  <div className="demo-items-code"><CodeDemo element={item.fn()} functionReplace={item.functionReplace}></CodeDemo></div>
                  <div className="demo-items-result-header">Result:</div>
                  <div className="demo-items-result">{item.fn()}</div>
                  <div className="demo-items-result-activator"><button className="btn" onClick={() => item.activate()}>Show</button></div>
                </div>
              ))}
            </div>
        ))}
      </div>);
  }
}

export default App;
