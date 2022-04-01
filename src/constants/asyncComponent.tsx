import React, {ComponentType, PureComponent} from 'react';


interface IAsyncComponent {
  (importComponent:()=> Promise<{ default: ComponentType<any>}>) : React.ComponentClass
}

interface IState {
  component : null | JSX.Element
}

const asyncComponent : IAsyncComponent = (importComponent)=> {
  class AsyncFunc extends PureComponent<any,IState>  {
    mounted : boolean = false;
    constructor(props:any) {
      super(props);
      this.state = {
        component: null
      };
    }


    componentWillUnmount() {
      this.mounted = false;
    }

    async componentDidMount() {
      this.mounted = true;
      const {default: Component} = await importComponent();
      if (this.mounted) {
        this.setState({
          component: <Component {...this.props} />
        });
      }
    }

    render() {
      if(!this.state.component ) return ("Loading ...")
      return this.state.component
    }
  }

  return AsyncFunc;
} 
export default asyncComponent;
