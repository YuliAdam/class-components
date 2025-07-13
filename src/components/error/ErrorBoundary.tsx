import { Component, type ErrorInfo, type ReactNode } from 'react';
import ErrorContent from './ErrorContent';

interface Props {
  fallback: ReactNode;
  backClick: () => void;
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

  onClickBack() {
    this.props.backClick();
    this.setState({ hasError: false });
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorContent backClick={() => this.onClickBack()} />;
    }

    return this.props.fallback;
  }
}

export default ErrorBoundary;
