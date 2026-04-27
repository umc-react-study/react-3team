import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[AppErrorBoundary]", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-boundary alert-card danger">
          <p className="alert-title">Error Boundary 작동</p>
          <h3>문제가 발생했어요</h3>
          <p className="error">{this.state.error?.message}</p>
          <button onClick={this.handleReset} type="button">
            다시 렌더링
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
