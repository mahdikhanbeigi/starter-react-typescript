import { PureComponent } from 'react';
export default function index(importComponent) {
  class AsyncFunc extends PureComponent {
    constructor(props) {
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
      const { default: Component } = await importComponent();
      if (this.mounted) {
        this.setState({
          component: <Component {...this.props} />
        });
      }
    }

    render() {
      return this.state.component ||
        <div>
          loading
        </div>;
    }
  }

  return AsyncFunc;
}
