import { Component, type ErrorInfo, type ReactNode } from 'react';
import ErrorContent from './ErrorContent';

interface Props {
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(err: Error): State {
    console.log(err);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContent backClick={() => this.setState({ hasError: false })} />
      );
    }

    return this.props.fallback;
  }
}

export default ErrorBoundary;
