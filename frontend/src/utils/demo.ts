const problems = [
    {
        id: "TWO_SUM",
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
        output_type: "array",
        input_variables: [
            {
                variableName: "nums",
                type: "array"
            },
            {
                variableName: "target",
                type: "number"
            }
        ],
        test_cases: [
            {
                input: [
                    {
                        type: "array",
                        variableName: 'nums',
                        value: "[2, 7, 11, 15]"
                    },
                    {
                        type: "number",
                        variableName: 'target',
                        value: "9"
                    }
                ],
                output: {
                    type: "array",
                    value: "[0, 1]"
                },
                explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1]'
            },
            {
                input: [
                    {
                        type: "array",
                        variableName: 'nums',
                        value: "[3, 2, 4]"
                    },
                    {
                        type: "number",
                        variableName: 'target',
                        value:"6"
                    }
                ],
                output: {
                    type: "array",
                    value: "[1, 2]"
                },
                explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2]'
            },
            {
                input: [
                    {
                        type: "array",
                        variableName: 'nums',
                        value: "[3, 3]"
                    },
                    {
                        type: "number",
                        variableName: 'target',
                        value: "6"
                    }
                ],
                output: {
                    type: "array",
                    value: "[0, 1]"
                }
            }
        ]
    }
]
export default problems