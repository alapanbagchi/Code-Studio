import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export default defineConfig({
	server: { https: true,proxy:{
		'/api': {
			target: 'https://localhost:8000',
			changeOrigin: true,
			secure: false,
			rewrite: (path) => path.replace(/^\/api/, '')
		}
	} },
	plugins: [sveltekit(), basicSsl()],
});
