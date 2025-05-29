import type { PropsWithError } from "@shared/model";
import { Component, type ComponentType, type PropsWithChildren } from "react";

export type ErrorBoundaryProps = PropsWithChildren & {
	Fallback: ComponentType<PropsWithError>;
};

export type ErrorBoundaryState = {
	error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
	state: ErrorBoundaryState = {
		error: null,
	};
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.retry = this.retry.bind(this);
	}
	static getDerivedStateFromError(error: Error) {
		return { error };
	}
	retry() {
		this.setState({
			error: null,
		});
	}
	render() {
		const { Fallback } = this.props;
		const { error } = this.state;
		if (error) {
			return <Fallback error={error} onRetry={this.retry} />;
		}
		return this.props.children;
	}
}
