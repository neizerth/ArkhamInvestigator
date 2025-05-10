import { Component, type ComponentType, type PropsWithChildren } from "react";

export type ErrorBoundaryProps = PropsWithChildren & {
	Fallback: ComponentType<{ error: Error }>;
};

export type ErrorBoundaryState = {
	error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
	state: ErrorBoundaryState = {
		error: null,
	};
	static getDerivedStateFromError(error: Error) {
		console.log("boundary catch", { error });
		return { error };
	}
	render() {
		const { Fallback } = this.props;
		const { error } = this.state;
		if (error) {
			return <Fallback error={error} />;
		}
		return this.props.children;
	}
}
