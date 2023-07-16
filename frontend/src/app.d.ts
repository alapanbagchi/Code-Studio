declare global {
	declare class TestCase {
		input: {
			name: string;
			value: any;
		}[];
		output: any;
		explanation?: string;
	}
	type Language = 'c' | 'cpp' | 'java' | 'python';
}

export { };
