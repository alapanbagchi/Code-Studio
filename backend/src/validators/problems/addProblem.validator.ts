import * as yup from 'yup'
export const keyword_list = [
    'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif',
    'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in',
    'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
    'while', 'with', 'yield'
]
export const addProblemValidator = async (data: any) => {
    try {
        const schema =yup.object().shape({
			title: yup.string().required('Title is required'),
			description: yup.string().required('Description is required'),
			output_type: yup.string().required('Output type is required'),
			test_cases: yup.array().of(
				yup.object().shape({
					input: yup.array().of(
						yup.object().shape({
							name: yup.string().required('Variable name is required'),
							value: yup
								.string()
								.required('Value is required')
								.test('type-error', 'The value is not of the valid type', function (value: any) {
									const type = data.input_variables.find((inputVariable) => inputVariable.name === this.parent.name)?.type;
									if(!type) return false;
									if (type === 'number') {
										return !isNaN(value);
									} else if (type === 'boolean') {
										return value === 'true' || value === 'false';
									} else if (type === 'string') {
										return true;
									} else if (type === 'array') {
										try {
											JSON.parse(value);
											return true;
										} catch (e) {
											return false;
										}
									} else if (type === 'object') {
										try {
											JSON.parse(value);
											return true;
										} catch (e) {
											return false;
										}
									}
									return false;
								})
						})
					),
					output: yup
							.string()
							.required('Value is required')
							.test('type-error', 'The value is not of the valid type', (value) => {
								const output_type = data.output_type;
								if (output_type === 'number') {
									return !isNaN(value);
								} else if (output_type === 'boolean') {
									return value === 'true' || value === 'false';
								} else if (output_type === 'string') {
									return true;
								} else if (output_type === 'array') {
									try {
										JSON.parse(value);
										return true;
									} catch (e) {
										return false;
									}
								} else if (output_type === 'object') {
									try {
										JSON.parse(value);
										return true;
									} catch (e) {
										return false;
									}
								}
							}),
					explanation: yup.string()
				})
			),
			difficulty: yup.string().required('Difficulty is required'),
			tags: yup.array().required('Tags are required').min(1, 'Atleast one tag is required').max(5, 'Maximum 5 tags are allowed'),
			input_variables: yup.array().of(
				yup.object().shape({
					type: yup.string().required('Type is required'),
					name: yup
						.string()
						.required('Variable name is required')
						.test('is-unique', 'Input variables must be unique', () => {
							const inputVariables: any[] = data.input_variables;
							const set = new Set(inputVariables.map((inputVariable) => inputVariable.name));
							return set.size === inputVariables.length;
						})
						.test('is-keyword', 'Input variable cannot be a keyword', (value: any) => {
							return !keyword_list.includes(value);
						})
				})
			)
		})
        await schema.validate(data, { abortEarly: false })
        return { valid: true }
    } catch (err) {
		console.log(err)
        return { valid: false, data: err.errors }
    }
}