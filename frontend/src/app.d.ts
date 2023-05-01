declare global {
	declare class TestCase {
		input: {
			variableName: string;
			value: any;
		}[];
		output: any;
		explanation?: string;
	}
	type Language = 'c' | 'cpp' | 'java' | 'python';
}

export { };
