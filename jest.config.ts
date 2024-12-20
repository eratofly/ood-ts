import type {JestConfigWithTsJest} from 'ts-jest'

const config: JestConfigWithTsJest = {
	testEnvironment: 'node',
	transform: {
		'^.+.tsx?$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
}

export default config
