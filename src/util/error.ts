export class ValidationError extends Error {
	private fieldErrors: Array<{ field: string; message: string }>;

	constructor(fieldErrors: Array<{ field: string; message: string }>) {
		super("Validation error");
		this.fieldErrors = fieldErrors;
	}

	getErrors(): Array<{ field: string; message: string }> {
		return this.fieldErrors;
	}

	getFieldError(field: string): string | undefined {
		return this.fieldErrors.find(fieErr => fieErr.field === field)?.message;
	}
}
