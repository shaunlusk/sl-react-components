import React from 'react';
import './App.scss';
import { DateDisplay, NumberDisplay, Tabs, Tab, TimeDisplay } from './components';
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

// const 

interface AppState {
  selectedTab: string;
  demos: Demo[];
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
      ]    
    };
  }

  handleChangeTab(newTab: string) {
    console.log('change tba')
    this.setState({selectedTab: newTab});
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
      </div>
    );
  }
}

export default App;
